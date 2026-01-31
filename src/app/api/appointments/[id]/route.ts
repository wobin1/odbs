import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status } = await request.json();
        const appointment = await prisma.appointment.update({
            where: { id },
            data: { status }
        });
        return NextResponse.json(appointment);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
    }
}
