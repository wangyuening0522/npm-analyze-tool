import fs from "fs";
//写入分析结果
function saveAnalysisResults(results:any, filePath:string):void {
  const json = JSON.stringify(results, null, 2);
  fs.writeFileSync(filePath, json);
  console.log(`Analysis results saved to ${filePath}`);
}
export {saveAnalysisResults};
