const { friendsModel } = require("../model/db");
const express = require("express");
const router = express.Router();

//获取好友列表
router.get("/getFriends", async (req, res) => {
  let friends = await friendsModel
    .find({
      $or: [
        { requester: req.query.sender },
        {
          recipient: req.query.sender,
        },
      ],
      status: "accepted",
    })
    .populate("requester recipient", "user");
  friends = friends.map((i) => {
    const friend =
      i.requester._id == req.query.sender ? i.recipient : i.requester;
    return { _id: friend._id, user: friend.user };
  });

  res.send({
    code: 200,
    msg: "获取好友列表成功",
    friends,
  });
});



module.exports = router;
