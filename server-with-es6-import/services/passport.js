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
            clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                // We already have a user
                return done(null, existingUser);
            }
            // New user
            const newUser = new User({ googleId: profile.id }).save();
            done(null, newUser);
        }
    )
);
