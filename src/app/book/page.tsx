'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useAppointments } from '@/hooks/useAppointments';
import { Calendar as CalendarIcon, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingPage() {
    const { user, isLoading: authLoading } = useAuth();
    const { addAppointment } = useAppointments();
    const router = useRouter();

    const [formData, setFormData] = useState({
        dentistId: '',
        dentistName: '',
        date: '',
        time: '',
        service: 'General Checkup'
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const dentists = [
        { id: 'd1', name: 'Dr. Smith', specialty: 'General Dentist' },
        { id: 'd2', name: 'Dr. Sarah Johnson', specialty: 'Orthodontist' },
        { id: 'd3', name: 'Dr. Michael Chen', specialty: 'Periodontist' }
    ];

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (authLoading) return;
        if (!user) {
            router.push('/auth/login');
            return;
        }

        try {
            const selectedDentist = dentists.find(d => d.id === formData.dentistId);
            await addAppointment({
                patientId: user.id,
                patientName: user.name,
                dentistId: formData.dentistId,
                dentistName: selectedDentist?.name || 'Unknown',
                date: formData.date,
                time: formData.time,
                service: formData.service,
            });
            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ maxWidth: '500px', margin: '4rem auto', textAlign: 'center' }}
                className="glass-card"
            >
                <div style={{ padding: '3rem' }}>
                    <CheckCircle size={64} className="text-primary" style={{ marginBottom: '1.5rem', color: '#10b981' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Booking Received!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        Your appointment request for <strong>{formData.date}</strong> at <strong>{formData.time}</strong> has been sent to <strong>{formData.dentistName}</strong>.
                        You will receive a confirmation email shortly.
                    </p>
                    <button onClick={() => router.push('/')} className="btn btn-primary">Back to Home</button>
                </div>
            </motion.div>
        );
    }

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Book Appointment</h1>

            <div className="glass-card" style={{ padding: '2.5rem' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Select Dentist</label>
                        <select
                            required
                            value={formData.dentistId}
                            onChange={(e) => {
                                const d = dentists.find(dentist => dentist.id === e.target.value);
                                setFormData({ ...formData, dentistId: e.target.value, dentistName: d?.name || '' });
                            }}
                            style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '1rem' }}
                        >
                            <option value="">-- Choose a Dentist --</option>
                            {dentists.map(d => (
                                <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 600 }}>Preferred Date</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="date"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    style={{ padding: '0.8rem', paddingLeft: '2.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', width: '100%' }}
                                />
                                <CalendarIcon size={18} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 600 }}>Preferred Time</label>
                            <div style={{ position: 'relative' }}>
                                <select
                                    required
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    style={{ padding: '0.8rem', paddingLeft: '2.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', width: '100%', appearance: 'none' }}
                                >
                                    <option value="">-- Time --</option>
                                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                <Clock size={18} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Service</label>
                        <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                        >
                            <option>General Checkup</option>
                            <option>Teeth Cleaning</option>
                            <option>Cavity Filling</option>
                            <option>Dental Braces Consultation</option>
                            <option>Root Canal</option>
                        </select>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}>
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
}
