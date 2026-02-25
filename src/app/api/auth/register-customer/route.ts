import { NextRequest, NextResponse } from "next/server";
import { hashString, generateToken } from "@/lib/auth";
import { redisClient, connectRedis } from "@/lib/redis";
import { generateSecret, generateURI } from "otplib";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    await connectRedis();
    const body = await req.json();
    const { companyName, email, password } = body;

    // validate required fields
    if (!companyName || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please proceed to login." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashString(password);
    const totpSecret = generateSecret();
    const qrUri = generateURI({ issuer: "AuthPlug", label: email, secret: totpSecret });
    const tempToken = await generateToken();

    // store pending company registration in Redis — do NOT write to DB yet
    await redisClient.set(
      `pending_company_reg:${tempToken}`,
      JSON.stringify({ companyName, email, hashedPassword, totpSecret }),
      { EX: 600 } // 10 minutes to complete 2FA setup
    );

    return NextResponse.json(
      {
        message: "Scan the QR code with your authenticator app, then submit your TOTP code to complete registration",
        data: { tempToken, qrUri },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Register customer error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
