//INIT .env
import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLEOAUTHCLIENTID,
            clientSecret: process.env.GOOGLEOAUTHCLIENTSECRET,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('accessToken:', accessToken);
            console.log('refreshToken:', refreshToken);
            console.log('profile:', profile);
        }
    )
);
