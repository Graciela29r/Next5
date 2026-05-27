import type { Metadata } from 'next';
import { ToastProvider } from '@/components/ToastProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Galería de Imágenes',
  description: 'Una galería CRUD de imágenes con Next.js y Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
