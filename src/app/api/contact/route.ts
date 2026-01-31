import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
        console.error('Error submitting contact message:', error);
        return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 });
    }
}
