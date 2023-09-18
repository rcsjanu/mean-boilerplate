const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users.controller');

router.post(
    '/register',
    userController.addUser
);

router.post(
    '/authenticate',
    userController.authenticateUser
)

router.get(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    userController.getUserDetailsById
);

router.get(
    '/user-profile',
    passport.authenticate('jwt', { session: false }),
    userController.getUserDetailsByUserName
);
module.exports = router;