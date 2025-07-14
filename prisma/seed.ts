import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // ← Here you create the database connector

const seed = async () => {
const categories = [
{
name: 'Science',
subCategories: ['Physics', 'Chemistry', 'Biology', 'Astronomy'],
},
// The rest of the categories...
];

for (const category of categories) {
const existing = await prisma.category.findFirst({ where: { name: category.name } });
if (!existing) {
await prisma.category.create({
data: {
name: category.name,
subCategories: {
create: category.subCategories.map((name) => ({ name })),
},
},
});
}
}

console.log(' Finished entering categories and subcategories');
};

seed()
.catch((err) => console.error('Error running seed:', err))
.finally(() => prisma.$disconnect());