import path from "path";
import fs from "fs";
import { log } from "console";
//拿到package.json的路径(递归)
function getPackageJsonPath(): string {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");
  console.log("packageJsonPath", packageJsonPath);
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error("No package.json found in the current directory.");
  }
  return packageJsonPath;
}
// getPackageJsonPath();
export { getPackageJsonPath };
