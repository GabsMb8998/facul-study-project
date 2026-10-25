// src/components/ModuleTrail.tsx
'use client';

import React from 'react';
import { Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: number;
  title: string;
  isCompleted: boolean;
  isLocked: boolean;
  order: number;
}

interface ModuleTrailProps {
  subjectName: string;
  topicName: string;
  modules: Module[];
}

export default function ModuleTrail({ subjectName, topicName, modules }: ModuleTrailProps) {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-24 shadow-xl">
      {/* Topbar do Mockup */}
      <div className="p-4 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 mb-2">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <h2 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
          {subjectName} - {topicName}
        </h2>
      </div>

      {/* Trilha Vertical */}
      <div className="py-8 px-6 relative flex flex-col items-center">
        {/* Linha vertical pontilhada */}
        <div className="absolute top-12 bottom-12 w-0.5 border-r-2 border-dashed border-gray-200 z-0" />

        <div className="space-y-12 w-full z-10">
          {modules.map((module) => (
            <div key={module.id} className="flex items-center gap-4">
              {/* Círculo do Nível / Nó */}
              {module.isLocked ? (
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center shadow-sm shrink-0">
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
              ) : (
                <Link
                  href={`/quiz/${module.id}`}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl shadow-md transition-all active:scale-95 shrink-0 ${
                    module.isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-purple-500 text-white hover:bg-purple-600 ring-4 ring-purple-100'
                  }`}
                >
                  {module.isCompleted ? <CheckCircle2 className="w-8 h-8" /> : module.order}
                </Link>
              )}

              {/* Informações do Módulo */}
              <div className="flex-1">
                <h3
                  className={`font-semibold text-base ${
                    module.isLocked ? 'text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {module.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium">
                  {module.isLocked ? 'BLOQUEADO' : module.isCompleted ? 'Concluído' : 'Disponível'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}