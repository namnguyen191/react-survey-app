//INIT .env
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

// EXPRESS INIT
const app = express();

// CONNECTING TO MONGOOSE DB
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(
        () => console.log('Connected to DB!'),
        (err) => console.log('Error:', err)
    );

mongoose.connection.on('error', (err) => {
    logError(err);
});

// GOOGLE OAUTH ROUTES HANDLER
import './services/passport.js';
import authRoutes from './routes/authRoutes.js';
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('App is running on PORT:', process.env.PORT);
