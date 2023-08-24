const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Staff = mongoose.model('Staff');
const keys = require('../config/keys');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Staff.findById(jwt_payload.id)
                .then(staff => {
                    if(staff){
                        return done(null, staff);
                    }
                    return done(null, false);
                })
                .catch(err => {return done(err, false)});
        })
    );
}