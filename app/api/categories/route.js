import { connectDB } from "@/app/lib/connection";
import { Category } from "@/app/lib/Model/category";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  try {
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const newCategory = new Category(body);
    const savedCategory = await newCategory.save();
    return NextResponse.json(savedCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  await connectDB();
  try {
    const { id } = await req.json();
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(deletedCategory);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
