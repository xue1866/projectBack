let { usersModel } = require("../model/db");
const express = require("express");
const router = express.Router();

// /* 登录 */
router.get("/login", async function (req, res, next) {
  console.log("登录", req.query);
  
  console.log("9行");
  let user = await usersModel.findOne(req.query);
  console.log("11行");
  console.log("user:",user);
  
  if (user) {
    res.send({
      code: 200,
      msg: "登录成功",
      user,
    });
  }
});


//搜索用户
router.get("/search", async (req, res) => {
  let users = await usersModel.find()
  res.send({
    code: 200,
    msg: "搜索用户成功",
    users,
  });
});


module.exports = router
