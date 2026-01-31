import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import Navbar from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)' }}>
            <Navbar />
            <main style={{ flex: 1, padding: '4rem 1.5rem' }} className="container">
                {children}
            </main>
            <footer style={{
                padding: '5rem 0 3rem',
                backgroundColor: '#0f172a',
                marginTop: '6rem',
                color: '#94a3b8',
                borderTop: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', color: 'white', fontWeight: 800, fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                        <Calendar size={24} />
                        <span>ODBS</span>
                    </div>
                    <p style={{ maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>Providing world-class dental care with modern technology and a patient-first approach.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', fontWeight: 500 }}>
                        <Link href="/" style={{ color: '#f8fafc' }}>Home</Link>
                        <Link href="/about" style={{ color: '#f8fafc' }}>About</Link>
                        <Link href="/contact" style={{ color: '#f8fafc' }}>Contact</Link>
                    </div>
                    <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <p>© 2026 Online Dentist's Booking System. Professional Dental Care.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
