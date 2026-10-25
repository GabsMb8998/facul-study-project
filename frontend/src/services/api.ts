export interface SubAssunto {
  id: string;
  assunto: string;
  nome: string;
  conteudo: string;
  ordem: number | null;
  is_active: boolean;
}

export interface Assunto {
  id: string;
  materia: string;
  materia_nome: string;
  nome: string;
  conteudo: string;
  ordem: number | null;
  is_active: boolean;
  subassuntos: SubAssunto[];
}

export interface Materia {
  id: string;
  nome: string;
  descricao: string;
  is_active: boolean;
  assuntos: Assunto[];
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`/api/${path}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type') ?? '';
    let message = `Falha ao consultar a API (HTTP ${response.status}).`;

    if (contentType.includes('application/json')) {
      const body: unknown = await response.json();
      if (typeof body === 'object' && body !== null && 'detail' in body) {
        message = String(body.detail);
      } else {
        message = JSON.stringify(body);
      }
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function getMaterias(): Promise<Materia[]> {
  return request<Materia[]>('materias/');
}

export function getMateria(id: string): Promise<Materia> {
  return request<Materia>(`materias/${encodeURIComponent(id)}/`);
}

export function getAssunto(id: string): Promise<Assunto> {
  return request<Assunto>(`assuntos/${encodeURIComponent(id)}/`);
}
