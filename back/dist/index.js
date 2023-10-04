"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// #!/usr/bin/env ts-node
console.log("你好");
console.log("我是第二次测试");
const { program } = require("commander");
const getPackageJsonPath_1 = require("./utils/getPackageJsonPath");
const traverseDependencies_1 = require("./utils/traverseDependencies");
const saveDependencyGraph_1 = require("./utils/saveDependencyGraph");
const checkMultipleVersions_1 = require("./utils/checkMultipleVersions");
const path_1 = __importDefault(require("path"));
//主执行函数
function main11() {
    try {
        const packageJsonPath = (0, getPackageJsonPath_1.getPackageJsonPath)();
        const depthArg = process.argv.find((arg) => arg.startsWith("--depth="));
        const depth = depthArg ? parseInt(depthArg.split("=")[1]) : Infinity;
        //遍历依赖
        /* async function test() { */
        const dependencyGraph = (0, traverseDependencies_1.traverseDependencies)(packageJsonPath, {}, depth);
        // console.log("dependencyGraph", dependencyGraph);
        module.exports = dependencyGraph;
        // console.log("全都看我", module.exports);
        /* const c = await 'c'
          }
          test();
          console.log("阿哲，我是聪明贵"); */
        const jsonFilePath = process.argv.find((arg) => arg.startsWith("--json="));
        const isAnalyze = process.argv.find((arg) => arg.startsWith("analyze"));
        if (jsonFilePath) {
            const filePath = path_1.default.resolve(process.cwd(), jsonFilePath.split("=")[1]);
            (0, saveDependencyGraph_1.saveDependencyGraph)(dependencyGraph, filePath);
        }
        else if (isAnalyze) {
            console.log(JSON.stringify(dependencyGraph, null, 2));
        }
        else {
            console.log("忘记带上参数了");
        }
        const circularDependencies = [];
        const multipleVersions = (0, checkMultipleVersions_1.checkMultipleVersions)(dependencyGraph);
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
    }
    catch (error) {
        console.error("哎呦，错误了");
        // console.error(`An error occurred: ${error.message}`);
        process.exit(1);
    }
}
main11();
module.exports = {
    main11,
};
