
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET(req) {
  try {
    const { userId: clerkUserId } = getAuth(req);
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find the user in our database using their Clerk ID
    const dbUser = await prisma.user.findUnique({
      where: { clerk_user_id: clerkUserId },
      include: { role: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let whereClause = {};
    // If the user is a support worker, only show their appointments.
    // If they are a team leader or other role, show all appointments.
    if (dbUser.role?.role_name === 'support_worker') {
      whereClause.user_id = dbUser.id;
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        client: true, // Include client details
        user: true,   // Include user (staff) details
      },
      orderBy: {
        appointment_date: "asc",
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
