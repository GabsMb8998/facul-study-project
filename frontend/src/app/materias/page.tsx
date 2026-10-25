'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { getMaterias } from '@/services/api';
import type { Materia } from '@/services/api';

export default function MateriasPage() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMaterias()
      .then(setMaterias)
      .catch((cause: unknown) => {
        setError(cause instanceof Error ? cause.message : 'Não foi possível carregar as matérias.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-24 font-sans text-gray-800">
      <div className="pt-8 px-6 pb-6">
        <h1 className="text-xs tracking-widest text-gray-400 font-medium uppercase">
          Matérias
        </h1>
      </div>

      <div className="px-6 space-y-4">
        {isLoading && <p className="text-sm text-gray-500">Carregando matérias...</p>}
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        {!isLoading && !error && materias.length === 0 && (
          <p className="text-sm text-gray-500">Nenhuma matéria publicada ainda.</p>
        )}

        {materias.map((materia) => (
          <Link
            key={materia.id}
            href={`/materias/${materia.id}`}
            className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-purple-200 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-sm">{materia.nome}</h2>
              <p className="text-xs text-gray-400">{materia.descricao}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
