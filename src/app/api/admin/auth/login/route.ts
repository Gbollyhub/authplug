import { NextRequest, NextResponse } from "next/server";
import { validateHash, generateToken } from "@/lib/auth";
import { redisSet } from "@/lib/redis";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
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

    // find their admin membership (look up customer from the user's memberships)
    const membership = await prisma.usersOnCustomers.findFirst({
      where: { userId: user.id, role: "admin" },
    });

    if (!membership) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { customerId } = membership;

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

    await redisSet(
      `pending_admin_login:${tempToken}`,
      JSON.stringify({
        userId: user.id,
        email: user.email,
        customerId,
        role: membership.role,
        totpSecret: user.totpSecret,
      }),
      { EX: 300 }
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
