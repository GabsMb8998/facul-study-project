'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getMateria } from '@/services/api';
import type { Materia } from '@/services/api';

export default function MateriaAssuntosPage() {
  const { idMateria } = useParams<{ idMateria: string }>();
  const [materia, setMateria] = useState<Materia | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    getMateria(idMateria)
      .then((result) => {
        if (isCurrent) setMateria(result);
      })
      .catch((cause: unknown) => {
        if (isCurrent) {
          setError(cause instanceof Error ? cause.message : 'Não foi possível carregar a matéria.');
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [idMateria]);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-24 font-sans text-gray-800">
      {/* Topbar Minimalista */}
      <div className="pt-8 px-6 pb-6 text-left">
        <span className="text-xs tracking-widest text-gray-400 font-medium uppercase">
          {materia?.nome ?? 'Matéria'}
        </span>
      </div>

      {isLoading && <p className="px-8 text-sm text-gray-500">Carregando assuntos...</p>}
      {error && (
        <p role="alert" className="px-8 text-sm text-red-600">
          {error}
        </p>
      )}
      {!isLoading && !error && materia?.assuntos.length === 0 && (
        <p className="px-8 text-sm text-gray-500">Nenhum assunto publicado nesta matéria.</p>
      )}

      {/* Lista com Linha Pontilhada de Fundo */}
      {materia && !error && (
        <div className="relative px-8 py-2">
          <div className="absolute left-[64px] top-8 bottom-8 w-px border-r border-dashed border-gray-300 z-0" />

          <div className="space-y-12 relative z-10">
            {materia.assuntos.map((assunto, index) => (
              <Link
                key={assunto.id}
                href={`/materias/${materia.id}/assunto/${assunto.id}`}
                className="flex items-center gap-6 group"
              >
                <div className="w-[72px] h-[72px] bg-[#B175FF] rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold shadow-sm shrink-0">
                  {assunto.ordem ?? index + 1}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-800 leading-snug">
                    {assunto.nome}
                  </h2>
                  <span className="text-xs text-gray-400 font-normal mt-0.5">
                    {assunto.subassuntos.length} subassunto(s)
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}