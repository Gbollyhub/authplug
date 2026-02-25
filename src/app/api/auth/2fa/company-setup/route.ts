import { NextRequest, NextResponse } from "next/server";
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

    const raw = await redisClient.get(`pending_company_reg:${tempToken}`);

    if (!raw) {
      return NextResponse.json(
        { error: "Registration session expired or invalid. Please start again." },
        { status: 401 }
      );
    }

    const { companyName, email, hashedPassword, totpSecret } = JSON.parse(raw);

    const isValid = verify({ token: totpCode, secret: totpSecret });

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid TOTP code" },
        { status: 401 }
      );
    }

    // 2FA verified — write Customer + admin User to the database
    const result = await prisma.$transaction(async (tx) => {
      const newCustomer = await tx.customer.create({
        data: { name: companyName },
      });

      const newUser = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          totpSecret,
        },
      });

      await tx.usersOnCustomers.create({
        data: {
          userId: newUser.id,
          customerId: newCustomer.id,
          role: "admin",
        },
      });

      return { customerId: newCustomer.id, userId: newUser.id };
    });

    // clean up pending registration from Redis
    await redisClient.del(`pending_company_reg:${tempToken}`);

    return NextResponse.json(
      {
        message: "Company registered successfully. You can now log in to your admin dashboard.",
        data: { customerId: result.customerId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Company 2FA setup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
