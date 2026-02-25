import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const payload = getAdminFromCookie(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customer = await prisma.customer.findUnique({
    where: { id: payload.customerId },
    select: { id: true, name: true },
  });

  return NextResponse.json(
    {
      data: {
        userId: payload.userId,
        email: payload.email,
        customerId: payload.customerId,
        role: payload.role,
        companyName: customer?.name ?? "",
      },
    },
    { status: 200 }
  );
}
