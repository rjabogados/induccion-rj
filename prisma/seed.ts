import { PrismaClient } from '../generated/prisma/index.js'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { dni: '00000000' },
    update: {},
    create: {
      dni: '00000000',
      password: hashedPassword,
      name: 'Super Administrador',
      role: 'ADMIN',
    },
  })
  
  console.log('Admin user seeded:', admin.dni)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
