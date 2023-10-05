// 使用 fetch
fetch("http://localhost:3000/home")
  .then(function (response) {
    if (response.ok) {
      // return JSON.parse(response)
      return response.json();
    } else {
      throw new Error("Failed to load JSON file.");
    }
  })
  .then(function (json) {
    console.log("我是", json); // 处理 JSON 数据
    var myChart = echarts.init(document.getElementById("box"));
    // console.log("hello");
    let option;

    // 在节点数组中遍历并访问属性
    json.nodes.forEach((node) => {
      const color = node.color;
      const label = node.label;
      const id = node.id;
      const size = node.size;
      // 打印节点属性
      console.log(color, label, id, size);
    });

    // myChart.hideLoading();
    /*  json.edges.map((edge) => {
      console.log(edge);
    }); */
    myChart.setOption(
      (option = {
        title: {
          text: "NPM Dependencies",
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "force",
            // progressiveThreshold: 700,
            data: json.nodes.map(function (node) {
              return {
                /* x: node.x,
                y: node.y, */
                id: node.id,
                name: node.label,
                symbolSize: node.size,
                itemStyle: {
                  color: node.color,
                },
              };
            }),
            edges: json.edges.map(function (edge) {
              // console.log(edge);
              return {
                source: edge.sourceID,
                target: edge.targetID,
              };
            }),
            emphasis: {
              focus: "adjacency",
              label: {
                position: "right",
                show: true,
              },
            },
            roam: true,
            lineStyle: {
              width: 0.5,
              curveness: 0.3,
              opacity: 0.7,
            },
            force: {
              repulsion: 100,
              gravity: 0.01,
              edgeLength: 200,
            },
          },
        ],
      })
    );
  })
  .catch(function (error) {
    console.error(error);
  });
