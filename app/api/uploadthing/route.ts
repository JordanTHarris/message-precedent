import { NextRequest, NextResponse } from "next/server";
import { createRouteHandler } from "uploadthing/next";

import { UTApi } from "uploadthing/server";
import { currentUser } from "@/lib/current-user";
import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});

export async function DELETE(request: NextRequest) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");
  console.log("DELETE", url);

  if (!url) {
    return new NextResponse("Bad request", { status: 400 });
  }

  const newUrl = url.substring(url.lastIndexOf("/") + 1);
  const utapi = new UTApi();
  const response = await utapi.deleteFiles(newUrl);

  if (response.success) console.log("FILE_DELETED", response);

  return NextResponse.json({ message: "ok" });
}
