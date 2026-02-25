import { NextRequest, NextResponse } from "next/server";
import { hashString, generateToken } from "@/lib/auth";
import { redisClient, connectRedis } from "@/lib/redis";
import { validateRedirectUrl } from "@/lib/validateRedirectUrl";
import { generateSecret, generateURI } from "otplib";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    await connectRedis();
    const body = await req.json();
    const { customerId, email, password, redirectUrl } = body;

    // validate required fields
    if (!customerId || !email || !password || !redirectUrl) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // check if the customerId is valid
    const existingCustomer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { error: "Customer account not found" },
        { status: 404 }
      );
    }

    // validate redirectUrl against customer's registered origins
    const isValidRedirect = await validateRedirectUrl(customerId, redirectUrl);
    if (!isValidRedirect) {
      return NextResponse.json(
        { error: "Invalid redirect URL" },
        { status: 403 }
      );
    }

    // check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "An AuthPlug account already exists for this email. Please log in instead — your account will be linked to this company automatically.",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hashString(password);
    const totpSecret = generateSecret();
    const qrUri = generateURI({ issuer: "AuthPlug", label: email, secret: totpSecret });
    const tempToken = await generateToken();

    // store pending registration in Redis — do NOT write to DB yet
    await redisClient.set(
      `pending_reg:${tempToken}`,
      JSON.stringify({ email, hashedPassword, customerId, totpSecret, redirectUrl }),
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
    console.error("Register user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
