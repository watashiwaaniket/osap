import { PrismaClient } from "@/generated/prisma"
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
    const data = await prisma.project.findMany();
    return Response.json(data)
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const res = await prisma.project.create({
            data: {
                name: body.name,
                technologies: body.technologies,
                topics: body.topics,
                desc: body.desc,
                github: body.github,
                livelink: body.livelink,
                photos: body.photos,
                user: body.user
            }
        });

        return NextResponse.json({ message: 'Project Added!', data: res });
    } catch (e) {
        console.error('Error creating project:', e);
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        );
    }
}