import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cwd = fileURLToPath(new URL("../", import.meta.url));
const unsigned = process.argv.includes("--unsigned");
const childEnv = { ...process.env };
if (
  childEnv.JAVA_HOME &&
  !existsSync(join(childEnv.JAVA_HOME, "bin", "java.exe")) &&
  !existsSync(join(childEnv.JAVA_HOME, "bin", "java"))
) {
  // Alguns terminais mantêm um JAVA_HOME antigo mesmo quando o Java do PATH
  // está válido. Remover somente essa variável permite ao Gradle usar o Java
  // instalado no PATH, sem sobrescrever a configuração da máquina.
  delete childEnv.JAVA_HOME;
}
const sdkCandidates = [
  childEnv.ANDROID_HOME,
  childEnv.ANDROID_SDK_ROOT,
  childEnv.LOCALAPPDATA && join(childEnv.LOCALAPPDATA, "Android", "Sdk"),
].filter(Boolean);
const sdkRoot = sdkCandidates.find((root) =>
  existsSync(join(root, "platforms", "android-36", "android.jar")),
);
if (!sdkRoot) {
  console.error(
    "Android SDK API 36 não encontrado. Configure ANDROID_HOME ou ANDROID_SDK_ROOT antes da release.",
  );
  process.exit(2);
}
childEnv.ANDROID_HOME = sdkRoot;
childEnv.ANDROID_SDK_ROOT = sdkRoot;
const requiredSigning = [
  "AP_RELEASE_STORE_FILE",
  "AP_RELEASE_STORE_PASSWORD",
  "AP_RELEASE_KEY_ALIAS",
  "AP_RELEASE_KEY_PASSWORD",
];

if (!unsigned) {
  const missing = requiredSigning.filter((name) => !process.env[name]);
  const storeFile = process.env.AP_RELEASE_STORE_FILE;
  if (missing.length > 0) {
    console.error(
      `Release assinada bloqueada: faltam ${missing.join(", ")}. Consulte docs/ANDROID-RELEASE.md.`,
    );
    process.exit(2);
  }
  if (!existsSync(storeFile)) {
    console.error(`Release assinada bloqueada: keystore não encontrado em ${storeFile}.`);
    process.exit(2);
  }
}

function run(command, args, runCwd = cwd) {
  const isWindowsScript =
    process.platform === "win32" && /\.(bat|cmd)$/i.test(command);
  const result = isWindowsScript
    ? spawnSync(
        process.env.ComSpec ?? "cmd.exe",
        [
          "/d",
          "/c",
          `call ${command.includes(" ") ? `"${command}"` : command} ${args.join(" ")}`,
        ],
        { cwd: runCwd, stdio: "inherit", env: childEnv },
      )
    : spawnSync(command, args, {
        cwd: runCwd,
        stdio: "inherit",
        env: childEnv,
      });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(process.platform === "win32" ? "pnpm.cmd" : "pnpm", ["build"]);
run("node", ["scripts/android-sync.mjs", "--skip-build"]);
run(
  process.platform === "win32" ? "gradlew.bat" : "./gradlew",
  ["bundleRelease"],
  join(cwd, "android"),
);

const bundle = join(
  cwd,
  "android",
  "app",
  "build",
  "outputs",
  "bundle",
  "release",
  "app-release.aab",
);
if (!existsSync(bundle)) {
  console.error(`AAB não encontrado no caminho esperado: ${bundle}`);
  process.exit(1);
}

console.log(`${unsigned ? "AAB unsigned gerado" : "AAB assinado gerado"}: ${bundle}`);
