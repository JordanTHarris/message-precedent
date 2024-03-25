import { prisma } from "@/lib/prisma";
import { getCurrentUser, redirectToLogin } from "@/lib/session";

async function initialUser() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirectToLogin();
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
  });

  if (user) {
    return user;
  }

  const newUser = await prisma.user.create({
    data: {
      id: currentUser.id,
      email: currentUser.email,
      name: currentUser.name,
      image: currentUser.image,
    },
  });

  return newUser;
}

export { initialUser };
