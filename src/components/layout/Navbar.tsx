'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Calendar, User as UserIcon, LogOut, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <nav className="glass-card" style={{
            position: 'sticky',
            top: '1rem',
            margin: '0 1rem',
            zIndex: 1000,
            padding: '1rem 2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1.5rem',
            background: 'var(--surface)',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: 'var(--shadow)'
        }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary)', letterSpacing: '-0.02em' }}>
                <div style={{ background: 'var(--primary)', color: 'white', padding: '0.4rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={20} />
                </div>
                <span>ODBS</span>
            </Link>

            <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                <Link href="/" style={{ fontWeight: 600, color: 'var(--text)', transition: 'color 0.2s ease' }} className="nav-link">Home</Link>
                <Link href="/about" style={{ fontWeight: 500, color: 'var(--text-muted)' }} className="nav-link">About Us</Link>
                <Link href="/contact" style={{ fontWeight: 500, color: 'var(--text-muted)' }} className="nav-link">Contact</Link>

                <div style={{ height: '24px', width: '1px', background: '#e2e8f0', margin: '0 0.5rem' }}></div>

                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <UserIcon size={16} />
                            </div>
                            <span>{user.name}</span>
                        </Link>
                        <button onClick={handleLogout} className="btn" style={{ padding: '0.6rem 1.25rem', background: '#fef2f2', color: '#991b1b', border: '1px solid #fee2e2' }}>
                            <LogOut size={16} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link href="/auth/login" style={{ fontWeight: 600, padding: '0.6rem 1.25rem', color: 'var(--primary)' }}>Sign In</Link>
                        <Link href="/auth/register" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '0.75rem', background: 'var(--primary)', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.2)' }}>Join Now</Link>
                    </div>
                )}
            </div>

            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', background: 'none' }}>
                {isMenuOpen ? <X /> : <Menu />}
            </button>
        </nav>
    );
};

export default Navbar;
