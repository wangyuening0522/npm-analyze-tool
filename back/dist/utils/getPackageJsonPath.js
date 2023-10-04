"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageJsonPath = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
//拿到package.json的路径(递归)
function getPackageJsonPath() {
    const packageJsonPath = path_1.default.resolve(process.cwd(), "package.json");
    console.log("packageJsonPath", packageJsonPath);
    if (!fs_1.default.existsSync(packageJsonPath)) {
        throw new Error("No package.json found in the current directory.");
    }
    return packageJsonPath;
}
exports.getPackageJsonPath = getPackageJsonPath;
