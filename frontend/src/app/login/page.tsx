// src/app/login/page.tsx
'use client';

import React from 'react';
import { LogIn, GraduationCap, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    // Aqui entras com a tua integração (ex: signIn('google') do NextAuth ou supabase.auth.signInWithOAuth)
    console.log('Iniciar login com o Google...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-md w-full border border-white/20 text-center">
        {/* Ícone de Destaque */}
        <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
          <GraduationCap className="w-10 h-10" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Plataforma de Estudos</h1>
        <p className="text-sm text-gray-500 mb-8">
          Acompanha a tua evolução, resolve questões e domina os teus conteúdos diários.
        </p>

        {/* Botão do Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-purple-300 text-gray-700 font-semibold py-3.5 px-4 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Entrar com o Google</span>
        </button>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Acesso rápido e seguro</span>
        </div>
      </div>
    </div>
  );
}