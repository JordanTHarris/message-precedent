import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SignInModal } from "@/components/layout/sign-in-modal";
import { authOptions } from "@/lib/auth";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return <SignInModal />;
}
