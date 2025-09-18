const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://xuejiakang69_db_user:xue2005@cluster0.p7ceyb5.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
  console.log("✅ 数据库连接成功");
})
.catch((err) => {
  console.error("❌ 数据库连接失败:", err);
});
// 定义一个模型

//用户
const users = new mongoose.Schema({
  user: String,
  pwd: String,
  phone: Number,
  time: {
    type: Date,
    default: Date.now,
  },
});

//消息
const messages = new mongoose.Schema({
  text: String, //消息内容
  time: {
    //发送时间
    type: Date,
    default: Date.now,
  },
  sender: {
    //谁发的
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  receiver: {
    //接收者
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

//好友
const friendsSchema = new mongoose.Schema({
  // 申请人
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  // 被申请人
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  // 状态
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const usersModel = mongoose.model("users", users, "users");
const messagesModel = mongoose.model("messages", messages, "messages");
const friendsModel = mongoose.model("friends", friendsSchema, "friends");

module.exports = { usersModel, messagesModel,friendsModel };
