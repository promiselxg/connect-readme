import asyncHandler from 'express-async-handler';
import stripe from 'stripe';
import Event from '../models/event.model.js';
import { Novu } from '@novu/node';
const novu = new Novu(process.env.NOVU_API_KEY);

const Stripe = stripe(process.env.STRIPE_SECRET_KEY);
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { eventid } = req.params;
  const { amount, currency, customer_email } = req.body;
  try {
    const response = await Event.findById(eventid);
    const session = await Stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: 'http://localhost:5173?',
      cancel_url: 'http://localhost:4242/cancel',
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: response.title,
            },
            unit_amount: calculateOrderAmount(amount),
          },
          quantity: 1,
        },
      ],
    });

    return res.status(201).json({
      status: true,
      data: session.url,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const calculateOrderAmount = (amount) => {
  amount = amount * 100;
  return amount;
};

export { createPaymentIntent };
