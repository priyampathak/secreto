// app/api/user/[email]/route.js
import { User } from "@/app/lib/Model/user";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/connection";

export async function GET(req, { params }) {
  await connectDB();

  try {
    const email = params.ems; // Access email from params
    const user = await User.findOne({ email: email }); // Find user by email

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, result: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();

  try {
    const email = params.ems; // Access email from params
    const body = await req.json(); // Get the data from the request body
    const user = await User.findOneAndUpdate({ email: email }, body, { new: true }); // Find and update user by email

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, result: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}