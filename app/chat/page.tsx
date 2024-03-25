import { getCurrentUser, redirectToLogin } from "@/lib/session";

export default async function Page() {
  const user = await getCurrentUser();

  // redirect to login page if not logged in
  if (!user) {
    redirectToLogin();
  }

  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
}
