const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require('../middleware/auth');
const jwt = require("jsonwebtoken");

// route to get all users
// todo pagination in this route maybe?

router.get("/self", auth, (req, res) => {
  res.send(req.user);
});

router.post("/signin", (req, res) => {
  // let email = req.body.email;
  let incomingEmail = req.body.email;
  let password = req.body.password;

  // mongoose email mapped to email sent via postman
  User.findOne({ email: incomingEmail })
    .then(user => {
      if (!user)
        return res.status(400).send({ message: "Wrong email or password." });

      bcrypt
        .compare(password, user.password)
        .then(result => {
          if (result) {
            jwt.sign(
              { email: user.email },
              "topsecretkeepitsafe",
              {
                expiresIn: 60 * 60 * 48
              },
              function (err, token) {
                if (err) {
                  res.status(500).send("Server issue");
                } else {
                  res.send({
                    message: "successs",
                    token: token
                  });
                }
              }
            );
          } else {
            return res
              .status(400)
              .send({ message: "wrong email or password." });
          }
        })
        .catch(err => {
          console.log("compare failed", err);
          return res.status(500).send({ message: "Something went wrong." });
        });
    })

    .catch(err => {
      console.log(err);
      res.status(500).send({ message: "Server issue." });
    });
});

router.post("/", (req, res) => {
  bcrypt
    .hash(req.body.password, 7)
    .then(function (hash) {
      var newUser = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: hash
      });

      newUser
        .save()
        .then(user => {
          return res
            .status(201)
            .send({ data: user, message: "Successfully created." });
        })
        .catch(err => {
          // TODO VALIDATION 409 o r 500 and so on
          console.log(err);
          return res
            .status(500)
            .send({ message: "Something went wrong mongo" });
        });
    })
    .catch(err => {
      res.status(500).send({ message: "something went wrong hash" });
    });
});

router.get("/:uname", (req, res) => {
  User.findOne({ username: req.params.uname })
    .then(user => {
      if (!user) return res.status(404).send({ message: "Not Found." });
      return res.status(200).send({ data: user, message: "Successfull" });
    })
    .catch(err => {
      return res.status(500).send({ message: "Something went wrong." });
    });
});

router.put("/:uname", (req, res) => {
  User.update({ username: req.params.uname }, req.body)
    .then(updatedUser => {
      User.findOne({ username: req.params.username })
        .then(foundUser => {
          return res
            .status(200)
            .send({ data: foundUser, message: "Successfully updated user." });
        })
        .catch(err => {
          return res.status(500).send({ message: "Something went wrong." });
        });
    })
    .catch(err => {
      return res.status(500).send({ message: "Something went wrong." });
    });
});

router.put('/', auth, (req, res) => {
  req.user.fullname = req.body.fullname;
  res.send(req.user);
});



module.exports = router;
