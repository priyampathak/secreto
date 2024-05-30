import { connectDB } from "@/app/lib/connection";
import { User } from "@/app/lib/Model/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  try {
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req){
  const payload = await req.json();
  let user = new User(payload);
  try{
    const result = await user.save()
    return new Response(JSON.stringify({ result, success: true }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }catch(error) {
    return new Response(JSON.stringify({ error: error.message, success: false }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}