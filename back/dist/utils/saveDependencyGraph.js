"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDependencyGraph = void 0;
const fs_1 = __importDefault(require("fs"));
//设置保存依赖表
function saveDependencyGraph(dependencyGraph, filePath) {
    const json = JSON.stringify(dependencyGraph, null, 2);
    fs_1.default.writeFileSync(filePath, json);
    console.log(`Dependency graph saved to ${filePath}`);
}
exports.saveDependencyGraph = saveDependencyGraph;
