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
