import { NextResponse } from "next/server";
import { db } from "~/server/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await db.user.upsert({
      where: { dni: '00000000' },
      update: { password: hashedPassword, role: 'ADMIN' },
      create: {
        dni: '00000000',
        password: hashedPassword,
        name: 'Super Administrador',
        role: 'ADMIN',
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Super Administrador inyectado en la base de datos de Railway con éxito.", 
      user: { dni: admin.dni, role: admin.role } 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
