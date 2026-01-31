import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Clock, Users, Calendar, ArrowRight } from 'lucide-react';

export default function Home() {
    const services = [
        { title: 'Teeth Cleaning', icon: <ShieldCheck className="text-primary" size={32} /> },
        { title: 'Cavity Filling', icon: <Clock className="text-primary" size={32} /> },
        { title: 'Dental Braces', icon: <Users className="text-primary" size={32} /> },
    ];

    return (
        <div className="home" style={{ paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <section style={{
                padding: '6rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: 'white',
                borderRadius: '2.5rem',
                marginBottom: '5rem',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
                <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '30%', height: '30%', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)', filter: 'blur(50px)' }}></div>

                <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1.5rem', maxWidth: '900px', lineHeight: 1.1 }}>
                    Expert Dental Care <br /><span style={{ color: 'var(--accent)' }}>Simplified</span> for You
                </h1>
                <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem', maxWidth: '650px', fontWeight: 300 }}>
                    Schedule your next visit in seconds with our state-of-the-art booking platform.
                </p>
                <div>
                    <Link href="/auth/register" className="btn" style={{ background: 'var(--accent)', color: 'white', padding: '1.25rem 2.5rem', fontSize: '1.2rem', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(245, 158, 11, 0.3)' }}>
                        Book Appointment
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Services Section */}
            <section style={{ marginBottom: '8rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Our Premium Services</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Tailored treatments for your perfect smile</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="glass-card"
                            style={{
                                padding: '3rem 2rem',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1.5rem',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                background: 'white',
                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
                            }}
                        >
                            <div style={{ padding: '1.25rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '1.25rem', color: 'var(--primary-light)' }}>
                                {service.icon}
                            </div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 600 }}>{service.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Our expert dentists use the latest technology to provide the highest standard of dental care.</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={{
                display: 'flex',
                gap: '5rem',
                alignItems: 'center',
                flexWrap: 'wrap-reverse',
                background: 'var(--surface-muted)',
                padding: '5rem',
                borderRadius: '3rem',
                boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.05)'
            }}>
                <div style={{ flex: 1, minWidth: '350px' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.2 }}>Experience the Future <br />of Dental Booking</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {[
                            { icon: <ShieldCheck size={28} />, title: 'Smart Scheduling', desc: 'Real-time availability with no double bookings, guaranteed.' },
                            { icon: <Calendar size={28} />, title: 'Anywhere Access', desc: 'Securely manage your appointments from any device, 24/7.' },
                            { icon: <Clock size={28} />, title: 'Instant Confirmation', desc: 'Get immediate confirmation and automated reminders for your visit.' }
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--accent)', background: 'white', padding: '1rem', borderRadius: '1rem', boxShadow: 'var(--shadow)' }}>{item.icon}</div>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ flex: 1, minWidth: '350px', height: '500px', borderRadius: '2.5rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                    <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" alt="Modern clinic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            </section>
        </div>
    );
}
