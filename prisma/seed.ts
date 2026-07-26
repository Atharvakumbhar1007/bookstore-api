import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

    const admin = await prisma.user.findUnique({
        where: {
            email: "admin@bookstore.com",
        },
    });

    if (admin) {
        console.log("Admin already exists");
        return;
    }

    const hashedPassword = await bcrypt.hash(
        "admin123",
        10
    );

    await prisma.user.create({
        data: {
            name: "Administrator",
            email: "admin@bookstore.com",
            password: hashedPassword,
            role: Role.ADMIN,
        },
    });

    console.log("Admin created successfully");

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