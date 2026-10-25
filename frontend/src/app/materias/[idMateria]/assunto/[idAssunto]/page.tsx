'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getAssunto } from '@/services/api';
import type { Assunto } from '@/services/api';

export default function AssuntoSubassuntosPage() {
  const { idMateria, idAssunto } = useParams<{
    idMateria: string;
    idAssunto: string;
  }>();
  const [assunto, setAssunto] = useState<Assunto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    getAssunto(idAssunto)
      .then((result) => {
        if (result.materia !== idMateria) {
          throw new Error('Este assunto não pertence à matéria informada.');
        }
        if (isCurrent) setAssunto(result);
      })
      .catch((cause: unknown) => {
        if (isCurrent) {
          setError(cause instanceof Error ? cause.message : 'Não foi possível carregar o assunto.');
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [idAssunto, idMateria]);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-28 font-sans text-gray-800">
      <div className="pt-8 px-6 pb-4">
        <span className="text-xs tracking-widest text-gray-400 font-medium uppercase">
          {assunto ? `${assunto.materia_nome} - ${assunto.nome}` : 'Assunto'}
        </span>

        <Link
          href={`/materias/${idMateria}`}
          className="inline-flex items-center gap-1 text-xs text-[#B175FF] font-medium mt-6 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar
        </Link>
      </div>

      {isLoading && <p className="px-6 text-sm text-gray-500">Carregando subassuntos...</p>}
      {error && (
        <p role="alert" className="px-6 text-sm text-red-600">
          {error}
        </p>
      )}
      {!isLoading && !error && assunto?.subassuntos.length === 0 && (
        <p className="px-6 text-sm text-gray-500">
          Nenhum subassunto publicado para este assunto.
        </p>
      )}

      {assunto && !error && (
        <div className="mt-4 px-6 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-8 w-px border-r border-dashed border-gray-300 z-0" />

          <div className="space-y-6 relative z-10">
            {assunto.subassuntos.map((subassunto, index) => (
              <article
                key={subassunto.id}
                className="flex items-start gap-4 rounded-2xl border border-purple-100 bg-white p-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#B175FF] flex items-center justify-center text-white font-bold shrink-0">
                  {subassunto.ordem ?? index + 1}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-800">
                    {subassunto.nome}
                  </h2>
                  {subassunto.conteudo && (
                    <p className="mt-1 text-sm text-gray-500 whitespace-pre-line">
                      {subassunto.conteudo}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
