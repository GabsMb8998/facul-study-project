'use client';

import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Check, X } from 'lucide-react';
import Link from 'next/link';
import QuestionDropdownNav from '@/components/QuestionDropdownNav';
import SubjectHeader from '@/components/SubjectHeader';

// Dados de exemplo (depois podes carregar do teu banco via API/Prisma)
const MOCK_MODULE_DATA = {
  id: 1,
  subjectName: 'MATEMÁTICA',
  topicName: 'REGRA DE TRÊS',
  moduleTitle: 'CONCEITO DE PROPORCIONALIDADE',
  description: 'Aprenda os fundamentos de grandezas diretamente e inversamente proporcionais.',
  ementa: `• Definição de Proporção e Razão
• Propriedade fundamental das proporções
• Identificação de grandezas diretamente proporcionais
• Resolução prática de problemas iniciais`,
  questions: [
    {
      id: 101,
      enunciado:
        'Uma máquina produz 120 peças em 4 horas, mantendo sempre o mesmo ritmo de produção. Quantas peças essa máquina produzirá em 7 horas?',
      options: [
        { id: 'A', text: '180 peças', isCorrect: false },
        { id: 'B', text: '200 peças', isCorrect: false },
        { id: 'C', text: '210 peças', isCorrect: true },
        { id: 'D', text: '240 peças', isCorrect: false },
      ],
    },
    {
      id: 102,
      enunciado:
        'Se 3 pedreiros constroem um muro em 6 dias, quantos dias 9 pedreiros, com a mesma capacidade de trabalho, levarão para construir o mesmo muro?',
      options: [
        { id: 'A', text: '2 dias', isCorrect: true },
        { id: 'B', text: '3 dias', isCorrect: false },
        { id: 'C', text: '4 dias', isCorrect: false },
        { id: 'D', text: '18 dias', isCorrect: false },
      ],
    },
  ],
};

export default function QuizPage() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<
    Record<number, { selectedId: string; isCorrect: boolean }>
  >({});
  const [showEmentaModal, setShowEmentaModal] = useState(false);

  const currentQuestion = MOCK_MODULE_DATA.questions[currentQuestionIdx];
  const currentAnswer = answers[currentQuestionIdx];

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    // Permite responder apenas se ainda não respondeu a esta questão
    if (currentAnswer) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: { selectedId: optionId, isCorrect },
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = MOCK_MODULE_DATA.questions.length;

  return (
    <div className="min-h-screen bg-purple-500 text-white flex flex-col p-4 md:p-6 max-w-md mx-auto shadow-2xl relative">
      {/* Topo / Header da Tela */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/"
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        {/* Botão de Ver Ementa */}
        <button
          onClick={() => setShowEmentaModal(true)}
          className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-xl backdrop-blur-md transition-all font-medium"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Ementa</span>
        </button>
      </div>

      {/* Título da Matéria e Módulo */}
      <div className="mb-4">
        <h2 className="text-xs font-bold text-purple-200 uppercase tracking-wider">
          {MOCK_MODULE_DATA.topicName} - {MOCK_MODULE_DATA.moduleTitle}
        </h2>
        <p className="text-xs text-purple-200 mt-0.5">
          {answeredCount} / {totalQuestions} respondidas
        </p>
      </div>

      {/* Dropdown de Navegação entre Questões */}
      <div className="mb-4">
        <QuestionDropdownNav
          currentIndex={currentQuestionIdx}
          totalQuestions={totalQuestions}
          userAnswers={answers}
          onSelectQuestion={(idx) => setCurrentQuestionIdx(idx)}
        />
      </div>

      {/* Card da Questão Atual */}
      <div className="bg-white text-gray-800 rounded-3xl p-6 shadow-xl flex-1 flex flex-col justify-between mb-6 border border-white/20">
        <div>
          <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full inline-block mb-3">
            Pergunta {currentQuestionIdx + 1}/{totalQuestions}
          </span>

          <p className="font-medium text-base text-gray-800 leading-relaxed mb-6">
            {currentQuestion.enunciado}
          </p>

          {/* Opções de Resposta */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = currentAnswer?.selectedId === opt.id;
              let btnStyle = 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50';

              if (currentAnswer) {
                if (opt.isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-semibold';
                } else {
                  btnStyle = 'border-gray-100 opacity-50';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                  disabled={!!currentAnswer}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs shrink-0">
                      {opt.id}
                    </span>
                    <span className="text-sm">{opt.text}</span>
                  </div>

                  {currentAnswer && opt.isCorrect && (
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {currentAnswer && isSelected && !opt.isCorrect && (
                    <X className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Botões de Navegação Rodapé (Anterior / Próximo) */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestionIdx === 0}
          className="bg-white text-purple-600 disabled:opacity-40 font-bold py-3.5 rounded-2xl shadow-md transition-all active:scale-[0.98] text-sm"
        >
          anterior
        </button>

        <button
          onClick={() => setCurrentQuestionIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
          disabled={currentQuestionIdx === totalQuestions - 1}
          className="bg-purple-400 text-white disabled:opacity-40 font-bold py-3.5 rounded-2xl shadow-md transition-all active:scale-[0.98] text-sm hover:bg-purple-300"
        >
          próximo
        </button>
      </div>

      {/* Modal de Ementa e Descrição */}
      {showEmentaModal && (
        <SubjectHeader
          title={`${MOCK_MODULE_DATA.topicName}: ${MOCK_MODULE_DATA.moduleTitle}`}
          description={MOCK_MODULE_DATA.description}
          ementa={MOCK_MODULE_DATA.ementa}
        />
      )}
    </div>
  );
}