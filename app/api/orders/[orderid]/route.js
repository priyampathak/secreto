import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/connection";
import { Order } from "@/app/lib/Model/orders";

export async function GET(req, { params }){
  await connectDB();

  try{
    const id = params.orderid;
    const order = await Order.findOne({ _id: id });

    if(!order){
      return NextResponse.json({ success: false, message: "Order Not Found"}, {status: 404});
    }

    return NextResponse.json({success: true, result: order}, {status:200})
  }catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }){
  await connectDB();

  try{
    const id = params.orderid;
    const body = await req.json(); 
    const order = await Order.findByIdAndUpdate({ _id: id }, body, { new: true });
    if(!order){
      return NextResponse.json({ success: false, message: "Order Not Found"}, {status: 404});
    }

    return NextResponse.json({success: true, result: order}, {status:200})
  }catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}