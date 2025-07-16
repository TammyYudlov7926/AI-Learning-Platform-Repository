import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAdminUser(name: string, phone: string, rawPassword: string) {
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const existing = await prisma.user.findUnique({ where: { phone } });
  if (existing) {
    console.log(`⚠️ Admin already exists: ${existing.name} (${existing.phone})`);
    return;
  }

  const user = await prisma.user.create({
    data: {
      name,
      phone,
      role: 'ADMIN',
      password: hashedPassword,

    },
  });

  console.log(`✅ Created role ADMIN: ${user.name} (${user.phone})`);
}

createAdminUser('Tammy', '0583287926', '328302716')
  .then(() => process.exit())
  .catch((err) => {
    console.error('Error creating admin', err);
    process.exit(1);
  });
