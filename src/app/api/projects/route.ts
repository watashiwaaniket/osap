import { PrismaClient } from "@/generated/prisma"
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";

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

export async function DELETE(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const body = await req.json();
        const project = await prisma.project.findUnique({ where: { id: body.id } });
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        if (project.user !== session.user.email) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
        const res = await prisma.project.delete({ where: { id: body.id } });
        return NextResponse.json({ message: 'Project deleted!', data: res });
    } catch (e) {
        console.error('Error deleting project:', e);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}