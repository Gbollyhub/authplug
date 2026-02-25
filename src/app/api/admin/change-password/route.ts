import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/adminAuth";
import { validateHash, hashString } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const payload = getAdminFromCookie(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { currentPassword, newPassword } = body;

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isValid = await validateHash(user.password, currentPassword);
  if (!isValid) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 401 }
    );
  }

  const hashedPassword = await hashString(newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return NextResponse.json(
    { message: "Password updated successfully" },
    { status: 200 }
  );
}
