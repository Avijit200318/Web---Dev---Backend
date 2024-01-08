const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/normalUserLogin")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email:{
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  }
});

userSchema.plugin(plm);

const user = mongoose.model("user", userSchema);

module.exports = user;

