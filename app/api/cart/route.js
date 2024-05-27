import { connectionSrt } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/connection";
import { Cart } from "@/app/lib/Model/cart";

export async function GET(req) {
  await connectDB();
  try {
    const carts = await Cart.find();
    return NextResponse.json(carts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    const updatedCart = await Cart.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    return NextResponse.json(updatedCart);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    const updatedCart = await Cart.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    return NextResponse.json(updatedCart);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  await connectDB();
  try {
    const { id } = await req.json();
    const deletedCart = await Cart.findByIdAndDelete(id);
    if (!deletedCart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    return NextResponse.json(deletedCart);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}