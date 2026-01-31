'use client';

import React, { useState } from 'react';
import { useAppointments } from '@/hooks/useAppointments';
import { useUsers } from '@/hooks/useUsers';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Check, X, Clock, Calendar, User as UserIcon, Trash2, Shield, ShieldAlert, Users, MessageSquare, Mail, Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMessages } from '@/hooks/useMessages';

export default function AdminDashboardPage() {
    const { user, isLoading: authLoading } = useAuth();
    const { appointments, isLoading: apptsLoading, updateStatus } = useAppointments();
    const { users, isLoading: usersLoading, updateUserRole, deleteUser } = useUsers();
    const { messages, isLoading: messagesLoading, deleteMessage } = useMessages();
    const [activeTab, setActiveTab] = useState<'appointments' | 'users' | 'messages'>('appointments');
    const router = useRouter();

    if (authLoading || apptsLoading || usersLoading || messagesLoading) {
        return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;
    }

    if (!user || user.role !== 'admin') {
        router.push('/auth/login');
        return null;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return '#10b981';
            case 'rejected': return '#ef4444';
            case 'pending': return '#f59e0b';
            default: return '#64748b';
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (id === user.id) {
            alert("You cannot delete yourself!");
            return;
        }
        if (confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
        }
    };

    const handleToggleRole = async (targetUser: any) => {
        if (targetUser.id === user.id) {
            alert("You cannot change your own role!");
            return;
        }
        const newRole = targetUser.role === 'admin' ? 'patient' : 'admin';
        await updateUserRole(targetUser.id, newRole);
    };

    return (
        <div style={{ minHeight: '80vh' }}>
            {/* Header Section */}
            <div style={{
                background: 'linear-gradient(to right, #0f172a, #1e293b)',
                padding: '3rem',
                borderRadius: '2rem',
                color: 'white',
                marginBottom: '3rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Admin Control Center</h1>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                        {activeTab === 'appointments' ? 'Manage clinic appointments and schedules' :
                            activeTab === 'users' ? 'Manage users and roles' :
                                'Read and manage patient messages'}
                    </p>
                </div>
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '1.25rem', gap: '0.5rem' }}>
                    <button
                        onClick={() => setActiveTab('appointments')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '1rem',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            background: activeTab === 'appointments' ? 'white' : 'transparent',
                            color: activeTab === 'appointments' ? '#0f172a' : 'white',
                            fontWeight: 600
                        }}
                    >
                        <Calendar size={18} />
                        Appointments
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '1rem',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            background: activeTab === 'users' ? 'white' : 'transparent',
                            color: activeTab === 'users' ? '#0f172a' : 'white',
                            fontWeight: 600
                        }}
                    >
                        <Users size={18} />
                        Users
                    </button>
                    <button
                        onClick={() => setActiveTab('messages')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '1rem',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            background: activeTab === 'messages' ? 'white' : 'transparent',
                            color: activeTab === 'messages' ? '#0f172a' : 'white',
                            fontWeight: 600
                        }}
                    >
                        <MessageSquare size={18} />
                        Messages
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'appointments' ? (
                    <motion.div
                        key="appointments"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="glass-card"
                        style={{ padding: '0', overflow: 'hidden', background: 'white', border: '1px solid rgba(0,0,0,0.05)' }}
                    >
                        <div style={{ padding: '2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ color: 'var(--primary-light)', background: '#eff6ff', padding: '0.5rem', borderRadius: '0.75rem' }}><Clock size={20} /></div>
                                Appointment Requests
                            </h2>
                            <span style={{ background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                Total: {appointments.length}
                            </span>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Patient</th>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dentist</th>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Schedule</th>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} style={{ padding: '5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                                <Calendar size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                                <p>No appointments found in the system.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        appointments.map((app) => (
                                            <motion.tr
                                                layout
                                                key={app.id}
                                                style={{ borderBottom: '1px solid #f1f5f9' }}
                                                whileHover={{ background: '#fcfdfe' }}
                                            >
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)' }}>
                                                            <UserIcon size={20} />
                                                        </div>
                                                        <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{app.patientName}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem', fontWeight: 500 }}>{app.dentistName}</td>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                                                            <Calendar size={14} style={{ color: 'var(--primary-light)' }} />
                                                            {app.date}
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                            <Clock size={14} />
                                                            {app.time}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <span style={{
                                                        padding: '0.4rem 1rem',
                                                        borderRadius: '0.75rem',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 700,
                                                        background: `${getStatusColor(app.status)}15`,
                                                        color: getStatusColor(app.status),
                                                        border: `1px solid ${getStatusColor(app.status)}30`,
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '0.4rem'
                                                    }}>
                                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: getStatusColor(app.status) }}></div>
                                                        {app.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                                                    {app.status === 'pending' ? (
                                                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                                                            <button
                                                                onClick={() => updateStatus(app.id, 'approved')}
                                                                className="btn"
                                                                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', background: '#10b981', color: 'white', borderRadius: '0.75rem' }}
                                                            >
                                                                <Check size={14} /> Approve
                                                            </button>
                                                            <button
                                                                onClick={() => updateStatus(app.id, 'rejected')}
                                                                className="btn"
                                                                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', background: 'transparent', color: '#ef4444', border: '1px solid #fee2e2', borderRadius: '0.75rem' }}
                                                            >
                                                                <X size={14} /> Reject
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Processed</span>
                                                    )}
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                ) : activeTab === 'users' ? (
                    <motion.div
                        key="users"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="glass-card"
                        style={{ padding: '0', overflow: 'hidden', background: 'white', border: '1px solid rgba(0,0,0,0.05)' }}
                    >
                        <div style={{ padding: '2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ color: 'var(--accent)', background: '#fffbeb', padding: '0.5rem', borderRadius: '0.75rem' }}><Users size={20} /></div>
                                System User Directory
                            </h2>
                            <span style={{ background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                Members: {users.length}
                            </span>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User Information</th>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</th>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Access Level</th>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} style={{ padding: '5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                                <Users size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                                <p>No users found in the directory.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((u) => (
                                            <motion.tr
                                                layout
                                                key={u.id}
                                                style={{ borderBottom: '1px solid #f1f5f9' }}
                                                whileHover={{ background: '#fcfdfe' }}
                                            >
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: u.role === 'admin' ? '#fee2e2' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: u.role === 'admin' ? '#ef4444' : 'var(--text-muted)' }}>
                                                            {u.role === 'admin' ? <Shield size={20} /> : <UserIcon size={20} />}
                                                        </div>
                                                        <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{u.name}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem', color: 'var(--text-muted)' }}>{u.email}</td>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <span style={{
                                                        padding: '0.4rem 1rem',
                                                        borderRadius: '0.75rem',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 700,
                                                        background: u.role === 'admin' ? '#0f172a' : '#f1f5f9',
                                                        color: u.role === 'admin' ? 'white' : 'var(--text)',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '0.4rem'
                                                    }}>
                                                        {u.role.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                                                        <button
                                                            onClick={() => handleToggleRole(u)}
                                                            disabled={u.id === user.id}
                                                            style={{
                                                                padding: '0.5rem 1rem',
                                                                fontSize: '0.85rem',
                                                                background: 'transparent',
                                                                border: '1px solid #e2e8f0',
                                                                borderRadius: '0.75rem',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.5rem',
                                                                cursor: u.id === user.id ? 'not-allowed' : 'pointer',
                                                                opacity: u.id === user.id ? 0.5 : 1
                                                            }}
                                                            title={u.role === 'admin' ? "Demote to Patient" : "Promote to Admin"}
                                                        >
                                                            {u.role === 'admin' ? <ShieldAlert size={14} /> : <Shield size={14} />}
                                                            {u.role === 'admin' ? 'Demote' : 'Promote'}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(u.id)}
                                                            disabled={u.id === user.id}
                                                            style={{
                                                                padding: '0.5rem 1rem',
                                                                fontSize: '0.85rem',
                                                                background: '#fef2f2',
                                                                border: '1px solid #fee2e2',
                                                                color: '#ef4444',
                                                                borderRadius: '0.75rem',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.5rem',
                                                                cursor: u.id === user.id ? 'not-allowed' : 'pointer',
                                                                opacity: u.id === user.id ? 0.5 : 1
                                                            }}
                                                        >
                                                            <Trash2 size={14} /> Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="messages"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="glass-card"
                        style={{ padding: '0', overflow: 'hidden', background: 'white', border: '1px solid rgba(0,0,0,0.05)' }}
                    >
                        <div style={{ padding: '2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ color: '#3b82f6', background: '#eff6ff', padding: '0.5rem', borderRadius: '0.75rem' }}><MessageSquare size={20} /></div>
                                Patient Inquiries
                            </h2>
                            <span style={{ background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                Messages: {messages.length}
                            </span>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sender</th>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subject</th>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</th>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                                        <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} style={{ padding: '5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                                <Mail size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                                <p>No messages received yet.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        messages.map((msg) => (
                                            <motion.tr
                                                layout
                                                key={msg.id}
                                                style={{ borderBottom: '1px solid #f1f5f9' }}
                                                whileHover={{ background: '#fcfdfe' }}
                                            >
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{msg.name}</span>
                                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{msg.email}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem', fontWeight: 500 }}>{msg.subject || 'No Subject'}</td>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <p style={{
                                                        maxWidth: '300px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        color: 'var(--text-muted)',
                                                        fontSize: '0.9rem'
                                                    }} title={msg.message}>
                                                        {msg.message}
                                                    </p>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                    {new Date(msg.createdAt).toLocaleDateString()}
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm("Delete this message?")) deleteMessage(msg.id);
                                                        }}
                                                        style={{
                                                            padding: '0.5rem',
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: '#ef4444',
                                                            cursor: 'pointer',
                                                            borderRadius: '0.5rem',
                                                            transition: 'background 0.2s'
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

