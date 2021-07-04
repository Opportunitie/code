const bcrypt = require("bcrypt"); // 对密码进行加密
const jwt = require('jsonwebtoken')
const { User } = require("../models/index");

var express = require("express");
var router = express.Router();

const SECRET = "FSFFGERGVAEfefwef45611"

router.get("/", async function (req, res, next) {
  const users = await User.find();
  res.send(users);
});

router.post("/register", async function (req, res, next) {
  // console.log(req.body);
  const user = await User.create({
    userName: req.body.userName,
    password: req.body.password,
  });
  res.send(user);
});

router.post("/login", async function (req, res, next) {
  const user = await User.findOne({
    userName: req.body.userName,
  });
  if (!user) {
    return res.status(422).send({
      message: "用户名不存在",
    });
  }
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(422).send({
      message: "密码无效",
    });
  }

  // 生成token
  const token = jwt.sign({
    id: String(user._id)
  },SECRET)
  res.send({
    user,
    token,
  });
});

// 中间件
const authMiddleware = async function (req,res,next){
  const raw = String(req.headers.authorization).split(' ').pop()
  const { id } = jwt.verify(raw,SECRET) // 解析token，得到用户id
  req.user = await User.findById(id)
  next()
}

// 获取用户信息
router.get('/profile',authMiddleware, async function(req,res,next){
  res.send(req.user)
})

module.exports = router;
