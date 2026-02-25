import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";

// GET — list all allowed redirect origins
export async function GET(req: NextRequest) {
  const payload = getAdminFromCookie(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const urls = await prisma.allowedRedirectUrl.findMany({
    where: { customerId: payload.customerId },
    orderBy: { createdAt: "asc" },
    select: { id: true, origin: true, createdAt: true },
  });

  return NextResponse.json({ data: urls }, { status: 200 });
}

// POST — register a new allowed redirect origin
export async function POST(req: NextRequest) {
  const payload = getAdminFromCookie(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { url } = body;

  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  let origin: string;
  try {
    origin = new URL(url).origin;
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const entry = await prisma.allowedRedirectUrl.create({
      data: { origin, customerId: payload.customerId },
      select: { id: true, origin: true, createdAt: true },
    });
    return NextResponse.json(
      { message: "Redirect URL registered", data: entry },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "This origin is already registered" },
      { status: 409 }
    );
  }
}

// DELETE — remove an allowed redirect origin by id
export async function DELETE(req: NextRequest) {
  const payload = getAdminFromCookie(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id query param is required" }, { status: 400 });
  }

  const entry = await prisma.allowedRedirectUrl.findFirst({
    where: { id, customerId: payload.customerId },
  });

  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.allowedRedirectUrl.delete({ where: { id } });

  return NextResponse.json({ message: "Redirect URL removed" }, { status: 200 });
}
