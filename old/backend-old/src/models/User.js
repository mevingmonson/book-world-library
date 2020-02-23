const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    fullname: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    dob: { type: String, required: true }
});

var User = mongoose.model("User", schema);
// export default User;
module.exports = User;