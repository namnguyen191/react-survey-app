//INIT .env
import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import User from '../models/User.js';

const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLEOAUTHCLIENTID,
            clientSecret: process.env.GOOGLEOAUTHCLIENTSECRET,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then((existingUser) => {
                if (existingUser) {
                    // We already have a user
                    done(null, existingUser);
                } else {
                    // New user
                    new User({ googleId: profile.id }).save().then((user) => {
                        done(null, user);
                    });
                }
            });
        }
    )
);
