import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

let client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!client) {
    client = createClient({ url: redisUrl });
    client.on("error", (err) => console.error("Redis error:", err));
  }
  return client;
}

export async function connectRedis() {
  const c = getClient();
  if (!c.isOpen) {
    await c.connect();
  }
  return c;
}

export async function redisSet(key: string, value: string, options?: { EX?: number }) {
  const c = await connectRedis();
  await c.set(key, value, options);
}

export async function redisGet(key: string) {
  const c = await connectRedis();
  return c.get(key);
}

export async function redisDel(key: string) {
  const c = await connectRedis();
  return c.del(key);
}
