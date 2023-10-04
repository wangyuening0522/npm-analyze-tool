"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAnalysisResults = void 0;
const fs_1 = __importDefault(require("fs"));
//写入分析结果
function saveAnalysisResults(results, filePath) {
    const json = JSON.stringify(results, null, 2);
    fs_1.default.writeFileSync(filePath, json);
    console.log(`Analysis results saved to ${filePath}`);
}
exports.saveAnalysisResults = saveAnalysisResults;
