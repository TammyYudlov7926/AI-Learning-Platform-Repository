import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // ← Here you create the database connector

const seed = async () => {
const categories = [
  {
    name: 'Science & Nature',
    subCategories: ['Physics', 'Biology', 'Geology', 'Astronomy'],
  },
  {
    name: 'Technology & Coding',
    subCategories: ['Web Development', 'Mobile Apps', 'Cybersecurity', 'Data Science'],
  },
  {
    name: 'Literature',
    subCategories: ['Poetry', 'Drama', 'Novels', 'Short Stories'],
  },
  {
    name: 'History & Culture',
    subCategories: ['Ancient Civilizations', 'Middle Ages', 'Renaissance', 'Modern History'],
  },
  {
    name: 'Math & Logic',
    subCategories: ['Algebra', 'Probability', 'Logic Games', 'Number Theory'],
  },
  {
    name: 'Languages & Communication',
    subCategories: ['Grammar', 'Translation', 'Rhetoric', 'Linguistics'],
  },
  {
    name: 'Art & Design',
    subCategories: ['Digital Art', 'Sketching', 'Photography', 'Interior Design'],
  },
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