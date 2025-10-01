import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Lookup user in DB
    const user = await prisma.user.findUnique({
      where: { clerk_user_id: userId },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (err) {
    console.error("Error in getRole:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
