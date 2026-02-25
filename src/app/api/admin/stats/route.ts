import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const payload = getAdminFromCookie(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [totalUsers, totalRedirectUrls] = await Promise.all([
    prisma.usersOnCustomers.count({
      where: { customerId: payload.customerId },
    }),
    prisma.allowedRedirectUrl.count({
      where: { customerId: payload.customerId },
    }),
  ]);

  return NextResponse.json(
    { data: { totalUsers, totalRedirectUrls } },
    { status: 200 }
  );
}
