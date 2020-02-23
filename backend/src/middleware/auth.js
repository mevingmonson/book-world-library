const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    let incomingToken = req.headers.authorization.substring(7);

    jwt.verify(incomingToken, "topsecretkeepitsafe", (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        else {
            let emailFromToken = decoded.email;
            User.findOne({ email: emailFromToken })
                .then(foundUser => {
                    req.user = foundUser;
                    next();
                })
                .catch(err => {
                    return res.status(500).send({ message: "Somethingdd went wrong" });

                });
        }
    });
};

module.exports = auth;