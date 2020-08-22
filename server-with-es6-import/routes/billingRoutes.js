//INIT .env
import dotenv from 'dotenv';
dotenv.config();

import Stripe from 'stripe';

import requireLogin from '../middlewares/requireLogin.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const billingRoutes = (app) => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        req.user.credits += 5;
        const updatedUser = await req.user.save();
        res.send(updatedUser);
    });
};

export default billingRoutes;
