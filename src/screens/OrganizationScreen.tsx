import { useEffect, useState } from "react";
import { ScreenHeader } from "../components/ScreenHeader";
import { Input } from "../components/Fields";
import { Card, Notice } from "../components/Controls";
import { entityId } from "../data/localStore";
import {
  loadOrganization,
  saveOrganization,
  type Organization,
} from "../data/organizationRepository";
export function OrganizationScreen({
  onBack,
  onDirtyChange,
}: {
  onBack: () => void;
  onDirtyChange?: (dirty: boolean) => void;
}) {
  const [data, setData] = useState<Organization | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [saved, setSaved] = useState(false),
    [baseline, setBaseline] = useState("");
  const dirty = data !== null && JSON.stringify(data) !== baseline;
  useEffect(() => {
    onDirtyChange?.(dirty || busy);
    return () => onDirtyChange?.(false);
  }, [dirty, busy, onDirtyChange]);
  useEffect(() => {
    loadOrganization()
      .then((loaded) => {
        setData(loaded);
        setBaseline(JSON.stringify(loaded));
      })
      .catch(() =>
        setError("Não foi possível carregar escolas e anos letivos."),
      );
  }, []);
  const update = (next: Organization) => {
    setData(next);
    setSaved(false);
  };
  const save = async () => {
    if (!data) return;
    setBusy(true);
    setError("");
    try {
      await saveOrganization(data);
      setBaseline(JSON.stringify(data));
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível salvar.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <section>
      <ScreenHeader
        title="Escolas e anos letivos"
        subtitle="Organize as turmas de cada instituição"
        onBack={onBack}
      />
      <div className="module-content">
        {error && <Notice error>{error}</Notice>}
        {!data && !error && <Notice>Carregando…</Notice>}
        {data && (
          <>
            <Card>
              <h2>Escolas</h2>
              {data.escolas.map((s, i) => (
                <fieldset key={s.id}>
                  <legend>
                    {s.arquivadaEm ? "Escola arquivada" : `Escola ${i + 1}`}
                  </legend>
                  <Input
                    label="Nome da escola"
                    value={s.nome}
                    onChange={(e) =>
                      update({
                        ...data,
                        escolas: data.escolas.map((x) =>
                          x.id === s.id ? { ...x, nome: e.target.value } : x,
                        ),
                      })
                    }
                  />
                  <Input
                    label="Cidade"
                    value={s.cidade}
                    onChange={(e) =>
                      update({
                        ...data,
                        escolas: data.escolas.map((x) =>
                          x.id === s.id ? { ...x, cidade: e.target.value } : x,
                        ),
                      })
                    }
                  />
                  <button
                    className="text-button"
                    onClick={() =>
                      update({
                        ...data,
                        escolas: data.escolas.map((x) =>
                          x.id === s.id
                            ? {
                                ...x,
                                arquivadaEm: s.arquivadaEm
                                  ? null
                                  : new Date().toISOString(),
                              }
                            : x,
                        ),
                      })
                    }
                  >
                    {s.arquivadaEm ? "Restaurar escola" : "Arquivar escola"}
                  </button>
                </fieldset>
              ))}
              <button
                className="secondary-button"
                onClick={() =>
                  update({
                    ...data,
                    escolas: [
                      ...data.escolas,
                      { id: entityId("escola"), nome: "", cidade: "" },
                    ],
                  })
                }
              >
                Adicionar escola
              </button>
            </Card>
            <Card>
              <h2>Anos letivos</h2>
              {data.anos.map((y) => (
                <fieldset key={y.id}>
                  <legend>{y.nome || "Novo ano letivo"}</legend>
                  <Input
                    label="Nome do ano letivo"
                    value={y.nome}
                    onChange={(e) =>
                      update({
                        ...data,
                        anos: data.anos.map((x) =>
                          x.id === y.id ? { ...x, nome: e.target.value } : x,
                        ),
                      })
                    }
                  />
                  <div className="two-fields">
                    <Input
                      type="date"
                      label="Início"
                      value={y.inicio}
                      onChange={(e) =>
                        update({
                          ...data,
                          anos: data.anos.map((x) =>
                            x.id === y.id
                              ? { ...x, inicio: e.target.value }
                              : x,
                          ),
                        })
                      }
                    />
                    <Input
                      type="date"
                      label="Fim"
                      value={y.fim}
                      onChange={(e) =>
                        update({
                          ...data,
                          anos: data.anos.map((x) =>
                            x.id === y.id ? { ...x, fim: e.target.value } : x,
                          ),
                        })
                      }
                    />
                  </div>
                  <label className="check-row">
                    <input
                      type="checkbox"
                      checked={y.ativo}
                      onChange={() =>
                        update({
                          ...data,
                          anos: data.anos.map((x) => ({
                            ...x,
                            ativo: x.id === y.id ? !y.ativo : false,
                          })),
                        })
                      }
                    />
                    Ano letivo atual
                  </label>
                  <button
                    className="text-button"
                    onClick={() =>
                      update({
                        ...data,
                        anos: data.anos.map((x) =>
                          x.id === y.id
                            ? { ...x, arquivado: !x.arquivado, ativo: false }
                            : x,
                        ),
                      })
                    }
                  >
                    {y.arquivado ? "Restaurar ano" : "Arquivar ano"}
                  </button>
                </fieldset>
              ))}
              <button
                className="secondary-button"
                onClick={() =>
                  update({
                    ...data,
                    anos: [
                      ...data.anos,
                      {
                        id: entityId("ano"),
                        nome: "",
                        inicio: "",
                        fim: "",
                        ativo: false,
                      },
                    ],
                  })
                }
              >
                Adicionar ano letivo
              </button>
            </Card>
            <p className="helper-text">
              Arquivar mantém as turmas e seus registros. As datas podem ficar
              em branco.
            </p>
            <button className="ui-button" disabled={busy} onClick={save}>
              {busy ? "Salvando…" : "Salvar organização"}
            </button>
            {saved && !dirty && (
              <Notice>Organização salva neste dispositivo.</Notice>
            )}
          </>
        )}
      </div>
    </section>
  );
}
