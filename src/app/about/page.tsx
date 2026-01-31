import React from 'react';
import { Shield, Users, Award } from 'lucide-react';

export default function AboutPage() {
    return (
        <div style={{ padding: '2rem 0' }}>
            <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>About ODBS</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                    The Online Dentist's Booking System (ODBS) was developed to revolutionize how dental clinics manage patient appointments, ensuring efficiency, reliability, and accessibility.
                </p>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <Shield size={40} className="text-primary" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ marginBottom: '1rem' }}>Our Mission</h3>
                    <p style={{ color: 'var(--text-muted)' }}>To provide a seamless digital platform that connects patients with world-class dental care efficiently.</p>
                </div>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <Users size={40} className="text-primary" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ marginBottom: '1rem' }}>Expert Team</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Our dentists are highly qualified specialists with years of experience in various dental fields.</p>
                </div>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <Award size={40} className="text-primary" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ marginBottom: '1rem' }}>Quality Care</h3>
                    <p style={{ color: 'var(--text-muted)' }}>We use state-of-the-art technology to ensure the best results and comfort for our patients.</p>
                </div>
            </div>

            <section style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800" alt="Clinic Interior" style={{ width: '100%', borderRadius: '2rem', boxShadow: 'var(--shadow-lg)' }} />
                </div>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Our Story</h2>
                    <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                        Founded in 2026, ODBS was born out of a need to eliminate the frustrations of manual booking systems. We identified challenges like double bookings and poor record retrieval and built a system that works for both staff and patients.
                    </p>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Today, we serve hundreds of patients every month, providing them with 24/7 access to dental scheduling and automated reminders.
                    </p>
                </div>
            </section>
        </div>
    );
}
