// src/components/SubjectHeader.tsx
'use client';

import React, { useState } from 'react';
import { BookOpen, Info, X } from 'lucide-react';

interface SubjectHeaderProps {
  title: string;
  description: string;
  ementa: string;
}

export default function SubjectHeader({ title, description, ementa }: SubjectHeaderProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-purple-100 mb-6 flex items-start justify-between">
      <div>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-1.5 text-xs font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-2 rounded-xl transition-colors"
      >
        <BookOpen className="w-4 h-4" />
        <span>Ver Ementa</span>
      </button>

      {/* Modal de Ementa Detalhada */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-purple-600 mb-3">
              <Info className="w-5 h-5" />
              <h3 className="font-bold text-lg text-gray-900">Ementa Completa</h3>
            </div>

            <div className="prose prose-purple text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {ementa || 'Nenhuma ementa detalhada cadastrada para este assunto.'}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-xl transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}