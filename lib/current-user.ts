import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function currentUser() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const found = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return found;
}
