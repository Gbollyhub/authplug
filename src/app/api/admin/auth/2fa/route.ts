import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { redisClient, connectRedis } from "@/lib/redis";
import { verify } from "otplib";

export async function POST(req: NextRequest) {
  try {
    await connectRedis();
    const body = await req.json();
    const { tempToken, totpCode } = body;

    if (!tempToken || !totpCode) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const raw = await redisClient.get(`pending_admin_login:${tempToken}`);

    if (!raw) {
      return NextResponse.json(
        { error: "Login session expired or invalid. Please log in again." },
        { status: 401 }
      );
    }

    const { userId, email, customerId, role, totpSecret } = JSON.parse(raw);

    const isValid = verify({ token: totpCode, secret: totpSecret });

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid TOTP code" },
        { status: 401 }
      );
    }

    // 2FA passed — clean up pending session
    await redisClient.del(`pending_admin_login:${tempToken}`);

    // sign a JWT for the admin dashboard (8-hour session)
    const adminToken = signToken({ userId, email, customerId, role }, "8h");

    const res = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    res.cookies.set("adminToken", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 hours
    });

    return res;
  } catch (error) {
    console.error("Admin 2FA error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
