'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Home, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  // Esconde a barra inferior se o usuário estiver resolvendo quiz ou na tela de login
  if (pathname.startsWith('/quiz') || pathname === '/login') {
    return null;
  }

  const navItems = [
    { href: '/materias', icon: LayoutGrid, label: 'Matérias' },
    { href: '/', icon: Home, label: 'Início' },
    { href: '/perfil', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-gray-100 px-8 py-3 flex justify-between items-center z-40 shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === '/materias'
            ? pathname.startsWith('/materias')
            : pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={`p-2.5 rounded-2xl transition-all duration-200 ${
              isActive
                ? 'text-purple-600 bg-purple-50 scale-110 shadow-sm'
                : 'text-gray-400 hover:text-purple-400 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-6 h-6 stroke-[1.8]" />
          </Link>
        );
      })}
    </nav>
  );
}