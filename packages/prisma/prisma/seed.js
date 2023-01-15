import { PrismaClient } from '../dist/index.js'

const prisma = new PrismaClient()
await prisma.$connect()

async function seed() {}

seed()
  .then(() => console.log('✅ Successfully.'))
  .catch((err) => console.log('❌', err))
