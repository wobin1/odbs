import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const appointments = await prisma.appointment.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(appointments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Conflict detection
        const conflict = await prisma.appointment.findFirst({
            where: {
                date: data.date,
                time: data.time,
                dentistId: data.dentistId,
                status: 'approved'
            }
        });

        if (conflict) {
            return NextResponse.json({ error: 'Slot already booked' }, { status: 409 });
        }

        const appointment = await prisma.appointment.create({
            data: {
                patientId: data.patientId,
                patientName: data.patientName,
                dentistId: data.dentistId,
                dentistName: data.dentistName,
                date: data.date,
                time: data.time,
                service: data.service,
                status: 'pending'
            }
        });
        return NextResponse.json(appointment);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
    }
}
