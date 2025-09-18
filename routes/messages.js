const { messagesModel } = require("../model/db");
const express = require("express");
const router = express.Router();

//获取聊天准确的聊天记录
router.get("/getMessages", async (req, res) => {
  let messages = await messagesModel
    .find({
      $or: [
        {
          sender: req.query.sender,
          receiver: req.query.receiver,
        },
        {
          sender: req.query.receiver,
          receiver: req.query.sender,
        },
      ],
    })
    .sort({
      time: 1,
    })
    .lean();

  res.send({
    code: 200,
    msg: "获取聊天记录成功",
    messages,
  });
});

module.exports = router
