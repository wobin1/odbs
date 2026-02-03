'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            console.error('Submission error:', err);
            setStatus('error');
            setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        }
    };

    return (
        <div style={{ padding: '4rem 0' }}>
            <section style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}
                >
                    Let's Connect
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ fontSize: '1.4rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontWeight: 300 }}
                >
                    Have questions about our services or need to speak with our experts? <br />We're here to provide the care you deserve.
                </motion.p>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '5rem', alignItems: 'start' }}>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
                >
                    <div>
                        <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '2.5rem' }}>Contact Information</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            {[
                                { icon: <Mail />, title: 'Email Us', desc: 'support@odbs.com', color: '#eff6ff', textColor: '#3b82f6' },
                                { icon: <Phone />, title: 'Call Us', desc: '+1 (555) 123-4567', color: '#f0fdf4', textColor: '#22c55e' },
                                { icon: <MapPin />, title: 'Visit Us', desc: '123 Dental Plaza, Health City, Yakowa Road', color: '#fff7ed', textColor: '#f59e0b' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ padding: '1rem', background: item.color, borderRadius: '1rem', color: item.textColor }}>{item.icon}</div>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.2rem' }}>{item.title}</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ padding: '2.5rem', background: 'var(--primary)', borderRadius: '2rem', color: 'white' }}>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Emergency Care</h4>
                        <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>Available 24/7 for urgent dental needs. Call our emergency hotline for immediate assistance.</p>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)' }}>+23481098755</div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card"
                    style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}
                >
                    <div style={{ padding: '3.5rem' }}>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem' }}>Send a Message</h3>

                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center', padding: '3rem 0' }}
                                >
                                    <div style={{ color: '#10b981', display: 'inline-block', marginBottom: '1.5rem' }}>
                                        <CheckCircle2 size={64} />
                                    </div>
                                    <h4 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Message Sent Successfully!</h4>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Thank you for reaching out. Our team will get back to you shortly.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="btn btn-primary"
                                        style={{ padding: '0.75rem 2rem' }}
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                                >
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                            <label style={{ fontSize: '0.95rem', fontWeight: 600 }}>Your Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                            <label style={{ fontSize: '0.95rem', fontWeight: 600 }}>Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none' }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                        <label style={{ fontSize: '0.95rem', fontWeight: 600 }}>Subject</label>
                                        <input
                                            type="text"
                                            placeholder="General Inquiry"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                        <label style={{ fontSize: '0.95rem', fontWeight: 600 }}>Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            placeholder="Tell us how we can help..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none', resize: 'none' }}
                                        ></textarea>
                                    </div>

                                    {status === 'error' && (
                                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '1rem', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '0.75rem', color: '#991b1b' }}>
                                            <AlertCircle size={20} />
                                            <span style={{ fontSize: '0.95rem' }}>{errorMessage}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="btn btn-primary"
                                        style={{
                                            padding: '1.25rem',
                                            fontSize: '1.1rem',
                                            borderRadius: '1rem',
                                            boxShadow: '0 8px 20px -5px rgba(15, 23, 42, 0.3)',
                                            background: 'var(--primary)',
                                            color: 'white',
                                            opacity: status === 'submitting' ? 0.7 : 1,
                                            cursor: status === 'submitting' ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {status === 'submitting' ? 'Sending...' : (
                                            <>
                                                <Send size={20} />
                                                Submit Message
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
