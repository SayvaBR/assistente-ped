import { useEffect, useRef, useState } from "react";
import type { LessonPlan } from "../domain/models";
export function usePlanAutosave(
  plan: LessonPlan,
  onSave: (plan: LessonPlan) => Promise<unknown>,
) {
  const initial = useRef(JSON.stringify(plan)),
    saveRef = useRef(onSave),
    latest = useRef(plan),
    chain = useRef(Promise.resolve()),
    timer = useRef<ReturnType<typeof setTimeout>>(),
    paused = useRef(false),
    revision = useRef(0);
  const [status, setStatus] = useState(""),
    [error, setError] = useState(""),
    [saved, setSaved] = useState(initial.current);
  saveRef.current = onSave;
  latest.current = plan;
  const serialized = JSON.stringify(plan);
  const cancelTimer = () => {
    clearTimeout(timer.current);
    timer.current = undefined;
  };
  const enqueue = (snapshot: LessonPlan) => {
    const text = JSON.stringify(snapshot);
    const current = ++revision.current;
    const saveSnapshot = saveRef.current;
    setStatus("Salvando rascunho…");
    setError("");
    const write = chain.current
      .catch(() => {})
      .then(async () => {
        try {
          await saveSnapshot(snapshot);
          initial.current = text;
          setSaved(text);
          if (
            current === revision.current &&
            JSON.stringify(latest.current) === text
          ) {
            setStatus("Salvo neste dispositivo");
          }
        } catch (cause) {
          if (current === revision.current) {
            setError(
              "Não foi possível salvar automaticamente. Tente salvar novamente.",
            );
            setStatus("Alterações ainda não salvas");
          }
          throw cause;
        }
      });
    chain.current = write;
    return write;
  };
  const save = () => {
    cancelTimer();
    if (paused.current || JSON.stringify(latest.current) === initial.current)
      return;
    void enqueue(latest.current).catch(() => {});
  };
  const flushRef = useRef(save);
  flushRef.current = save;
  useEffect(() => {
    if (serialized === initial.current || paused.current) return;
    timer.current = setTimeout(() => flushRef.current(), 600);
    return cancelTimer;
  }, [serialized]);
  useEffect(() => {
    const visibility = () => {
      if (document.visibilityState === "hidden") flushRef.current();
    };
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  return {
    status:
      serialized !== saved && status === "Salvo neste dispositivo"
        ? "Alterações aguardando salvamento…"
        : status,
    error,
    dirty: serialized !== saved,
    retry: save,
    async saveNow(snapshot: LessonPlan) {
      paused.current = true;
      cancelTimer();
      try {
        await enqueue(snapshot);
      } catch (cause) {
        paused.current = false;
        throw cause;
      }
    },
    async pause() {
      paused.current = true;
      cancelTimer();
      await chain.current.catch(() => {});
    },
    resume() {
      paused.current = false;
    },
  };
}
