import fs from "fs";
//设置保存依赖表
function saveDependencyGraph(
  dependencyGraph: { [packageName: string]: { [dependency: string]: string } },
  filePath: string
): void {
  const json = JSON.stringify(dependencyGraph, null, 2);
  fs.writeFileSync(filePath, json);
  console.log(`Dependency graph saved to ${filePath}`);
}
export { saveDependencyGraph };
