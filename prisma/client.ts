import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
	return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
	prismaClient: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prismaClient ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prismaClient = prisma;
}
