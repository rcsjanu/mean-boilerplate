const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserById, getUserByUserName } = require('../common/utils');

const addUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser.save();
            });
        });
        return res.status(200).json({ message: "User Registered" });
    } catch (error) {
        return res.status(500).json({ message: "User registration failed", Error: error });
    }
};

const getUserDetailsById = async (req, res, next) => {
    try {
        const user = await getUserById(req.body._id);
        if (user) {
            return res.status(200).json({ message: "User Retrieved", data: user });
        }
    } catch (error) {
        return res.status(500).json({ message: "Unable to get user", Error: error });
    }
}


const getUserDetailsByUserName = async (req, res, next) => {
    try {
        const user = await getUserByUserName(req.body.user_name);
        if (user) {
            return res.status(200).json({ message: "User Retrieved", data: user });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Unable to fetch user details", Error: error });
    }
}

const authenticateUser = async (req, res, next) => {
    const password = req.body.password;
    const user = await User.findOne({ user_name: req.body.user_name })
    User.comparePassword(password, user.password, (err, isMatch) => {
        if (isMatch) {
            const token = jwt.sign({ data: user }, process.env.SECRET, {
                expiresIn: 604800 // 1 week
            });
            res.status(200).json({
                message: "User Authenticated",
                token: token
            })
        } else {
            return res.status(500).json({ message: 'Wrong password', Error: err });
        }
    });
}

module.exports = {
    addUser,
    getUserDetailsById,
    getUserDetailsByUserName,
    authenticateUser
}