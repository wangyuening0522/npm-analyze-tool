// #!/usr/bin/env ts-node
// console.log("你好");
// console.log("我是第二次测试");
const { program } = require("commander");
import { getPackageJsonPath } from "./utils/getPackageJsonPath";
import { traverseDependencies } from "./utils/traverseDependencies";
import { saveAnalysisResults } from "./utils/saveAnalysisResults";
import { saveDependencyGraph } from "./utils/saveDependencyGraph";
import { checkMultipleVersions } from "./utils/checkMultipleVersions";
import path from "path";
//主执行函数
let dependencyGraph;
function main11(): void {
  try {
    const packageJsonPath = getPackageJsonPath();
    const depthArg = process.argv.find((arg) => arg.startsWith("--depth="));
    const depth = depthArg ? parseInt(depthArg.split("=")[1]) : Infinity;
    //遍历依赖
    /* async function test() { */
    dependencyGraph = traverseDependencies(packageJsonPath, {}, depth);
    // console.log("dependencyGraph", dependencyGraph);
    
    // console.log("全都看我", module.exports);
    /* const c = await 'c'
	  }
	  test();
	  console.log("阿哲，我是聪明贵"); */
    const jsonFilePath = process.argv.find((arg) => arg.startsWith("--json="));
    const isAnalyze = process.argv.find((arg) => arg.startsWith("analyze"));
    if (jsonFilePath) {
      const filePath = path.resolve(process.cwd(), jsonFilePath.split("=")[1]);
      saveDependencyGraph(dependencyGraph, filePath);
    } else if (isAnalyze) {
      console.log(JSON.stringify(dependencyGraph, null, 2));
    } else {
      console.log("忘记带上参数了");
    }
    const circularDependencies: any[] = [];
    const multipleVersions = checkMultipleVersions(dependencyGraph);
   /*  if (circularDependencies.length > 0 || multipleVersions.length > 0) {
      const analysisResults = { circularDependencies, multipleVersions };
      const analysisFilePath = process.argv.find((arg) =>
        arg.startsWith("--analyze=")
      );
      if (analysisFilePath) {
        const filePath = path.resolve(
          process.cwd(),
          analysisFilePath.split("=")[1]
        );
        saveAnalysisResults(analysisResults, filePath);
      } else {
        console.log(JSON.stringify(analysisResults, null, 2));
      }
    } */
  } catch (error) {
    console.error("哎呦，错误了");
    // console.error(`An error occurred: ${error.message}`);
    process.exit(1);
  }
}
 main11();
module.exports = {
  main11,
  dependencyGraph
};
console.log(module.exports);

