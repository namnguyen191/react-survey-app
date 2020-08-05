//INIT .env
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

// EXPRESS INIT
const app = express();

// CONNECTING TO MONGOOSE DB
mongoose.connect({

});

// GOOGLE OAUTH ROUTES HANDLER
import './services/passport.js';
import authRoutes from './routes/authRoutes.js';
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('App is running on PORT:', process.env.PORT);
