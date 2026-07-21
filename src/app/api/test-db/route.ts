import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: { id: true, dni: true, name: true, role: true }
    });
    return NextResponse.json({ success: true, count: users.length, users });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
