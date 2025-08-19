import { PrismaClient } from "@/generated/prisma"

export async function GET(){
    const prisma = new PrismaClient();
    const data = await prisma.project.findMany();
    return Response.json(data)
}