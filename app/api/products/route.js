import { connectionSrt } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Product } from "@/app/lib/Model/product";
import { connectDB } from "@/app/lib/connection";

export async function GET(req) {
  await connectDB();
  try {
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const newProduct = new Product(body);
    const savedProduct = await newProduct.save();
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  await connectDB();
  try {
    const { id } = await req.json();
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(deletedProduct);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
