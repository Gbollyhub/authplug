import { NextRequest, NextResponse } from "next/server";
import { validateHash, generateToken } from "@/lib/auth";
import { redisClient, connectRedis } from "@/lib/redis";
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

    // check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // check password
    const isPasswordValid = await validateHash(existingUser.password, password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // check 2FA is set up
    if (!existingUser.totpSecret) {
      return NextResponse.json(
        { error: "2FA setup is not complete for this account" },
        { status: 403 }
      );
    }

    // check if user is linked to this customer — auto-link if not (one identity, many tenants)
    let userOnCustomer = await prisma.usersOnCustomers.findUnique({
      where: {
        userId_customerId: {
          userId: existingUser.id,
          customerId,
        },
      },
    });

    if (!userOnCustomer) {
      userOnCustomer = await prisma.usersOnCustomers.create({
        data: {
          userId: existingUser.id,
          customerId,
          role: "user",
        },
      });
    }

    // credentials valid — store a pending login session for 2FA verification
    const tempToken = await generateToken();

    await redisClient.set(
      `pending_login:${tempToken}`,
      JSON.stringify({
        userId: existingUser.id,
        email: existingUser.email,
        customerId,
        role: userOnCustomer.role,
        totpSecret: existingUser.totpSecret,
        redirectUrl,
      }),
      { EX: 300 } // 5 minutes to complete 2FA
    );

    return NextResponse.json(
      {
        message: "Credentials verified. Please submit your TOTP code to complete login.",
        data: { tempToken },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
