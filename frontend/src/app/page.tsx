// src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Flame, Target, Trophy, PlayCircle, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getMaterias } from '@/services/api';
import type { Materia } from '@/services/api';

export default function DashboardPage() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [materiasError, setMateriasError] = useState<string | null>(null);
  const [isLoadingMaterias, setIsLoadingMaterias] = useState(true);

  useEffect(() => {
    getMaterias()
      .then(setMaterias)
      .catch((cause: unknown) => {
        setMateriasError(
          cause instanceof Error ? cause.message : 'Não foi possível carregar as matérias.',
        );
      })
      .finally(() => setIsLoadingMaterias(false));
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-24">
      {/* Banner Superior */}
      <div className="bg-purple-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-semibold text-purple-200">BEM-VINDO DE VOLTA</span>
            <h1 className="text-2xl font-bold">Olá, Estudante! 👋</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold">
            E
          </div>
        </div>

        {/* Resumo de Eficiência */}
        <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 mt-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-amber-300 font-bold text-lg">
              <Flame className="w-5 h-5 fill-amber-300" /> 5
            </div>
            <p className="text-[10px] text-purple-200 uppercase font-medium">Dias de Sequência</p>
          </div>
          <div className="border-x border-white/10">
            <div className="flex items-center justify-center gap-1 text-emerald-300 font-bold text-lg">
              <Target className="w-5 h-5" /> 84%
            </div>
            <p className="text-[10px] text-purple-200 uppercase font-medium">Precisão Geral</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-sky-300 font-bold text-lg">
              <Trophy className="w-5 h-5" /> 140
            </div>
            <p className="text-[10px] text-purple-200 uppercase font-medium">Questões Feitas</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Card: Continuar de Onde Parou */}
        <div>
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
            Continuar Estudos
          </h2>
          <Link
            href="/quiz/1"
            className="flex items-center justify-between bg-white p-4 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <PlayCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-purple-600 font-semibold">Matemática</span>
                <h3 className="font-bold text-gray-800 text-sm">Regra de Três Simples</h3>
                <p className="text-xs text-gray-400">Módulo 1 • 7/10 resolvido</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Lista de Matérias */}
        <div>
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
            Suas Matérias
          </h2>
          <div className="space-y-3">
            {materiasError && (
              <p role="alert" className="text-sm text-red-600">
                {materiasError}
              </p>
            )}
            {materias.map((materia) => (
              <Link
                key={materia.id}
                href={`/materias/${materia.id}`}
                className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-purple-200 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{materia.nome}</h4>
                    <p className="text-xs text-gray-400">{materia.descricao}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
            {isLoadingMaterias && (
              <p className="text-sm text-gray-500">Carregando matérias...</p>
            )}
            {!isLoadingMaterias && !materiasError && materias.length === 0 && (
              <p className="text-sm text-gray-500">Nenhuma matéria publicada ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}