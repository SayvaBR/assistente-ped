import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const cwd = fileURLToPath(new URL("../", import.meta.url));
const childEnv = { ...process.env };

if (
  childEnv.JAVA_HOME &&
  !existsSync(join(childEnv.JAVA_HOME, "bin", "java.exe")) &&
  !existsSync(join(childEnv.JAVA_HOME, "bin", "java"))
) {
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
    "Android SDK API 36 não encontrado. Configure ANDROID_HOME ou ANDROID_SDK_ROOT antes do QA.",
  );
  process.exit(2);
}

childEnv.ANDROID_HOME = sdkRoot;
childEnv.ANDROID_SDK_ROOT = sdkRoot;

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
    : spawnSync(command, args, { cwd: runCwd, stdio: "inherit", env: childEnv });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(process.platform === "win32" ? "pnpm.cmd" : "pnpm", ["build"]);
run("node", ["scripts/android-sync.mjs", "--skip-build"]);
run(
  process.platform === "win32" ? "gradlew.bat" : "./gradlew",
  ["assembleQa"],
  join(cwd, "android"),
);

const apk = join(cwd, "android", "app", "build", "outputs", "apk", "qa", "app-qa.apk");
if (!existsSync(apk)) {
  console.error(`APK QA não encontrado no caminho esperado: ${apk}`);
  process.exit(1);
}

console.log(`APK QA gerado: ${apk}`);
