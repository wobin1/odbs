'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAppointments } from '@/hooks/useAppointments';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const { user, isLoading: authLoading } = useAuth();
    const { appointments, isLoading: apptsLoading } = useAppointments();
    const router = useRouter();

    if (authLoading || apptsLoading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;
    if (!user) {
        router.push('/auth/login');
        return null;
    }

    const myAppointments = appointments.filter(a => a.patientId === user.id);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'approved': return { background: '#dcfce7', color: '#166534' };
            case 'rejected': return { background: '#fee2e2', color: '#991b1b' };
            default: return { background: '#fef3c7', color: '#92400e' };
        }
    };

    return (
        <div style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Welcome, {user.name}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your dental appointments and history</p>
                </div>
                <Link href="/book" className="btn btn-primary">
                    <Plus size={20} />
                    New Booking
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Calendar className="text-primary" />
                            My Appointments
                        </h2>

                        {myAppointments.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                <p>You haven't booked any appointments yet.</p>
                                <Link href="/book" style={{ color: 'var(--primary)', fontWeight: 600, display: 'block', marginTop: '1rem' }}>Book your first appointment now</Link>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {myAppointments.map((app) => (
                                    <motion.div
                                        key={app.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        style={{
                                            padding: '1.5rem',
                                            borderRadius: '1rem',
                                            border: '1px solid #f1f5f9',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{app.service}</h4>
                                            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={14} /> {app.dentistName}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {app.date}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} /> {app.time}</span>
                                            </div>
                                        </div>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            ...getStatusStyle(app.status)
                                        }}>
                                            {app.status.toUpperCase()}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Account Summary</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Total Bookings</span>
                                <span style={{ fontWeight: 600 }}>{myAppointments.length}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Pending</span>
                                <span style={{ fontWeight: 600 }}>{myAppointments.filter(a => a.status === 'pending').length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '2rem', background: 'var(--primary)', color: 'white' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Need Help?</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '1.5rem' }}>Contact our support team if you have any questions about your records.</p>
                        <Link href="/contact" className="btn" style={{ background: 'white', color: 'var(--primary)' }}>Contact Support</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
