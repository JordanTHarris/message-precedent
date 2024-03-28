import { redirect } from "next/navigation";
import { SignInModal } from "@/components/modal/sign-in-modal";
import { getCurrentUser } from "@/lib/session";

export default async function Login() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }

  return <SignInModal />;
}
