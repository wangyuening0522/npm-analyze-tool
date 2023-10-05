const echartsData = require("./echartsData");
const express = require("express");
const app = express();
app.get("/home", (req, res) => {
  /* const data = {
    message: "Hello, world!",
    timestamp: Date.now(),
  }; */
  // 设置 CORS 头信息
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.json(echartsData);
  //  console.log( );
});
app.listen(3000, () => {
  console.log("服务已经启动, 端口监听为 3000...");
});
