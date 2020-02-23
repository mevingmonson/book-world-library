const Book = require("../models/Book");
const express = require("express");
const router = express.Router();

router.get("/:isbn", (req, res) => {
    const i = req.params.isbn;
    console.log(i);
    Book.find({ isbn: i }).then(book => {
        if (Book) {
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
    //storing the json body in a variable
    var incomingdata = req.body;
    //creating a new Book Object
    var a = new Book(incomingdata);
    a.save(function (err, book) {
        if (err) {
            console.log(err);
            res.status(400);
            return res.send({ state: "Fail" });
        }

        return res.send({ state: "success" });
    });
});

// router.put("/:i", (req, res) => {
//     res.send(`updating book ${req.params.i}`);
// });

router.put("/:abc", (req, res) => {
    Book.update({ isbn: req.params.abc }, req.body)
        .then(status => {
            Book.findOne({ isbn: req.params.abc })
                .then(book => {
                    res.send(book);
                })
                .catch(err => {
                    res.status(500).send({ status: "fail" })
                });
        })
        .catch(err => {
            res.status(500).send({ state: "fail" });
        });
});

router.delete("/:isbn", (req, res) => {
    res.send("deleting book with isbn" + req.params.isbn);
});

router.get("/", (req, res) => {
    res.send("hello from books");
});

module.exports = router;
