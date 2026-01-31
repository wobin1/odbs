'use client';

import { useState, useEffect } from 'react';
import type { Appointment, AppointmentStatus } from '@/types';

export const useAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAppointments = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/appointments');
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to fetch');
            setAppointments(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const addAppointment = async (data: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => {
        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Booking failed');
            setAppointments(prev => [result, ...prev]);
            return result;
        } catch (err: any) {
            throw err;
        }
    };

    const updateStatus = async (id: string, status: AppointmentStatus) => {
        try {
            const res = await fetch(`/api/appointments/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Update failed');
            setAppointments(prev => prev.map(a => a.id === id ? result : a));
            return result;
        } catch (err: any) {
            throw err;
        }
    };

    return { appointments, isLoading, error, addAppointment, updateStatus, refresh: fetchAppointments };
};
