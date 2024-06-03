import { connectDB } from "@/app/lib/connection";
import { Order } from "@/app/lib/Model/orders";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  try {
    const orders = await Order.find();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const payload = await req.json();
  let order = new Order(payload);
  try {
    const result = await order.save();
    return new Response(JSON.stringify({ result, success: true }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message, success: false }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

