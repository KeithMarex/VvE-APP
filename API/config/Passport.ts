require('dotenv').config({ path: `~/.env.${process.env.NODE_ENV}` })
import { ExtractJwt, JwtStrategy } from 'passport-jwt'

import User from '../models/User';

export default function(passport) {
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