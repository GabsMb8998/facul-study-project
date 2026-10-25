// src/app/layout.tsx
import './globals.css';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  title: 'App de Estudos',
  description: 'Plataforma de estudos com trilhas interativas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900 font-sans antialiased">
        <main className="min-h-screen pb-16">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}