import { NextResponse } from "next/server";
import { Product } from "@/app/lib/Model/product";
import { connectDB } from "@/app/lib/connection";

export async function GET(req, content) {
  await connectDB();
  try {
    const product_id = content.params.producto;
    const record = {_id: product_id}

    // Find the product by ID
    const product = await Product.findById(record);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();

  try {
    const id = params.producto; // Access email from params
    const body = await req.json(); // Get the data from the request body
    const product = await Product.findOneAndUpdate({ _id: id }, body, { new: true }); // Find and update user by email

    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, result: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const id = params.producto; // Access product ID from params
    const product = await Product.findByIdAndDelete(id); // Find and delete product by ID

    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}