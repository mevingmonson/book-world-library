const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true }
});

schema.index({ title: "text" });

var Book = mongoose.model("Book", schema);

// export default Book;
module.exports = Book;
