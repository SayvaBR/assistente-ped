import { readJson, writeJson } from "./localStore";
export interface School {
  id: string;
  nome: string;
  cidade: string;
  arquivadaEm?: string | null;
}
export interface SchoolYear {
  id: string;
  nome: string;
  inicio: string;
  fim: string;
  ativo: boolean;
  arquivado?: boolean;
}
export interface Organization {
  escolas: School[];
  anos: SchoolYear[];
}
export const loadOrganization = () =>
  readJson<Organization>("organizacao:v1", { escolas: [], anos: [] });
export async function saveOrganization(data: Organization) {
  if (
    data.escolas.some((s) => !s.nome.trim()) ||
    data.anos.some(
      (y) => !y.nome.trim() || (y.inicio && y.fim && y.inicio > y.fim),
    )
  )
    throw new Error("Confira os nomes e as datas.");
  await writeJson("organizacao:v1", data);
}
