import { NextRequest, NextResponse } from "next/server";
import { validateHash, generateToken } from "@/lib/auth";
import { redisClient, connectRedis } from "@/lib/redis";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    await connectRedis();
    const body = await req.json();
    const { email, password, customerId } = body;

    if (!email || !password || !customerId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // verify this user is an admin for this customer
    const membership = await prisma.usersOnCustomers.findUnique({
      where: {
        userId_customerId: { userId: user.id, customerId },
      },
    });

    if (!membership || membership.role !== "admin") {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // validate password
    const isPasswordValid = await validateHash(user.password, password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // check 2FA is set up
    if (!user.totpSecret) {
      return NextResponse.json(
        { error: "2FA setup is not complete for this account" },
        { status: 403 }
      );
    }

    // credentials valid — store pending admin login session for TOTP verification
    const tempToken = generateToken();

    await redisClient.set(
      `pending_admin_login:${tempToken}`,
      JSON.stringify({
        userId: user.id,
        email: user.email,
        customerId,
        role: membership.role,
        totpSecret: user.totpSecret,
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
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
