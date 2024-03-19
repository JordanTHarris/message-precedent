import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";

export default async function Profile() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/");
  }

  return (
    <div className="w-full max-w-md px-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">{user?.name}</CardTitle>
          <CardDescription className="text-center">
            {user?.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            className="mx-auto rounded-full"
            src={user?.image || ""}
            alt={user?.name || ""}
            width={140}
            height={140}
          />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="lg">Edit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
