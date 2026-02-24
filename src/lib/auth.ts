import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_ROUNDS = 12;

// this hashes the string password
export async function hashString(incoming: string) {
  return await bcrypt.hash(incoming, SALT_ROUNDS);
}

// this validates the authencity of the users password
export async function validateHash(existing: string, incoming: string) {
  return await bcrypt.compare(incoming, existing);
}

// generates a random auth token
export async function generateToken() {
  return await crypto.randomBytes(32).toString("hex");
}

// deterministic SHA-256 hash — use this for tokens that need DB lookup (e.g. refresh tokens)
export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
