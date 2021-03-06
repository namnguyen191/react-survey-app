import dotenv from 'dotenv';
import express from 'express';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import path from 'path';

import './services/passport.js';
import dbConnection from './services/database.js';
import authRoutes from './routes/authRoutes.js';
import billingRoutes from './routes/billingRoutes.js';
import surveyRoutes from './routes/surveyRoutes.js';

//INIT .env
dotenv.config();

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
authRoutes(app);

// STRIPE BILLING ROUTES HANDLER
billingRoutes(app);

// SURVEY ROUTES
surveyRoutes(app);

if (process.env.NODE_ENV === 'production') {
    // MAKE SURE THAT EXPRESS WILL SERVE UP PROD ASSETS
    app.use(express.static('client/build'));

    // MAKE SURE THAT EXPRESS WILL SERVE UP THE INDEX.HTML FILE IF IT DOES NOT REGCONIZE THE ROUTE
    // THIS BASICALLY LET REACT ROUTER TAKE OVER
    app.get('*', (req, res) => {
        const __dirname = path.resolve();
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('App is running on PORT:', process.env.PORT);
console.log('Node environment is:', process.env.NODE_ENV);
