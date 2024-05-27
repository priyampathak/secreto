import { connectionSrt } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { User } from "@/app/lib/Model/user";

export async function GET(){
  try {
    await mongoose.connect(connectionSrt);
    const data = await User.find();
    console.log(data)
    return NextResponse.json({"result":data})
  }  catch(error) {
    console.error("Error occured to GET user", error)
    return NextResponse.json({error:"error"})
  }
}