import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'CairBoss - Invoice Generator for Bug Hunters',
    description: 'Create professional invoices for security research, bug bounty payments, and penetration testing services.',
    keywords: ['invoice', 'bug bounty', 'security researcher', 'pentester', 'invoice generator'],
    icons: {
        icon: '/favicon.svg',
        apple: '/apple-touch-icon.svg',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
