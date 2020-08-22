//INIT .env
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import path from 'path';

import dbConnection from './services/database.js';

// EXPRESS INIT
const app = express();

// USE BODY PARSER
app.use(bodyParser.json());

// COOKIES INIT
const daysToMilliSecs = 24 * 60 * 60 * 1000;
const cookiesKeysArray = [
    process.env.COOKIE_KEY_1,
    process.env.COOKIE_KEY_2,
    process.env.COOKIE_KEY_3,
    process.env.COOKIE_KEY_4,
    process.env.COOKIE_KEY_5
];
app.use(
    cookieSession({
        maxAge: 30 * daysToMilliSecs,
        keys: cookiesKeysArray // 1 key will be selected randomly upon creating a cookie for an additional level of security
    })
);

// TELL PASSPORT TO USE COOKIE FOR AUTH
app.use(passport.initialize());
app.use(passport.session());

// CONNECTING TO MONGOOSE DB
dbConnection();

// GOOGLE OAUTH ROUTES HANDLER
import './services/passport.js';
import authRoutes from './routes/authRoutes.js';
authRoutes(app);

// STRIPE BILLING ROUTES HANDLER
import billingRoutes from './routes/billingRoutes.js';
billingRoutes(app);

if (process.env.NODE_ENV === 'production') {
    // MAKE SURE THAT EXPRESS WILL SERVE UP PROD ASSETS
    app.use(express.static('client/build'));

    // MAKE SURE THAT EXPRESS WILL SERVE UP THE INDEX.HTML FILE IF IT DOES NOT REGCONIZE THE ROUTE
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('App is running on PORT:', process.env.PORT);
