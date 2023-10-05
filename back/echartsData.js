// import dependencyGraph from './example.js'
const { warn, log } = require("console");
const index = require("./dist/index.js");
const path = require("path");
// console.log("我是echarts的数据");
const jsonFilePath = process.argv.find((arg) => arg.startsWith("--json="));
/* const handleEchartsData = (dependencyGraph) => {
  let result = {
    node: [],
    edges: [],
  };
}; */
function transformObject(obj) {
  console.log("看我类型", typeof obj);
  if (!obj || typeof obj !== "object") {
    console.error("Invalid input object");
    return;
  }
  const nodes = [];
  const edges = [];
  for (let key in obj) {
    console.log("key", key);
  }

  function traverse(obj, parent) {
    const keys = Object.keys(obj);
    console.log("keys", typeof keys, keys);
    /*  const nameSet = new Set();
    // 使用 filter 方法筛选出具有不同名称的对象元素
    const uniqueElements = keys.filter((obj) => {
      if (!nameSet.has(obj.name)) {
        nameSet.add(obj.name);
        return true; // 返回 true 表示保留该元素
      }
      return false; // 返回 false 表示过滤该元素
    }); */
    keys.forEach((key) => {
      const node = {
        color: getRandomColor(),
        label: key,
        id: key,
        size: 60,
      };
      console.log("哎呀");
      nodes.push(node);
      /*  nodes.forEach((item) => {
        if (node.label == item.label) {
          console.log("哎呀");
          nodes.push(node);
        }
      }); */
      if (parent) {
        const edge = {
          sourceID: parent,
          targetID: key,
          size: 1,
        };
        edges.push(edge);
      }
      if (typeof obj[key] === "object" && Object.keys(obj[key]).length > 0) {
        traverse(obj[key], key);
      }
    });
  }
  traverse(obj, null);
  return {
    nodes,
    edges,
  };
}
/* 获取随机颜色 */
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let dependencyGraph = index.dependencyGraph;
console.log("dependencyGraph in echartsDaya", dependencyGraph);
const echartsData = transformObject(dependencyGraph);
// const echartsData = JSON.stringify(transformObject(dependencyGraph));
let orginNodes = echartsData.nodes;
const nameSet = new Set();
const uniqueElements = orginNodes.filter((obj) => {
  if (!nameSet.has(obj.label)) {
    nameSet.add(obj.label);
    return true; // 返回 true 表示保留该元素
  }
  return false; // 返回 false 表示过滤该元素
});
echartsData.nodes = uniqueElements;
module.exports = echartsData;
/* const json = JSON.stringify(dependencyGraph, null, 2);
console.log("json", json); */
console.log("output", echartsData);
// const output = transformObject(dependencyGraph);
// console.warn("saveDependencyGraph", saveDependencyGraph);
/* if (jsonFilePath) {
  const filePath = path.resolve(process.cwd(), jsonFilePath.split("=")[1]);
  saveDependencyGraph(output, filePath);
} */
