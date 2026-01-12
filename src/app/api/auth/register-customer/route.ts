import { NextRequest, NextResponse } from "next/server";
import { hashString } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
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
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const hashPass = await hashString(password);

    const result = await prisma.$transaction(async (tx) => {
      // create a new customer account
      const newCustomer = await tx.customer.create({
        data: {
          name: companyName,
        },
      });

      // create a new user
      const newUser = await tx.user.create({
        data: {
          email,
          password: hashPass,
        },
      });

      // create a user customer relationship
      await tx.usersOnCustomers.create({
        data: {
          userId: newUser.id,
          customerId: newCustomer.id,
          role: "admin",
        },
      });

      return { userId: newUser.id, customerId: newCustomer.id };
    });

    return NextResponse.json(
      { message: "Account created successfully", data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register customer error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
