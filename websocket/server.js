const WebSocket = require("ws");
let chilents = []; //所有连接的客户端
const { messagesModel } = require("../model/db");

function startWebSocket(server) {
  // websocket服务器监听
  const socket = new WebSocket.Server({server});

  // 监听客户端的连接
  socket.on("connection", async (ws, req) => {
    console.log("客户端连接");

    //获取发送者的id
    const params = new URLSearchParams(req.url.replace("/?", ""));
    const user = params.get("user");

    // 保存客户端
    chilents.push({
      ws,
      user,
    });

    //监听客户端发送的消息
    ws.on("message", async (message) => {
      const data = JSON.parse(message); // 确认后端发的是 JSON

      // 接受到的消息保存到数据库
      let save = await messagesModel.create(data);
      // save = save.toObject()

      // //遍历所有的连接的客户端，将接受收到的发送出去
      chilents.forEach((chiilnt) => {
        if (
          chiilnt.ws.readyState === WebSocket.OPEN &&
          (chiilnt.user === data.receiver || chiilnt.user === data.sender)
        ) {
          chiilnt.ws.send(JSON.stringify(save));
        }
      });
    });
  });


  console.log('🚀 WebSocket 服务已启动，监听路径: /ws');
}

module.exports = startWebSocket;
