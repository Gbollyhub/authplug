import { NextRequest, NextResponse } from "next/server";
import { validateHash, generateToken, hashString } from "@/lib/auth";
import { JWT_SECRET } from "@/lib/env";
import { redisClient, connectRedis } from "@/lib/redis";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectRedis();
    const body = await req.json();
    const { customerId, email, password } = body;

    // validate required fields
    if (!customerId || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // check if the customerId is valid
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { error: "Customer account not found" },
        { status: 404 }
      );
    }

    // check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // check if password match
    const isPasswordValid = await validateHash(existingUser.password, password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // check if the user and customer match
    let userOnCustomer = await prisma.usersOnCustomers.findUnique({
      where: {
        userId_customerId: {
          userId: existingUser.id,
          customerId,
        },
      },
    });

    // auto-link user if not yet registered for this customer
    if (!userOnCustomer) {
      userOnCustomer = await prisma.usersOnCustomers.create({
        data: {
          userId: existingUser.id,
          customerId,
          role: "user",
        },
      });
    }

    const authId = await generateToken();
    const refreshToken = await generateToken();

    await prisma.refreshToken.create({
      data: {
        token: hashString(refreshToken),
        userId: existingUser.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    // save authId and user data to redis with a short expiry
    await redisClient.set(
      `auth_id:${authId}`,
      JSON.stringify({
        authId,
        user: {
          id: existingUser.id,
          email: existingUser.email,
          customerId,
          role: userOnCustomer.role,
        },
      }),
      { EX: 300 } // automatic expiry
    );

    const result = {
      authId,
    };

    const res = NextResponse.json(
      { message: "Login successful", data: result },
      { status: 200 }
    );

    // Set cookie
    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
