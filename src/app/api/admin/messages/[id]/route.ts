import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        await prisma.contactMessage.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact message:', error);
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
}
