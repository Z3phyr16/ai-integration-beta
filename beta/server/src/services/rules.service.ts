import fs from "fs/promises";
import path from "path";

interface AIRules {
  globalRules: string[];
}

export const getGlobalRules = async (): Promise<string> => {
  const filePath = path.join(process.cwd(), "src", "config", "rules.json");

  const file = await fs.readFile(filePath, "utf-8");
  const rules: AIRules = JSON.parse(file);

  return rules.globalRules.join("\n");
};
