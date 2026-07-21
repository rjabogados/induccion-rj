import { PrismaClient } from '../generated/prisma/index.js'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findUnique({ where: { dni: '00000000' } })
  console.log('User found:', !!user)
  if (user && user.password) {
    const match = await bcrypt.compare('admin123', user.password)
    console.log('Password match:', match)
  }
}

main().finally(() => prisma.$disconnect())
