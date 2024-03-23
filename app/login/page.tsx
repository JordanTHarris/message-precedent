import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SignInForm } from "@/components/layout/sign-in-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Use one of the provided methods below</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}