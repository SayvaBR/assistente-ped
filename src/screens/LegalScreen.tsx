import { useState } from "react";
import { FileText, ShieldCheck } from "lucide-react";
import { ScreenHeader } from "../components/ScreenHeader";
import { Card } from "../components/Controls";

type Props = { onBack: () => void };
type Tab = "termos" | "privacidade";

export function LegalScreen({ onBack }: Props) {
  const [tab, setTab] = useState<Tab>("termos");
  return (
    <section>
      <ScreenHeader
        title="Termos e privacidade"
        subtitle="Informações legais do aplicativo"
        onBack={onBack}
      />
      <div className="module-content legal-page">
        <div
          className="segmented-control"
          role="tablist"
          aria-label="Documentos legais"
        >
          <button
            role="tab"
            aria-selected={tab === "termos"}
            className={tab === "termos" ? "active" : ""}
            onClick={() => setTab("termos")}
          >
            <FileText size={17} /> Termos de uso
          </button>
          <button
            role="tab"
            aria-selected={tab === "privacidade"}
            className={tab === "privacidade" ? "active" : ""}
            onClick={() => setTab("privacidade")}
          >
            <ShieldCheck size={17} /> Privacidade
          </button>
        </div>
        <div className="ui-card stack legal-copy">
          {tab === "termos" ? (
            <>
              <p className="legal-version">
                Termos de Uso · versão 1.0 · 11/09/2026
              </p>
              <h2>1. Finalidade</h2>
              <p>
                O Assistente Pedagógico é uma ferramenta pessoal de organização
                do trabalho docente. Ele ajuda a planejar aulas, acompanhar
                turmas e registrar informações pedagógicas.
              </p>
              <h2>2. Conteúdo inserido</h2>
              <p>
                Você decide quais informações registrar e deve ter autorização
                ou outra base legítima para tratar dados de terceiros, inclusive
                de alunos. O aplicativo não substitui decisões pedagógicas ou
                obrigações da instituição de ensino.
              </p>
              <h2>3. Armazenamento local</h2>
              <p>
                Na versão atual, os registros ficam neste aparelho. O Backup
                Local permite criar uma cópia manual; mantenha essa cópia
                protegida.
              </p>
              <h2>4. Assinaturas</h2>
              <p>
                Recursos pagos, preço, periodicidade e renovação só serão
                ativados quando a compra pela Google Play estiver configurada e
                serão apresentados antes da confirmação.
              </p>
              <h2>5. Disponibilidade e contato</h2>
              <p>
                O aplicativo pode receber correções e atualizações. Use Ajuda e
                feedback para preparar uma mensagem à equipe sem incluir dados
                de alunos.
              </p>
            </>
          ) : (
            <>
              <p className="legal-version">
                Política de Privacidade · versão 1.0 · 11/09/2026
              </p>
              <h2>1. Dados no aparelho</h2>
              <p>
                Perfil, turmas, alunos, frequência, notas, planejamentos,
                arquivos e registros são armazenados localmente para executar as
                funções escolhidas por você.
              </p>
              <h2>2. Métricas opcionais</h2>
              <p>
                O aplicativo não envia métricas por padrão. Se você ativar o
                consentimento em Privacidade, apenas eventos técnicos permitidos
                podem ser registrados; o conteúdo de alunos não é enviado.
              </p>
              <h2>3. Arquivos e permissões</h2>
              <p>
                Câmera, arquivos, notificações e compartilhamento só são usados
                quando você aciona a função correspondente e concede a permissão
                do Android.
              </p>
              <h2>4. Exclusão e backup</h2>
              <p>
                Você pode apagar os dados deste aparelho na área de Backup.
                Antes disso, exporte uma cópia se precisar preservar o
                histórico.
              </p>
              <h2>5. Crianças e adolescentes</h2>
              <p>
                O aplicativo é destinado ao trabalho de profissionais da
                educação. Não solicitamos conta ou contato de alunos e
                recomendamos não incluir dados pessoais desnecessários.
              </p>
              <h2>6. Direitos</h2>
              <p>
                Para dúvidas sobre privacidade, prepare uma mensagem em Ajuda e
                feedback. O canal de contato será configurado antes da
                publicação comercial.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
