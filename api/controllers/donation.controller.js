import asyncHandler from 'express-async-handler';
import stripe from 'stripe';
import Event from '../models/event.model.js';
import User from '../models/user.model.js';
import { Novu } from '@novu/node';

const createPaymentIntent = asyncHandler(async (req, res) => {
  const Stripe = stripe(process.env.STRIPE_SECRET_KEY);
  const { eventid } = req.params;
  const { amount, currency, event_owner } = req.body;
  try {
    const response = await Event.findById(eventid);
    const session = await Stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: 'http://localhost:5173?x=' + event_owner,
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

const confirmDonation = asyncHandler(async (req, res) => {
  const novu = new Novu(process.env.NOVU_API_KEY);
  try {
    const user = await User.findById(req.params.id);
    // Send user a email
    await novu.trigger('donation', {
      to: {
        subscriberId: user.email,
        email: user.email,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
});
const calculateOrderAmount = (amount) => {
  amount = amount * 100;
  return amount;
};

export { createPaymentIntent, confirmDonation };
