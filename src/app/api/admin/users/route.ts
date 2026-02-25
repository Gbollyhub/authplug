import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const payload = getAdminFromCookie(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const memberships = await prisma.usersOnCustomers.findMany({
    where: { customerId: payload.customerId },
    orderBy: { createdAt: "asc" },
    select: {
      role: true,
      createdAt: true,
      user: {
        select: { id: true, email: true },
      },
    },
  });

  const users = memberships.map((m) => ({
    id: m.user.id,
    email: m.user.email,
    role: m.role,
    joinedAt: m.createdAt,
  }));

  return NextResponse.json({ data: users }, { status: 200 });
}
