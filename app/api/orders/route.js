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
  await connectDB();
  const payload=await req.json()
  let order = new Order(payload)
  const result = await order.save()
  return NextResponse.json({result, sucess: true})
}

export async function PUT(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  await connectDB();
  try {
    const { id } = await req.json();
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(deletedOrder);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
