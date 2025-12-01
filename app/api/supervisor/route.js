
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function GET(req) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // First, check if the user exists in Convex to prevent race conditions on first login
    const dbUser = await convex.query(api.users.getByClerkId, { clerkId: userId });

    if (!dbUser) {
      // If user is not found in Convex yet, return null. The client will refetch later.
      return NextResponse.json(null);
    }

    // Get team leaders from Convex
    const teamLeaders = await convex.query(api.users.getTeamLeaders, {
      clerkId: userId,
    });

    if (!teamLeaders || teamLeaders.length === 0) {
      // It's not an error to not have a supervisor, just return null.
      return NextResponse.json(null);
    }

    // Return the first team leader found
    return NextResponse.json(teamLeaders[0]);
  } catch (error) {
    console.error('Error fetching supervisor:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
