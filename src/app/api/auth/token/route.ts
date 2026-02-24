import { NextRequest, NextResponse } from "next/server";
import { JWT_SECRET } from "@/lib/env";
import { redisClient, connectRedis } from "@/lib/redis";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectRedis();
    const body = await req.json();
    const { customerId, authId } = body;

    // validate required fields
    if (!customerId || !authId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const tempData = await redisClient.get(`auth_id:${authId}`);

    if (!tempData) {
      return NextResponse.json(
        { error: "Invalid or expired authId" },
        { status: 401 }
      );
    }

    const parsedData = JSON.parse(tempData);

    //sign a jwt token for the user
    const token = jwt.sign(
      {
        sub: parsedData.user.id,
        email: parsedData.user.email,
        customerId: parsedData.user.customerId,
        role: parsedData.user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    redisClient.del(`auth_id:${authId}`);

    const result = {
      token,
      user: {
        sub: parsedData.user.id,
        email: parsedData.user.email,
        customerId: parsedData.user.customerId,
        role: parsedData.user.role,
      },
    };

    return NextResponse.json(
      { message: "Operation successfull", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
