import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("configuração de compartilhamento Android", () => {
  it("mantém o FileProvider em diretórios do próprio aplicativo", () => {
    const xml = readFileSync(
      resolve(process.cwd(), "android/app/src/main/res/xml/file_paths.xml"),
      "utf8",
    );

    expect(xml).toContain("<files-path");
    expect(xml).toContain("<cache-path");
    expect(xml).toContain("<external-files-path");
    expect(xml).not.toMatch(/<external-path\b/);
  });
});
