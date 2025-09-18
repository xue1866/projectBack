let { usersModel } = require("../model/db");
const express = require("express");
const router = express.Router();

// /* 登录 */
router.get("/login", async function (req, res, next) {
  console.log("登录", req.query);
  
  console.log("user:",typeof req.query.user);
  console.log("pwd:",typeof  req.query.pwd);
  console.log("9行");
  console.log("数据库字段:", Object.keys(usersModel.schema.obj));
  console.log("数据库字段:",typeof (Object.keys(usersModel.schema.obj)[0]));
  let user = await usersModel.findOne({
    user: req.query.user,
    pwd: req.query.pwd
  });
  let user1 = await usersModel.findOne({
    user: "admin",
    pwd: "admin"
  });
  console.log("user:",user);
  console.log("user1:",user1);
  
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
