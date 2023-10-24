# npm-analyze-tool
这是一个图形化分析npm依赖包的工具
# 背景
了解子 package 之间形成了怎样的父子依赖关系
# 使用方式
1.json文件显示依赖包层次结构
  - cd到拥有node-moudules的文件夹目录下

```
      `n-cli --json="test1.json"
```
  - 可以将您的项目文件所安装的依赖包的层次结构变成json文件显示出来，test1.json代表存储文件的位置
  - json文件结构如下：
```
{
  "npm-analyze-tool": {
    "express": {
      "accepts": {
        "mime-types": {}
      },
    }
  }
}
```
2.开启依赖可视化图
  - 进入到back文件内，终端输入node serve.js即可启动后端服务

```
`cd ..`
`cd front`
`npm run serve`
```
 - 即可开启依赖可视化图
 - 依赖可视化图像如下：
 - ![image](https://github.com/wangyuening0522/npm-analyze-tool/assets/111636755/2ed0c40e-4605-43b5-a1b5-c4ca0b3bf2bd)
# npm包发布地址
