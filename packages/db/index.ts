import { PrismaClient } from "./generated/prisma";

//convert this to a singleton 
export const prismaClient = new PrismaClient();
