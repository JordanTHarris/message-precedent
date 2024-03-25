import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function Page() {
  const user = await getCurrentUser();

  // redirect to login page if not logged in
  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
}
