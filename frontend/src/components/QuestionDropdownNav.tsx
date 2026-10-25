// src/components/QuestionDropdownNav.tsx
'use client';

import React from 'react';
import { ChevronDown, CheckCircle, XCircle, Circle } from 'lucide-react';

interface QuestionNavProps {
  currentIndex: number;
  totalQuestions: number;
  userAnswers: Record<number, { selectedId: string; isCorrect: boolean }>;
  onSelectQuestion: (index: number) => void;
}

export default function QuestionDropdownNav({
  currentIndex,
  totalQuestions,
  userAnswers,
  onSelectQuestion,
}: QuestionNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2 rounded-xl backdrop-blur-md transition-all text-sm"
      >
        <span>
          Pergunta {currentIndex + 1} de {totalQuestions}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 z-50 overflow-hidden p-2">
          <div className="text-xs font-semibold text-gray-400 px-3 py-1 uppercase tracking-wider">
            Navegar pelas questões
          </div>
          <div className="max-h-60 overflow-y-auto space-y-1">
            {Array.from({ length: totalQuestions }).map((_, idx) => {
              const answer = userAnswers[idx];
              const isCurrent = idx === currentIndex;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectQuestion(idx);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'hover:bg-purple-50 text-gray-700'
                  }`}
                >
                  <span>Questão {idx + 1}</span>
                  {answer ? (
                    answer.isCorrect ? (
                      <CheckCircle className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-emerald-500'}`} />
                    ) : (
                      <XCircle className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-rose-500'}`} />
                    )
                  ) : (
                    <Circle className={`w-4 h-4 ${isCurrent ? 'text-purple-200' : 'text-gray-300'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}