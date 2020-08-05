//INIT .env
import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import User from '../models/User.js';

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLEOAUTHCLIENTID,
            clientSecret: process.env.GOOGLEOAUTHCLIENTSECRET,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.create({ googleId: profile.id });
        }
    )
);
