var mongoose = require("mongoose");
var bcrypt = require('bcrypt')

mongoose.connect("mongodb://localhost:27017/express-auth", {
  useCreateIndex: true,
  useNewUrlParser: true,
});
// 定义User model
const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  password: { type: String,set(val){
    return bcrypt.hashSync(val,10)
  } },
});

const User = mongoose.model("User", UserSchema);
// User.db.dropCollection('users') // 删除users集合

module.exports = { User };
