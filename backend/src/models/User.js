const mongoose = require("mongoose");

var schema = {
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, sparse: true, unique: true, default: null },
  password: { type: String, required: true }
};
var User = mongoose.model("User", schema);

module.exports = User;
