import prisma from "./prisma";

export async function validateRedirectUrl(
  customerId: string,
  redirectUrl: string
): Promise<boolean> {
  try {
    const origin = new URL(redirectUrl).origin;
    const match = await prisma.allowedRedirectUrl.findFirst({
      where: { customerId, origin },
    });
    return !!match;
  } catch {
    return false;
  }
}
