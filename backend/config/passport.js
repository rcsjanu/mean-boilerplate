const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const { getUserById } = require('../common/utils');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
const passportauth = () => {
    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        const user = getUserById(jwt_payload.data._id)
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}

module.exports = passportauth;