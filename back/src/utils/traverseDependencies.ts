import { log } from "console";
import fs from "fs";
import path from "path";
function traverseDependencies(
  packagePath: string,
  result: { [packageName: string]: any } = {},
  depth = Infinity,
  parentDependencies: string[] = []
): { [packageName: string]: any } {
  const packageJson = require(packagePath);
  const packageName = packageJson.name;
  // Check for circular dependencies
  if (parentDependencies.includes(packageName)) {
    throw new Error(`Circular dependency found: ${packageName}`);
  }
  if (packageJson.dependencies && depth > 0) {
    const dependencies = packageJson.dependencies;
    // console.log("result1", result);
    result[packageName] = packageJson.dependencies;
    // console.log("result2", result);
    // if (packageJson.dependencies[packageName]) {
    //   result[packageName] = packageJson.dependencies[packageName];
    // }

    for (const dependency in dependencies) {
      // const dependencyPackage = dees[dependency];
      const dependencyPath = path.join(
        process.cwd(),
        "node_modules",
        dependency,
        "package.json"
      );
       console.log("我是每一次循环的package.json路径", dependencyPath);
      if (fs.existsSync(dependencyPath)) {
        result[packageName][dependency] = traverseDependencies(
          dependencyPath,
          {},
          depth - 1,
          [...parentDependencies, packageName]
        )[dependency];
      } else {
        console.log("我代表没有依赖路径"); 
        /* result = packageJson.dependencies;
        console.log("看看我", result); */
      }
    }
  }
  return result;
}
export { traverseDependencies };
