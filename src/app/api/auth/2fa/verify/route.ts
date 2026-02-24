import { NextRequest, NextResponse } from "next/server";
import { generateToken, hashToken } from "@/lib/auth";
import { redisClient, connectRedis } from "@/lib/redis";
import { verify } from "otplib";
import prisma from "@/lib/prisma";

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

    const raw = await redisClient.get(`pending_login:${tempToken}`);

    if (!raw) {
      return NextResponse.json(
        { error: "Login session expired or invalid. Please log in again." },
        { status: 401 }
      );
    }

    const { userId, email, customerId, role, totpSecret, redirectUrl } = JSON.parse(raw);

    const isValid = verify({ token: totpCode, secret: totpSecret });

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid TOTP code" },
        { status: 401 }
      );
    }

    // 2FA passed — clean up pending session
    await redisClient.del(`pending_login:${tempToken}`);

    // create refresh token
    const refreshTokenString = await generateToken();
    const hashedRefreshToken = hashToken(refreshTokenString);

    await prisma.refreshToken.create({
      data: {
        token: hashedRefreshToken,
        userId,
        customerId,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    // generate authId for the redirect back to the company site
    const authId = await generateToken();

    await redisClient.set(
      `auth_id:${authId}`,
      JSON.stringify({
        authId,
        user: { id: userId, email, customerId, role },
      }),
      { EX: 300 } // 5 minutes to exchange for a token
    );

    const res = NextResponse.json(
      { message: "Login successful", data: { authId, redirectUrl } },
      { status: 200 }
    );

    res.cookies.set("refreshToken", refreshTokenString, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return res;
  } catch (error) {
    console.error("2FA verify error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
