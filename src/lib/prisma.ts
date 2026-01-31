import { PrismaClient } from './generated/prisma';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';
// If the default import fails, we might need:
// import * as Database from 'better-sqlite3';


const prismaClientSingleton = () => {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error('DATABASE_URL is not defined in process.env');
    }

    const dbPath = databaseUrl.replace('file:', '');

    const adapter = new PrismaBetterSqlite3({ url: dbPath });

    return new PrismaClient({ adapter });
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
