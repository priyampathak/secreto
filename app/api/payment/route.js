import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.SECRET_KEY);

export const POST = async (request) => {
  try {
    const data = await request.json();
    const customer = await stripe.customers.create({
      email: data.email, // Use customer email from frontend
      address: {
        city: data.city, // Use customer city from frontend
        country: data.country, // Use customer country from frontend
        postal_code: data.zip, // Use customer zip from frontend
      },
      name: data.name, // Use customer name from frontend
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'amazon_pay'],
      mode: 'payment',
      success_url: `http://localhost:3000/success?token=${customer.id}`, // Fix typo here
      cancel_url: `http://localhost:3000/cancel?token=${customer.id}`, // Fix typo here
      line_items: [{
        quantity: data.quantity,
        price_data: {
          product_data:{
            name:'CARMELL',
          },
          currency: 'USD',
          unit_amount: data.price * 100, // Fix price calculation
        },
      }],
    });

    return NextResponse.json(
      {
        msg: checkoutSession, url: checkoutSession.url
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message || 'An unknown error occurred',
      },
      {
        status: 500,
      }
    );
  }
};
