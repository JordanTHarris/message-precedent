// import { getServerSession } from "next-auth";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiResponseServerIo } from "@/types/types";

export async function currentUserPages(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user;

  if (!user) {
    return null;
  }

  return user;
}
