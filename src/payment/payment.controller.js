import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use your secret key

async function createPaymentStripe(req, res, next) {
    const { amount, currency } = req.body;
    
    console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY);  // Ensure key is correctly logged
    console.log(amount, currency);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error.message);
        return next(error);
    }
}

export { createPaymentStripe };
