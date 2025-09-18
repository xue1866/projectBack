const WebSocket = require("ws");
let chilents = []; //所有连接的客户端

// websocket服务器监听
const socket = new WebSocket.Server({ port: "8080" });

// 监听客户端的连接
socket.on("connection", (ws) => {
  console.log("客户端连接");

  // 保存客户端
  chilents.push({
    ws,
  });

  //监听客户端发送的消息
  ws.on("message", (message) => {
    console.log("收到的消息:", message);
    

    //遍历所有的连接的客户端，将接受收到的发送出去
    chilents.forEach((chiilnt) => {
        if(chiilnt.ws.readyState === WebSocket.OPEN){
            chiilnt.ws.send(String(message))
        }
    });
  });
});
