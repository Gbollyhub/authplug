import { NextRequest, NextResponse } from "next/server";
import { generateToken, hashToken } from "@/lib/auth";
import { JWT_SECRET } from "@/lib/env";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const refreshTokenCookie = req.cookies.get("refreshToken")?.value;

    if (!refreshTokenCookie) {
      return NextResponse.json(
        { error: "No refresh token provided" },
        { status: 401 }
      );
    }

    const hashedIncoming = hashToken(refreshTokenCookie);

    // find the token in the DB
    const storedToken = await prisma.refreshToken.findFirst({
      where: { token: hashedIncoming, revoked: false },
      include: { user: true },
    });

    if (!storedToken) {
      return NextResponse.json(
        { error: "Invalid or revoked refresh token" },
        { status: 401 }
      );
    }

    // check expiry
    if (storedToken.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Refresh token has expired. Please log in again." },
        { status: 401 }
      );
    }

    // get the user's role for this customer
    const userOnCustomer = await prisma.usersOnCustomers.findUnique({
      where: {
        userId_customerId: {
          userId: storedToken.userId,
          customerId: storedToken.customerId,
        },
      },
    });

    if (!userOnCustomer) {
      return NextResponse.json(
        { error: "User is no longer associated with this customer" },
        { status: 403 }
      );
    }

    // rotate: create new refresh token and revoke the old one
    const newRefreshTokenString = await generateToken();
    const newHashedRefreshToken = hashToken(newRefreshTokenString);

    const [newToken] = await prisma.$transaction([
      prisma.refreshToken.create({
        data: {
          token: newHashedRefreshToken,
          userId: storedToken.userId,
          customerId: storedToken.customerId,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      }),
      prisma.refreshToken.update({
        where: { id: storedToken.id },
        data: { revoked: true, replacedBy: newHashedRefreshToken },
      }),
    ]);

    // issue new access token
    const accessToken = jwt.sign(
      {
        sub: storedToken.userId,
        email: storedToken.user.email,
        customerId: storedToken.customerId,
        role: userOnCustomer.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const res = NextResponse.json(
      {
        message: "Token refreshed successfully",
        data: {
          token: accessToken,
          user: {
            id: storedToken.userId,
            email: storedToken.user.email,
            customerId: storedToken.customerId,
            role: userOnCustomer.role,
          },
        },
      },
      { status: 200 }
    );

    // set the new refresh token cookie
    res.cookies.set("refreshToken", newRefreshTokenString, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return res;
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
