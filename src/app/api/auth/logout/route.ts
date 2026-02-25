import { NextRequest, NextResponse } from "next/server";
import { hashToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const refreshTokenCookie = req.cookies.get("refreshToken")?.value;

    if (refreshTokenCookie) {
      const hashed = hashToken(refreshTokenCookie);

      await prisma.refreshToken.updateMany({
        where: { token: hashed, revoked: false },
        data: { revoked: true },
      });
    }

    const res = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    res.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
