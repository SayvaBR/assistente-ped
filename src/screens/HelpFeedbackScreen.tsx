import { useEffect, useState } from "react";
import { LifeBuoy, Share2 } from "lucide-react";
import { ScreenHeader } from "../components/ScreenHeader";
import { Card, Notice } from "../components/Controls";
import { storage } from "../data/localStore";
import { Capacitor } from "@capacitor/core";
import { Share } from "@capacitor/share";

type Props = { onBack: () => void };

export function HelpFeedbackScreen({ onBack }: Props) {
  const [message, setMessage] = useState("");
  const [includeTechnical, setIncludeTechnical] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    storage
      .get("feedback:rascunho")
      .then(({ value }) => {
        const draft = JSON.parse(value) as {
          message?: string;
          includeTechnical?: boolean;
        };
        setMessage(draft.message || "");
        setIncludeTechnical(draft.includeTechnical === true);
      })
      .catch(() => {});
  }, []);

  const buildText = () => {
    const technical = includeTechnical
      ? `\n\nInformações técnicas: plataforma ${Capacitor.getPlatform()}, versão web Android-first.`
      : "";
    return `Feedback do Assistente Pedagógico\n\n${message.trim()}${technical}\n\nNão foram incluídos dados de alunos.`;
  };

  const saveDraft = async () => {
    setError("");
    setStatus("");
    if (message.trim().length < 10) {
      setError("Escreva pelo menos 10 caracteres para enviar um feedback.");
      return;
    }
    await storage.set(
      "feedback:rascunho",
      JSON.stringify({
        message,
        includeTechnical,
        atualizadoEm: new Date().toISOString(),
      }),
    );
    try {
      const text = buildText();
      if (Capacitor.isNativePlatform()) {
        await Share.share({
          title: "Feedback do Assistente Pedagógico",
          text,
          dialogTitle: "Compartilhar feedback",
        });
      } else if (navigator.share) {
        await navigator.share({
          title: "Feedback do Assistente Pedagógico",
          text,
        });
      } else {
        await navigator.clipboard.writeText(text);
      }
      setStatus("Feedback preparado para compartilhamento.");
    } catch (cause) {
      if ((cause as Error)?.name !== "AbortError")
        setError(
          "Não foi possível preparar o compartilhamento. Tente novamente.",
        );
    }
  };

  return (
    <section>
      <ScreenHeader
        title="Ajuda e feedback"
        subtitle="Conte como podemos melhorar"
        onBack={onBack}
      />
      <div className="module-content feedback-page">
        {status && <Notice>{status}</Notice>}
        {error && <Notice error>{error}</Notice>}
        <Card>
          <div className="feedback-heading">
            <LifeBuoy size={22} />
            <div>
              <h2>Fale com a equipe</h2>
              <p className="helper-text">
                Descreva o que aconteceu ou uma ideia para o aplicativo.
              </p>
            </div>
          </div>
          <label className="field-label" htmlFor="feedback-message">
            Mensagem
            <textarea
              id="feedback-message"
              rows={8}
              maxLength={5000}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="O que você gostaria de contar?"
            />
          </label>
          <label className="check-row">
            <input
              type="checkbox"
              checked={includeTechnical}
              onChange={(event) => setIncludeTechnical(event.target.checked)}
            />{" "}
            Incluir informações técnicas básicas
          </label>
          <p className="feedback-warning">
            Não escreva nomes, contatos, fotos ou outros dados pessoais de
            alunos. O compartilhamento só acontece quando você tocar no botão.
          </p>
          <button className="ui-button" onClick={() => void saveDraft()}>
            <Share2 size={18} /> Preparar feedback
          </button>
        </Card>
        <Card>
          <h2>Ajuda rápida</h2>
          <p className="helper-text">
            Os dados pedagógicos ficam neste aparelho. Use o Backup Local antes
            de trocar de telefone ou limpar os dados do Android.
          </p>
          <p className="helper-text">
            Tutoriais, privacidade e termos ficam disponíveis em Configurações.
          </p>
        </Card>
      </div>
    </section>
  );
}
