import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
    title: "ODBS - Online Dentist's Booking System",
    description: "Modern dental clinic appointment management system",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body suppressHydrationWarning>
                <AuthProvider>
                    <Layout>
                        {children}
                    </Layout>
                </AuthProvider>
            </body>
        </html>
    );
}
