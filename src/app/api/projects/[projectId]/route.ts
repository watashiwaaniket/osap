import { PrismaClient } from "@/generated/prisma"
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";

const prisma = new PrismaClient();

export async function GET(
    req: NextRequest,
    res: NextResponse,
    { params }: { params: { projectId: string } }
) {
    try {
        const projectId = parseInt(params.projectId);
        
        if (isNaN(projectId)) {
            return NextResponse.json(
                { error: 'Invalid project ID' },
                { status: 400 }
            );
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        });

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        return NextResponse.json(
            { error: 'Failed to fetch project' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    res: NextResponse,
    { params }: { params: { projectId: string } }
) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const projectId = parseInt(params.projectId);
        if (isNaN(projectId)) {
            return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
        }

        const project = await prisma.project.findUnique({ where: { id: projectId } });
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        if (project.user !== session.user.email) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const res = await prisma.project.delete({ where: { id: projectId } });
        return NextResponse.json({ message: 'Project deleted!', data: res });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
