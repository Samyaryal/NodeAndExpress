const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
       .then(user => {
           done(null, user);
       });
});


passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id})
                .then((existingUser) => {
                    if (existingUser){
                        done(null, existingUser);
                        // already hav ethe record of the given profile Id 
                    }else {
                        new User ({ googleId: profile.id}).save()
                            .then(user => done(null, user)); // id from users google profile // .save will save the instances to the db
                        // don't have a user record  
                    }
                }) 
        
        }
    )
); // create new instances of the google passport strategy