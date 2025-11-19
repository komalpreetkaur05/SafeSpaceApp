
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find the user in our database using their Clerk ID
    const dbUser = await prisma.user.findUnique({
      where: { clerk_user_id: userId },
    });
    console.log("Audit logs API: dbUser:", dbUser);

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Step 3: fetch audit logs using integer ID
    const auditLogs = await prisma.auditLog.findMany({
      where: {
        user_id: dbUser.id,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
