var User = require("./../models/userModel.js")
    , jwt = require("jsonwebtoken")
    , config = require("./../config.js");

module.exports = {

    Login: function (req, res, next) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) {
                return res.status(500).send(err)
            } else {
                if (user) {
                    if (user.comparePassword(req.body.password)) {
                        var token = jwt.sign({
                            _id: user._id
                            , username: user.username
                        }, config.key);
                        res.status(200).json({
                            login: true
                            , loginToken: token
                        });
                    } else {
                        res.status(401).json({
                            login: false
                            , error: "Incorrect Password"
                        });
                    }
                }else{
                    res.status(200).json({
                            login: false
                            , error: "User Does Not Exist"
                        });
                }
            }
        })
    },

    LoggedIn: function (req, res, next) {
        if (req.get('loginToken')) {
            var token = jwt.verify(req.get('loginToken'), config.key);
            User.findById(token._id, function (err, user) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    if (user) {
                        res.status(200).json({
                            loggedIn: true
                        });
                    } else {
                        res.status(200).json({
                            loggedIn: false
                        });
                    }
                }
            })
        } else {
            res.status(200).json({
                loggedIn: false
            });
        }
    },

    RegisterNewLogin: function (req, res, next) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) {
                res.status(500).send(err)
            } else {
                if (user) {
                    res.status(200).json({
                        createdUser: false
                        , error: 'Username Already In Use'
                    });
                } else {
                    User.create(req.body, function (err, newUser) {
                        if (err) {
                            res.status(500).send(err)
                        } else {
                            if (newUser.comparePassword(req.body.password)) {
                                var token = jwt.sign({
                                    _id: newUser._id
                                    , username: newUser.username
                                }, config.key);
                                res.status(200).json({
                                    createdUser: true
                                    , loginToken: token
                                });
                            } else {
                                res.status(401).json({
                                    createdUser: false
                                });
                            }
                        }
                    })
                }
            }
        })
    }

}