import { prisma } from "@/lib/prisma";
import { getCurrentUser, redirectToLogin } from "@/lib/session";

async function initialUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirectToLogin();
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (currentUser) {
    return currentUser;
  }

  const newUser = await prisma.user.create({
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    },
  });

  return newUser;
}

export { initialUser };
