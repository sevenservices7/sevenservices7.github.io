import type { Solution, Stage } from '../solution-types';

// Carrega automaticamente todo arquivo src/data/solucoes/<slug>.ts que exporte `solution`.
const modules = import.meta.glob<{ solution: Solution }>('./*.ts', { eager: true });

export const solutions: Solution[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith('/index.ts'))
  .map(([, m]) => m.solution)
  .filter(Boolean);

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

/** A jornada do cliente, na ordem em que ela acontece (esteira E0–E5). */
export const STAGES: { id: Stage; step: string; title: string; summary: string }[] = [
  { id: 'decisao', step: '01', title: 'Decidir', summary: 'Ainda no Brasil, escolhendo o caminho certo para morar em Portugal.' },
  { id: 'chegada', step: '02', title: 'Chegar', summary: 'Os primeiros documentos: NIF, NISS, carta e papéis do Brasil.' },
  { id: 'residencia', step: '03', title: 'Morar legalmente', summary: 'Autorização de residência, renovação, família e IRS todo ano.' },
  { id: 'nacionalidade', step: '04', title: 'Ser português', summary: 'O pedido de nacionalidade, quando chegar a hora.' },
  { id: 'empresa', step: '05', title: 'Empreender', summary: 'Abrir a empresa e manter a contabilidade em dia.' },
  { id: 'apoio', step: '+', title: 'Apoio jurídico', summary: 'Quando o caso pede advogada: recursos, indeferimentos e casos complexos.' },
];

const order = new Map(STAGES.map((s, i) => [s.id, i]));

export function solutionsByStage(stage: Stage): Solution[] {
  return solutions.filter((s) => s.stage === stage);
}

export function sortedSolutions(): Solution[] {
  return [...solutions].sort((a, b) => (order.get(a.stage)! - order.get(b.stage)!) || a.navLabel.localeCompare(b.navLabel));
}
