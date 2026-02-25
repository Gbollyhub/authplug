import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { JwtPayload } from "jsonwebtoken";

export function getAdminFromCookie(req: NextRequest): JwtPayload | null {
  const token = req.cookies.get("adminToken")?.value;
  if (!token) return null;
  try {
    const payload = verifyToken(token);
    if (payload.role !== "admin") return null;
    return payload;
  } catch {
    return null;
  }
}
