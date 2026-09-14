import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const sdkRoots = [
  process.env.ANDROID_HOME,
  process.env.ANDROID_SDK_ROOT,
  process.env.LOCALAPPDATA
    ? join(process.env.LOCALAPPDATA, "Android", "Sdk")
    : undefined,
].filter(Boolean);

const adbCandidates = sdkRoots.flatMap((root) => [
  join(
    root,
    "platform-tools",
    process.platform === "win32" ? "adb.exe" : "adb",
  ),
  join(root, "platform-tools", "adb"),
]);
const adb = adbCandidates.find((candidate) => existsSync(candidate)) ?? "adb";
const result = spawnSync(adb, ["devices", "-l"], { encoding: "utf8" });

if (result.error || result.status !== 0) {
  console.error(
    "Não foi possível executar o adb. Instale o Android SDK Platform-Tools ou configure ANDROID_HOME.",
  );
  process.exit(2);
}

const deviceLines = (result.stdout ?? "")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("List of devices attached"));
const authorized = deviceLines.filter((line) => /\sdevice(?:\s|$)/.test(line));
const unauthorized = deviceLines.filter((line) =>
  /\s(?:unauthorized|offline)(?:\s|$)/.test(line),
);

if (authorized.length === 0) {
  console.error("Nenhum telefone Android autorizado foi encontrado.");
  if (unauthorized.length > 0) {
    console.error(
      "Autorize a depuração USB no telefone e execute o comando novamente.",
    );
  } else {
    console.error(
      "Conecte um telefone com Depuração USB ativada e execute o comando novamente.",
    );
  }
  process.exit(2);
}

console.log(
  `${authorized.length} dispositivo(s) Android autorizado(s) encontrado(s):`,
);
for (const line of authorized) console.log(`- ${line}`);
