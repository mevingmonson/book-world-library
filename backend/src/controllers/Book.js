const Book = require("../models/Book");
const express = require("express");
const router = express.Router();

router.get("/:isbn", (req, res) => {
  const i = req.params.isbn;
  console.log(i);
  Book.findOne({ isbn: i })
    .then(book => {
      console.log(book);
      if (book) {
        return res.send(book);
      } else {
        return res.status(404).send({ data: [] });
      }
    })
    .catch(err => {
      return res.status(500).send({ state: "fail" });
    });
});

router.post("/", (req, res) => {
  // storing the json body in a variable
  var incomingData = req.body;

  console.log(incomingData);
  //creating a new Book object
  var a = new Book({
    isbn: incomingData["isbn"],
    title: incomingData["title"],
    author: incomingData["author"]
  });

  // via callbacks
  a.save(function(err, book) {
    // if something goes wrong send appropriate message
    if (err) {
      console.log(err);
      // TODO if duplicate return 409
      res.status(400);
      return res.send({ message: "Something went wrong." });
    }

    // if nothing wrong send success
    return res.status(201).send({ message: "successfully created" });
  });
});

router.put("/:abc", (req, res) => {
  Book.update({ isbn: req.params.abc }, req.body)
    .then(status => {
      Book.findOne({ isbn: req.params.abc })
        .then(book => {
          res.send(book);
        })
        .catch(err => {
          res.status(500).send({ state: "fail" });
        });
    })
    .catch(err => {
      res.status(500).send({ state: "fail" });
    });
});

router.delete("/:isbn", (req, res) => {
  res.send("deleting book with isbn " + req.params.isbn);
});

router.get("/", (req, res) => {
  console.log(req.query);

  // let searchTerm = req.query.s || '';
  let searchFilters = {};
  // this works only with exact search
  // for better search I recommend checking out regex
  if (req.query.s) {
    searchFilters = { $text: { $search: req.query.s } };
  }

  Book.find(searchFilters)
    .then(book => {
      // to see loading in action
      setTimeout(() => {
        res.send(book);
      }, 2000);
    })
    .catch(err => {
      res.status(500).send({ message: "Something went wrong." });
    });
});

module.exports = router;
