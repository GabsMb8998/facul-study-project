// src/lib/mockData.ts

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Questao {
  idQuestao: number;
  idModulo: number;
  enunciado: string;
  respostas: Option[];
  nivel: number;
}

// MOCK COMPLETO DE QUESTÕES (Mapeado por idModulo)
export const MOCK_QUESTOES: Record<number, Questao[]> = {
  // Módulo 1: Conceito de proporcionalidade
  1: [
    {
      idQuestao: 101,
      idModulo: 1,
      enunciado: 'Uma máquina produz 120 peças em 4 horas, mantendo sempre o mesmo ritmo de produção. Quantas peças essa máquina produzirá em 7 horas?',
      respostas: [
        { id: 'A', text: '180 peças', isCorrect: false },
        { id: 'B', text: '200 peças', isCorrect: false },
        { id: 'C', text: '210 peças', isCorrect: true },
        { id: 'D', text: '240 peças', isCorrect: false },
      ],
      nivel: 1,
    },
    {
      idQuestao: 102,
      idModulo: 1,
      enunciado: 'Se 3 pedreiros constroem um muro em 6 dias, quantos dias 9 pedreiros levariam para construir o mesmo muro nas mesmas condições?',
      respostas: [
        { id: 'A', text: '2 dias', isCorrect: true },
        { id: 'B', text: '3 dias', isCorrect: false },
        { id: 'C', text: '4 dias', isCorrect: false },
        { id: 'D', text: '18 dias', isCorrect: false },
      ],
      nivel: 1,
    },
    {
      idQuestao: 103,
      idModulo: 1,
      enunciado: 'A razão entre a idade de Pedro e a idade de Paulo é 3/4. Se a soma das idades é 35 anos, qual é a idade de Pedro?',
      respostas: [
        { id: 'A', text: '12 anos', isCorrect: false },
        { id: 'B', text: '15 anos', isCorrect: true },
        { id: 'C', text: '20 anos', isCorrect: false },
        { id: 'D', text: '21 anos', isCorrect: false },
      ],
      nivel: 1,
    },
  ],
  // Módulo 2: Grandezas diretamente proporcionais
  2: [
    {
      idQuestao: 201,
      idModulo: 2,
      enunciado: 'Um carro consome 10 litros de combustível para percorrer 120 km. Quantos litros serão necessários para percorrer 300 km?',
      respostas: [
        { id: 'A', text: '20 litros', isCorrect: false },
        { id: 'B', text: '25 litros', isCorrect: true },
        { id: 'C', text: '30 litros', isCorrect: false },
        { id: 'D', text: '35 litros', isCorrect: false },
      ],
      nivel: 1,
    },
  ],
};

// Função utilitária para buscar questões por Módulo
export function getQuestoesPorModulo(idModulo: number): Questao[] {
  return MOCK_QUESTOES[idModulo] || MOCK_QUESTOES[1]; // Retorna Módulo 1 como fallback se não encontrar
}