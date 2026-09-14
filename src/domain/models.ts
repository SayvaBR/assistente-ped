/** Persistent contracts recovered from APK 0.2.0. Unknown fields are preserved during updates. */
/** Situações registráveis na chamada; os três primeiros preservam o formato antigo. */
export type AttendanceStatus =
  "presente" | "falta" | "atrasado" | "falta_justificada" | "saida_antecipada";
export type Attendance = Record<string, AttendanceStatus>;
export interface ClassRoom {
  id: string;
  nome: string;
  professorId?: string;
  turno?: string;
  nivel?: string;
  arquivadaEm?: string | null;
  [key: string]: unknown;
}
export interface Student {
  id: string;
  nome: string;
  dataNascimento?: string;
  excluidoEm?: string | null;
  [key: string]: unknown;
}
export interface LessonPlan {
  id: string;
  turmaId: string | null;
  dataKey: string;
  tituloTema: string;
  horaInicio: string;
  horaFim: string;
  status: "rascunho" | "pronto" | "concluido";
  objetivoGeral: string;
  objetivosEspecificos: string[];
  disciplina?: string;
  objetoConhecimento?: string;
  justificativa?: string;
  bncc: { habilidades: string[]; descricoes?: Record<string, string> };
  momentos: LessonMoment[];
  recursos: string;
  avaliacao: string;
  inclusao: string;
  observacoes: string;
  posAula: { comoFoi: string | null; observacoesPosAula: string };
  criadoEm: string;
  atualizadoEm: string;
  /** Optional metadata added by the planning workspace without breaking legacy records. */
  favorito?: boolean;
  arquivadoEm?: string | null;
}
export interface LessonMoment {
  id: string;
  titulo: string;
  horario: string;
  duracaoMin: number | null;
  descricao: string;
  tipo: string;
}
export interface Backup {
  formato: "assistente-pedagogico-backup";
  versao: 1 | 2;
  aplicativo: string;
  exportadoEm: string;
  registros: { chave: string; valor: string }[];
  arquivos: { path: string; data: string }[];
}
export interface StoragePort {
  get(key: string): Promise<{ value: string }>;
  set(key: string, value: string): Promise<unknown>;
  delete(key: string): Promise<unknown>;
  list(prefix: string): Promise<{ keys: string[] }>;
}
