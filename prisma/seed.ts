import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // --- Seed Admin User ---
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@bookstore.com" },
  });

  if (existingAdmin) {
    console.log("Admin user already exists — skipping.");
  } else {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
      data: {
        name: "Administrator",
        email: "admin@bookstore.com",
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    console.log("Admin user created (admin@bookstore.com / admin123)");
  }

  // --- Seed Categories ---
  const categoryNames = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "History",
    "Biography",
  ];

  for (const name of categoryNames) {
    const existing = await prisma.category.findUnique({
      where: { name },
    });

    if (!existing) {
      await prisma.category.create({ data: { name } });
      console.log(`Category created: ${name}`);
    } else {
      console.log(`Category already exists: ${name} — skipping.`);
    }
  }

  console.log("\nSeed completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });