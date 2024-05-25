const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  messages: {
    type: String,
    default: "", 
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
