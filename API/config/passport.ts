require('dotenv/config')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user.js');

module.exports = function(passport) {
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: process.env.ACCESS_TOKEN
    }, function (jwt_payload, done) {
        User.findById(jwt_payload.data.user._id)
        .then(result => {
            if (result) {
                return done(null, result);
            } else {
                return done(null, false);
            }
        })
        .catch(err => {
            return done(err, false);
        });
    }));
}