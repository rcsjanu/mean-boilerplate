const User = require('../models/users.model');

const getUserById = async (id) => {
    const user = await User.findById(id);
    return user;
}

const getUserByUserName = async (user_name) => {
    const user = await User.findOne({ user_name: user_name });
    return user;
}

module.exports = {
    getUserById,
    getUserByUserName
}