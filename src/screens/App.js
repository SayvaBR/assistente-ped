import { StudentImportScreen } from "./StudentImportScreen";
import { NotebookScreen } from "./NotebookScreen";
import { stageFrom } from "../domain/education";
import { AcademicScreen } from "./AcademicScreen";
import { OrganizationScreen } from "./OrganizationScreen";
import { setSoundEnabled } from "../core/recovered.js";
// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.
import { AppearanceScreen } from "../screens/AppearanceScreen.js";
import { BackupScreen } from "../screens/BackupScreen.js";
import { BnccInfantilScreen } from "../screens/BnccInfantilScreen.js";
import { BnccScreen } from "../screens/BnccCatalogScreen.tsx";
import { Bo } from "../core/recovered.js";
import { BottomNavigation } from "../screens/BottomNavigation.js";
import { ClassScreen } from "../screens/ClassScreen.js";
import { ClassesScreen } from "../screens/ClassManager";
import { ConfirmationDialog } from "../core/recovered.js";
import { Cu } from "../core/recovered.js";
import { Dn } from "../core/recovered.js";
import { DocumentsScreen } from "../screens/DocumentsScreen.js";
import { GuidedTour } from "../screens/GuidedTour.js";
import { HomeV2 } from "../v2/screens/HomeV2";
import { createHomeV2Data } from "../v2/adapters/home-v2-adapter";
import { FrequencyV2 } from "../v2/screens/FrequencyV2";
import { createFrequencyV2Data } from "../v2/adapters/frequency-v2-adapter";
import { ObservationV2 } from "../v2/screens/ObservationV2";
import { CommitmentsV2 } from "../v2/screens/CommitmentsV2";
import { LessonPlanScreen } from "../screens/LessonPlanScreen.js";
import { LessonPlanV2 } from "../v2/screens/LessonPlanV2";
import { LibraryScreen } from "../screens/LibraryScreen.jsx";
import { MoreScreen } from "../screens/MoreScreen.js";
import * as ReactHooks from "react";
import { NewStudentScreen } from "../screens/NewStudentScreen.js";
import { NotificationsScreen } from "../screens/NotificationsScreen.js";
import { Ol } from "../core/recovered.js";
import { PedagogicalPlanningScreen } from "../screens/PedagogicalPlanningScreen.js";
import { PlanningScreen } from "../screens/PlanningScreen.jsx";
import { SequenceScreen } from "../screens/SequenceScreen";
import { PrivacyScreen } from "../screens/PrivacyScreen.js";
import { SettingsScreen } from "../screens/SettingsScreen.js";
import { SetupWizard } from "../screens/SetupWizard.js";
import { SetupWizardV2 } from "../v2/screens/SetupWizardV2";
import { NewStudentV2 } from "../v2/screens/NewStudentV2";
import { SubscriptionScreen } from "../screens/SubscriptionScreen";
import { SubscriptionV2 } from "../v2/screens/SubscriptionV2";
import { PrivacyV2 } from "../v2/screens/PrivacyV2";
import { BackupV2 } from "../v2/screens/BackupV2";
import { NotificationsV2 } from "../v2/screens/NotificationsV2";
import { ToolsV2 } from "../v2/screens/ToolsV2";
import { StudentProfileV2 } from "../v2/screens/StudentProfileV2";
import { ClassManagerV2 } from "../v2/screens/ClassManagerV2";
import { HelpFeedbackScreen } from "../screens/HelpFeedbackScreen";
import { LegalScreen } from "../screens/LegalScreen";
import { SplashScreen } from "../screens/SplashScreen.js";
import { SplashV2 } from "../v2/screens/SplashV2";
import { StudentScreen } from "../screens/StudentScreen.js";
import { TeacherProfileScreen } from "../screens/TeacherProfileScreen.js";
import { ToolsScreen } from "../screens/ToolsScreen.js";
import { TrashScreen } from "../screens/TrashScreen.js";
import { TutorialsScreen } from "../screens/TutorialsScreen.js";
import { App as Vf } from "@capacitor/app";
import { WelcomeScreen } from "../screens/Onboarding";
import { OnboardingV2 } from "../v2/screens/OnboardingV2";
import { Check as Zr } from "lucide-react";
import { colors } from "../core/recovered.js";
import { createId } from "../core/recovered.js";
import { dateKey } from "../core/recovered.js";
import { loadClasses } from "../data/classes.js";
import { deleteMedia, saveMedia } from "../data/files.js";
import { Cp, Xf } from "../data/agenda-camera.js";
import { listPlans } from "../data/planRepository";
import { migrateLegacyClassData } from "../data/classes.js";
import React from "react";
import { nowISO } from "../core/recovered.js";
import { p0 } from "../core/recovered.js";
import { ph } from "../data/classes.js";
import { repository } from "../core/recovered.js";
import { saveClasses } from "../data/classes.js";
import { storage } from "../core/recovered.js";
import { u0 } from "../core/recovered.js";
import { ws } from "../core/recovered.js";
import { z0 } from "../screens/z0.js";
import { PlanningDayV2 } from "../v2/screens/PlanningDayV2";
import { PlanningCalendarV2 } from "../v2/screens/PlanningCalendarV2";
import { ClassesV2 } from "../v2/screens/ClassesV2";
import { ProfileV2 } from "../v2/screens/ProfileV2";
import { FilesV2 } from "../v2/screens/FilesV2";
import { MoreV2 } from "../v2/screens/MoreV2";
import { BnccV2 } from "../v2/screens/BnccV2";
import { ReportsV2 } from "../v2/screens/ReportsV2";
import { SettingsV2 } from "../v2/screens/SettingsV2";
import { AppearanceV2 } from "../v2/screens/AppearanceV2";
import { newLessonPlan } from "../domain/lessonPlans";

const ReportsScreen = React.lazy(() =>
  import("../screens/ReportsModule").then(({ ReportsScreen: screen }) => ({
    default: screen,
  })),
);

function shiftDateKey(value, offset) {
  const [year, month, day] = String(value || '').split('-').map(Number);
  const shifted = new Date(year || new Date().getFullYear(), (month || 1) - 1, day || 1);
  shifted.setDate(shifted.getDate() + offset);
  return dateKey(shifted);
}

function App() {
  var _a, bt, qn, xi;
  const [o, u] = ReactHooks.useState("carregando"),
    [f, y] = ReactHooks.useState("inicio"),
    [v, E] = ReactHooks.useState([]),
    [b, _] = ReactHooks.useState("tab"),
    [D, T] = ReactHooks.useState(!1),
    [U, R] = ReactHooks.useState(null),
    [X, ce] = ReactHooks.useState(0),
    [J, pe] = ReactHooks.useState(!1),
    [ge, ue] = ReactHooks.useState(""),
    [Se, Ce] = ReactHooks.useState(!1),
    [ke, ye] = ReactHooks.useState(null),
    [Ee, Ie] = ReactHooks.useState(null),
    [Oe, ze] = ReactHooks.useState("claro"),
    [te, Le] = ReactHooks.useState(Bo),
    [xe, Me] = ReactHooks.useState(() => {
      var ae;
      return (
        typeof window < "u" &&
        ((ae = window.matchMedia) == null
          ? void 0
          : ae.call(window, "(prefers-color-scheme: dark)").matches)
      );
    }),
    tt = React.useRef(!1),
    [yt, Be] = ReactHooks.useState(null),
    [dt, me] = ReactHooks.useState(!1),
    [se, O] = ReactHooks.useState([]),
    [M, ne] = ReactHooks.useState(null),
    [We, rt] = ReactHooks.useState([]),
    [mt, st] = ReactHooks.useState(!0),
    [we, Ue] = ReactHooks.useState([]),
    [be, ft] = ReactHooks.useState(!0),
    [He, Sa] = ReactHooks.useState({}),
    [oa, $n] = ReactHooks.useState("dia"),
    [yn, vi] = ReactHooks.useState(dateKey()),
    [yi, ba] = ReactHooks.useState({}),
    [homeAgendaState, setHomeAgendaState] = ReactHooks.useState({
      status: "loading",
      items: [],
      error: "",
    }),
    [homeIsOnline, setHomeIsOnline] = ReactHooks.useState(
      () => typeof navigator === "undefined" || navigator.onLine !== false,
    ),
    [frequencyV2State, setFrequencyV2State] = ReactHooks.useState({
      status: "ready",
      attendance: {},
      error: "",
    }),
    [frequencyV2Reload, setFrequencyV2Reload] = ReactHooks.useState(0),
    [planningV2Date, setPlanningV2Date] = ReactHooks.useState(dateKey()),
    [planningV2Reload, setPlanningV2Reload] = ReactHooks.useState(0),
    [planningV2State, setPlanningV2State] = ReactHooks.useState({ status: "ready", plans: [], error: "" });
  (ReactHooks.useEffect(() => {
    ((async () => {
      try {
        const ae = await repository.carregarTema();
        ae && Ol[ae]
          ? ze(ae)
          : ae &&
            u0[ae] &&
            (ze("claro"),
            Le(Bo),
            await repository.salvarTema("claro"),
            await storage.set("config:accent", Bo));
        try {
          const qe = await storage.get("config:accent"),
            lt = Cu(qe.value);
          (Le(lt), qe.value !== lt && (await storage.set("config:accent", lt)));
        } catch {}
      } catch {
      } finally {
        ((tt.current = !0), u((ae) => (ae === "carregando" ? "splash" : ae)));
      }
    })(),
      Dn.track("app_opened"));
  }, []),
    ReactHooks.useEffect(() => {
      var lt, Ft;
      const ae =
        (lt = window.matchMedia) == null
          ? void 0
          : lt.call(window, "(prefers-color-scheme: dark)");
      if (!ae) return;
      const qe = (ar) => Me(ar.matches);
      return (
        Me(ae.matches),
        (Ft = ae.addEventListener) == null || Ft.call(ae, "change", qe),
        () => {
          var ar;
          return (ar = ae.removeEventListener) == null
            ? void 0
            : ar.call(ae, "change", qe);
        }
      );
    }, []),
    ReactHooks.useEffect(() => {
      if (!tt.current) return;
      const ae = setTimeout(() => {
        storage
          .set("config:accent", Cu(te))
          .catch((qe) => console.error("Erro ao salvar cor de destaque:", qe));
      }, 180);
      return () => clearTimeout(ae);
    }, [te]));
  const Ei = (ae) => {
      (ze(ae),
        repository
          .salvarTema(ae)
          .catch((qe) => console.error("Erro ao salvar tema:", qe)),
        Dn.track("theme_changed", {
          tema: ae,
        }));
    },
    [Ga, xa] = ReactHooks.useState(!0);
  ReactHooks.useEffect(() => {
    (async () => {
      try {
        const ae = await storage.get("config:sons"),
          qe = JSON.parse(ae.value);
        (xa(qe), setSoundEnabled(Boolean(qe)));
      } catch {}
    })();
  }, []);
  const loadHomeV2Agenda = async (classId = M == null ? void 0 : M.id) => {
    if (!classId) {
      setHomeAgendaState({ status: "empty", items: [], error: "" });
      return;
    }
    setHomeAgendaState((state) => ({ ...state, status: "loading", error: "" }));
    try {
      const items = await Cp(storage, classId);
      setHomeAgendaState({
        status: items.length ? "ready" : "empty",
        items,
        error: "",
      });
    } catch (error) {
      setHomeAgendaState({
        status: "error",
        items: [],
        error: error?.message || "Não foi possível carregar a agenda local.",
      });
    }
  };
  ReactHooks.useEffect(() => {
    loadHomeV2Agenda(M == null ? void 0 : M.id);
  }, [M == null ? void 0 : M.id]);
  ReactHooks.useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const updateOnline = () => setHomeIsOnline(navigator.onLine !== false);
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);
  const Ca = (ae) => {
      (xa(ae),
        setSoundEnabled(Boolean(ae)),
        storage
          .set("config:sons", JSON.stringify(ae))
          .catch((qe) =>
            console.error("Erro ao salvar preferência de som:", qe),
          ));
    },
    ot = async (ae) => {
      (await repository.salvarPerfil(ae), Be(ae));
    };
  ReactHooks.useEffect(() => {
    (async () => {
      const ae = await repository.carregarPerfil();
      if (ae) Be(ae);
      else
        try {
          (await storage.get(ws), me(!0));
        } catch {
          me(!1);
        }
      try {
        const qe = await loadClasses(storage);
        qe.ativa &&
          (await migrateLegacyClassData(storage, qe.ativa.id),
          repository.definirTurmaAtiva(qe.ativa.id),
          O(qe.lista),
          ne(qe.ativa));
      } catch (qe) {
        console.error("Erro ao carregar turmas:", qe);
      }
    })();
  }, []);
  const Vt = async (ae) => {
      var qe, lt, Ft, ar, nr;
      try {
        const sr = {
            id: (ae == null ? void 0 : ae.perfilId) || createId("prof"),
            nome:
              ((qe = ae == null ? void 0 : ae.nome) == null
                ? void 0
                : qe.trim()) || "",
            tratamento: ["professor", "professora", "docente"].includes(
              ae == null ? void 0 : ae.tratamento,
            )
              ? ae.tratamento
              : "",
            escola:
              ((lt = ae == null ? void 0 : ae.escola) == null
                ? void 0
                : lt.trim()) || "",
            cidade:
              ((Ft = ae == null ? void 0 : ae.cidade) == null
                ? void 0
                : Ft.trim()) || "",
            uf: (ae == null ? void 0 : ae.uf) || "",
            ibgeCode: (ae == null ? void 0 : ae.ibgeCode) || null,
            etapaEnsino: (ae == null ? void 0 : ae.etapaEnsino) || "",
            criadoEm: nowISO(),
            ultimoAcesso: nowISO(),
          },
          Vr = {
            id: (ae == null ? void 0 : ae.turmaId) || createId("turma"),
            nome:
              ((ar = ae == null ? void 0 : ae.turma) == null
                ? void 0
                : ar.trim()) || "",
            nivel:
              ((nr = ae == null ? void 0 : ae.nivel) == null
                ? void 0
                : nr.trim()) || "",
            turno: (ae == null ? void 0 : ae.turno) || "",
            professorId: sr.id,
            etapa: stageFrom(ae.etapaEnsino),
            componentesCurriculares: [],
            duracaoAulaMin: 50,
            criadoEm: nowISO(),
          };
        let bn = [];
        try {
          bn = (await loadClasses(storage)).lista || [];
        } catch {}
        const xn = bn.some((Cn) => Cn.id === Vr.id)
          ? bn.map((Cn) => (Cn.id === Vr.id ? Vr : Cn))
          : [...bn, Vr];
        return (
          await repository.salvarTurmas(xn),
          await saveClasses(storage, xn, Vr.id),
          await repository.salvarPerfil(sr),
          repository.definirTurmaAtiva(Vr.id),
          Be(sr),
          O(xn),
          ne(Vr),
          Dn.track("profile_created", {
            temEscola: !!sr.escola,
            temNivel: !!Vr.nivel,
          }),
          Dn.track("class_created"),
          {
            perfil: sr,
            turma: Vr,
          }
        );
      } catch (sr) {
        throw (console.error("Erro ao salvar dados do assistente:", sr), sr);
      }
    },
    Ja = (ae) => {
      (me(!1),
        R(null),
        u("home"),
        ae === "aluno"
          ? (_("forward"),
            E([
              {
                name: "novo-aluno",
                routeKey: createId("rota"),
              },
            ]))
          : (_("tab"), E([]), y("inicio")));
    };
  ReactHooks.useEffect(() => {
    if (!(M != null && M.id)) return;
    const ae = M.id;
    let qe = !0;
    return (
      ft(!0),
      (async () => {
        try {
          const lt = await repository.carregarPlanoDoDia();
          if (!qe || repository.turmaAtivaId !== ae) return;
          Ue(lt || []);
        } catch (lt) {
          console.error("Erro ao carregar plano de aula:", lt);
        } finally {
          qe && repository.turmaAtivaId === ae && ft(!1);
        }
      })(),
      () => {
        qe = !1;
      }
    );
  }, [M == null ? void 0 : M.id]);
  const ki = async (ae) => {
      const qe = {
          ...ae,
          atualizadoEm: nowISO(),
        },
        lt = await repository.salvarPlano(qe);
      return (
        ae.dataKey === dateKey(new Date()) && Ue(lt),
        Dn.track("planning_created"),
        qe
      );
    },
    Qa = async (ae) => {
      const qe = await repository.removerPlano(ae);
      ae.dataKey === dateKey(new Date()) && Ue(qe);
    },
    Ya = async (ae = repository.turmaAtivaId) => {
      if (ae)
        try {
          const qe = await repository.listarTodasAsChamadas();
          if (repository.turmaAtivaId !== ae) return;
          const lt = {};
          Object.values(qe).forEach((ar) => {
            Object.entries(ar).forEach(([nr, sr]) => {
              (lt[nr] ||
                (lt[nr] = {
                  presencas: 0,
                  faltas: 0,
                  atrasos: 0,
                }),
                sr === "presente"
                  ? lt[nr].presencas++
                  : sr === "falta"
                    ? lt[nr].faltas++
                    : sr === "atrasado" && lt[nr].atrasos++);
            });
          });
          const Ft = await repository.carregarChamadaDoDia();
          if (repository.turmaAtivaId !== ae) return;
          (Sa(lt), ba(Ft));
        } catch (qe) {
          console.error("Erro ao calcular frequência:", qe);
        }
    };
  ReactHooks.useEffect(() => {
    M != null && M.id && Ya(M.id);
  }, [M == null ? void 0 : M.id]);
  const wi = async (ae, qe) => {
    (await repository.salvarChamadaPorData(ae, qe),
      await Ya(),
      Dn.track("attendance_registered"));
  };
  (ReactHooks.useEffect(() => {
    if (!(M != null && M.id)) return;
    const ae = M.id;
    let qe = !0;
    return (
      st(!0),
      (async () => {
        try {
          const lt = await repository.carregarEstudantes();
          if (!qe || repository.turmaAtivaId !== ae) return;
          if (lt) {
            let Ft = !1;
            const ar = lt.map((nr) =>
              nr.id
                ? nr
                : ((Ft = !0),
                  {
                    ...nr,
                    id: createId("aluno"),
                    criadoEm: nr.criadoEm || nowISO(),
                  }),
            );
            (rt(ar),
              Ft &&
                repository.turmaAtivaId === ae &&
                (await repository.salvarEstudantes(ar)));
          } else rt([]);
        } catch (lt) {
          console.error("Erro ao carregar alunos:", lt);
        } finally {
          qe && repository.turmaAtivaId === ae && st(!1);
        }
      })(),
      () => {
        qe = !1;
      }
    );
  }, [M == null ? void 0 : M.id]),
    ReactHooks.useEffect(() => {
      M != null && M.id && repository.migrarEvolucaoParaRotina();
    }, [M == null ? void 0 : M.id]));
  const Xa = (ae) => {
      (repository.definirTurmaAtiva(ae.id),
        st(!0),
        ft(!0),
        ne(ae),
        Ue([]),
        rt([]),
        Sa({}),
        ba({}),
        vi(dateKey()),
        $n("dia"));
    },
    dr = async (ae) => {
      const qe = await ph(storage, se, ae);
      (Xa(qe), kn("inicio"));
    },
    Pa = async (ae) => {
      (O(ae.lista),
        ae.ativa &&
          (ae.ativa.id !== (M == null ? void 0 : M.id)
            ? Xa(ae.ativa)
            : ne(ae.ativa)));
    },
    Si = async (ae) => {
      const qe = [...We, ae];
      (await repository.salvarEstudantes(qe),
        rt(qe),
        ue("Novo Aluno Adicionado com Sucesso"),
        Dn.track("student_created"));
    };
  ReactHooks.useEffect(() => {
    if (!ge) return;
    const ae = setTimeout(() => ue(""), 2600);
    return () => clearTimeout(ae);
  }, [ge]);
  const bi = async (ae, qe) => {
      const lt = We.map((Ft) =>
        Ft.id === ae.id
          ? {
              ...Ft,
              nome: qe,
              atualizadoEm: nowISO(),
            }
          : Ft,
      );
      (await repository.salvarEstudantes(lt), rt(lt));
    },
    Ho = async (ae, qe) => {
      const lt = We.map((Ft) =>
        Ft.id === ae.id
          ? {
              ...Ft,
              ...qe,
              atualizadoEm: nowISO(),
            }
          : Ft,
      );
      (await repository.salvarEstudantes(lt), rt(lt));
    },
    Wn = async (ae) => {
      const qe = We.map((lt) =>
        lt.id === ae.id
          ? {
              ...lt,
              deletedAt: nowISO(),
            }
          : lt,
      );
      (await repository.salvarEstudantes(qe), rt(qe));
    },
    Ka = We.filter((ae) => !ae.deletedAt),
    Za = Ka.map((ae) => {
      var qe, lt, Ft;
      return {
        ...ae,
        presencas: ((qe = He[ae.id]) == null ? void 0 : qe.presencas) ?? 0,
        faltas: ((lt = He[ae.id]) == null ? void 0 : lt.faltas) ?? 0,
        atrasos: ((Ft = He[ae.id]) == null ? void 0 : Ft.atrasos) ?? 0,
      };
    }),
    Aa = Oe === "sistema" ? (xe ? "escuro" : "claro") : Oe;
  (Object.assign(colors, p0(Ol[Aa] || Ol.claro, te)),
    ReactHooks.useEffect(() => {
      var ae;
      ((document.documentElement.style.colorScheme = colors.colorScheme),
        document.documentElement.style.setProperty(
          "--app-background",
          colors.bg,
        ),
        document.documentElement.style.setProperty(
          "--focus-ring",
          `${colors.primary}70`,
        ),
        document.documentElement.style.setProperty(
          "--color-primary",
          colors.primary,
        ),
        document.documentElement.style.setProperty(
          "--color-on-primary",
          colors.onPrimary,
        ),
        document.documentElement.style.setProperty(
          "--color-primary-dark",
          colors.primaryDark,
        ),
        document.documentElement.style.setProperty(
          "--color-primary-light",
          colors.primaryLight,
        ),
        document.documentElement.style.setProperty(
          "--color-surface",
          colors.white,
        ),
        document.documentElement.style.setProperty("--color-text", colors.dark),
        document.documentElement.style.setProperty(
          "--color-muted",
          colors.gray,
        ),
        document.documentElement.style.setProperty(
          "--color-border",
          colors.border,
        ),
        document.documentElement.style.setProperty(
          "--card-shadow",
          colors.cardShadow,
        ),
        (ae = document.querySelector('meta[name="theme-color"]')) == null ||
          ae.setAttribute("content", colors.primary));
    }, [Aa, te]));
  const Re = v[v.length - 1] || null,
    Wr = (ae, qe) => {
      (_("forward"),
        E((lt) => [
          ...lt,
          {
            name: ae,
            data: qe,
            routeKey: createId("rota"),
          },
        ]),
        ae === "biblioteca" && Dn.track("library_opened"),
        ae === "bncc" && Dn.track("bncc_opened"));
    },
    [en, no] = ReactHooks.useState(0),
    En = () => {
      (_("back"), E((ae) => ae.slice(0, -1)), no((ae) => ae + 1));
    },
    kn = (ae) => {
      (_("tab"), y(ae), E([]));
    },
    je = (ae) => {
      (ye(ae), Ce(!0));
    },
    zt = (ae, qe) => {
      J
        ? je({
            tipo: "rota",
            name: ae,
            data: qe,
          })
        : Wr(ae, qe);
    },
    _t = () => {
      J
        ? je({
            tipo: "voltar",
          })
        : En();
    },
    xr = (ae) => {
      (ae === f && v.length === 0) ||
        (J
          ? je({
              tipo: "aba",
            tab: ae,
          })
          : kn(ae));
    };
  ReactHooks.useEffect(() => {
    if (!["planejamento-dia", "planejamento-semana", "planejamento-mes"].includes(Re?.name) || !M?.id) return undefined;
    let active = true;
    setPlanningV2State((state) => ({ ...state, status: "loading", error: "" }));
    listPlans(M.id)
      .then((plans) => active && setPlanningV2State({ status: plans.length ? "ready" : "empty", plans, error: "" }))
      .catch((error) => active && setPlanningV2State({ status: "error", plans: [], error: error?.message || "Não foi possível carregar o planejamento." }));
    return () => { active = false; };
  }, [Re?.name, M?.id, planningV2Date, planningV2Reload]);
  const frequencyV2DateKey =
    Re?.name === "chamada" ? Re.data?.dataKey || yn : yn;
  ReactHooks.useEffect(() => {
    if (Re?.name !== "chamada" || !M?.id) return undefined;
    let active = true;
    setFrequencyV2State((state) => ({ ...state, status: "loading", error: "" }));
    repository
      .carregarChamadaPorData(frequencyV2DateKey)
      .then((attendance) => {
        if (active) {
          setFrequencyV2State({ status: "ready", attendance: attendance || {}, error: "" });
        }
      })
      .catch((error) => {
        if (active) {
          setFrequencyV2State({
            status: "error",
            attendance: {},
            error: error?.message || "Não foi possível carregar a chamada.",
          });
        }
      });
    return () => {
      active = false;
    };
  }, [Re?.name, Re?.data?.dataKey, M?.id, frequencyV2DateKey, frequencyV2Reload]);
  const retryFrequencyV2 = () => {
    setFrequencyV2Reload((value) => value + 1);
  };
  const frequencyV2Data = createFrequencyV2Data({
    turma: M,
    alunos: Ka,
    frequencia: frequencyV2State.attendance,
    dataKey: frequencyV2DateKey,
    status: frequencyV2State.status,
    error: frequencyV2State.error,
    offline: !homeIsOnline,
  });
  const frequencyV2 = (props = {}) => React.createElement(FrequencyV2, {
    data: frequencyV2Data,
    onBack: _t,
    onClassSettings: () => {
      $n("gestao");
      kn("turma");
    },
    onStudentDetails: (studentId) => {
      const student = Ka.find((item) => item.id === studentId);
      student && zt("perfil", student);
    },
    onContextChange: (context) => {
      if (context === "frequencia") return;
      const nextTab = {
        dia: "dia",
        alunos: "criancas",
        registros: "registros",
      }[context];
      if (!nextTab) return;
      $n(nextTab);
      kn("turma");
    },
    onRetry: retryFrequencyV2,
    onDateChange: (offset) => zt("chamada", { dataKey: shiftDateKey(frequencyV2DateKey, offset) }),
    onSave: async (attendance) => {
      await wi(frequencyV2DateKey, attendance);
      setFrequencyV2State({ status: "ready", attendance, error: "" });
    },
    onTabChange: (tab) => xr({ inicio: "inicio", planejamento: "plano", turmas: "turmas-v2", arquivos: "biblioteca", mais: "mais" }[tab]),
    ...props,
  });
  const saveObservationV2 = async (studentId, payload) => {
    let audio = null;
    try {
      if (payload.audioDataUrl) {
        audio = await saveMedia({
          dataUrl: payload.audioDataUrl,
          tipo: "audio",
          proprietarioId: studentId,
          id: createId("audio"),
        });
      }
      const observations = await repository.carregarObservacoes(studentId);
      observations.unshift({
        id: createId("obs"),
        data: new Date().toLocaleDateString("pt-BR"),
        criadoEm: nowISO(),
        humor: payload.humor,
        texto: payload.texto,
        audio,
      });
      await repository.salvarObservacoes(studentId, observations);
    } catch (error) {
      if (audio) await deleteMedia(audio).catch(() => {});
      throw error;
    }
  };
  const loadStudentObservationsV2 = async (studentId) => repository.carregarObservacoes(studentId);
  const observationV2 = (props = {}) => React.createElement(ObservationV2, {
    students: Ka.map((student) => ({ id: student.id, name: student.nome, color: student.cor })),
    className: M?.nome || "Sua turma",
    activeTab: "turmas",
    onBack: _t,
    onSave: saveObservationV2,
    onTabChange: (tab) => xr({ inicio: "inicio", planejamento: "plano", turmas: "turmas-v2", arquivos: "biblioteca", mais: "mais" }[tab]),
    ...props,
  });
  const saveCommitmentV2 = async (event) => {
    if (!M?.id) throw new Error("Selecione uma turma para usar a agenda.");
    const current = await Cp(storage, M.id);
    const persisted = { ...event, id: event.id || createId("evento"), turmaId: M.id };
    const next = event.id ? current.map((item) => item.id === event.id ? persisted : item) : [...current, persisted];
    const saved = await Xf(storage, M.id, next);
    await loadHomeV2Agenda(M.id);
    return saved.find((item) => item.id === persisted.id) || persisted;
  };
  const deleteCommitmentV2 = async (event) => {
    if (!M?.id) throw new Error("Selecione uma turma para usar a agenda.");
    const current = await Cp(storage, M.id);
    await Xf(storage, M.id, current.filter((item) => item.id !== event.id));
    await loadHomeV2Agenda(M.id);
  };
  const commitmentsV2 = () => React.createElement(CommitmentsV2, {
    className: M?.nome || "Sua turma",
    events: homeAgendaState.items,
    status: homeAgendaState.status,
    error: homeAgendaState.error,
    offline: !homeIsOnline,
    onBack: _t,
    onRetry: () => loadHomeV2Agenda(M?.id),
    onSave: saveCommitmentV2,
    onDelete: deleteCommitmentV2,
    onTabChange: (tab) => xr({ inicio: "inicio", planejamento: "plano", turmas: "turmas-v2", arquivos: "biblioteca", mais: "mais" }[tab]),
  });
  const planningDayV2 = () => React.createElement(PlanningDayV2, {
    className: M?.nome || "Sua turma",
    dateKey: planningV2Date,
    plans: planningV2State.plans.filter((plan) => plan.dataKey === planningV2Date),
    loading: planningV2State.status === "loading",
    error: planningV2State.error,
    offline: !homeIsOnline,
    onBack: _t,
    onRetry: () => setPlanningV2Reload((value) => value + 1),
    onDateChange: (offset) => setPlanningV2Date((value) => shiftDateKey(value, offset)),
    onOpenPlan: (plan) => zt("plano-aula", { plano: plan, dataKey: plan.dataKey }),
    onCreatePlan: () => zt("plano-aula", { plano: newLessonPlan({ turmaId: M?.id, dataKey: planningV2Date }), dataKey: planningV2Date }),
    onTabChange: (tab) => xr({ inicio: "inicio", planejamento: "plano", turmas: "turmas-v2", arquivos: "biblioteca", mais: "mais" }[tab]),
  });
  const planningCalendarV2 = (mode) => React.createElement(PlanningCalendarV2, {
    className: M?.nome || "Sua turma",
    mode,
    dateKey: planningV2Date,
    plans: planningV2State.plans,
    loading: planningV2State.status === "loading",
    error: planningV2State.error,
    offline: !homeIsOnline,
    onBack: _t,
    onRetry: () => setPlanningV2Reload((value) => value + 1),
    onDateChange: (value) => setPlanningV2Date(value),
    onViewChange: (next) => zt(next === "day" ? "planejamento-dia" : next === "week" ? "planejamento-semana" : "planejamento-mes"),
    onOpenPlan: (plan) => zt("plano-aula", { plano: plan, dataKey: plan.dataKey }),
    onCreatePlan: () => zt("plano-aula", { plano: newLessonPlan({ turmaId: M?.id, dataKey: planningV2Date }), dataKey: planningV2Date }),
    onTabChange: (tab) => xr({ inicio: "inicio", planejamento: "plano", turmas: "turmas-v2", arquivos: "biblioteca", mais: "mais" }[tab]),
  });
  const classesV2 = () => React.createElement(ClassesV2, {
    classes: se,
    activeClass: M,
    students: Ka,
    onBack: () => kn("inicio"),
    onActivate: (item) => { void dr(item); },
    onOpenStudent: (student) => zt("perfil", student),
    onNewStudent: () => zt("novo-aluno"),
    onAttendance: () => zt("chamada"),
    onObservation: () => zt("registro-rapido"),
    onTabChange: (tab) => xr({ inicio: "inicio", planejamento: "plano", turmas: "turmas-v2", arquivos: "biblioteca", mais: "mais" }[tab]),
  });
  const classManagerV2 = () => React.createElement(ClassManagerV2, {
    classes: se,
    activeClass: M,
    onBack: _t,
    onAtualizar: Pa,
    onAtivar: dr,
    goTo: zt,
    onDirtyChange: pe,
  });
  const Ot = () => {
      (pe(!1), En());
    },
    wn = () => {
      const ae = ke;
      (pe(!1),
        Ce(!1),
        ye(null),
        (ae == null ? void 0 : ae.tipo) === "biblioteca-local"
          ? Ee == null || Ee()
          : (ae == null ? void 0 : ae.tipo) === "aba"
            ? kn(ae.tab)
            : (ae == null ? void 0 : ae.tipo) === "rota"
              ? Wr(ae.name, ae.data)
              : En());
    };
  ReactHooks.useEffect(() => {
    let ae;
    return (
      Vf.addListener("backButton", () => {
        var ar, nr;
        const qe = document.activeElement;
        if (
          qe &&
          qe !== document.body &&
          (ar = qe.matches) != null &&
          ar.call(qe, "input, textarea, select, [contenteditable='true']")
        ) {
          qe.blur();
          return;
        }
        if (Se) {
          (Ce(!1), ye(null));
          return;
        }
        const lt = document.querySelector(".modal-overlay");
        if (lt) {
          lt.click();
          return;
        }
        const Ft = document.querySelector(".bottom-sheet-panel");
        if (Ft) {
          (nr = Ft.parentElement) == null || nr.click();
          return;
        }
        if (D) {
          T(!1);
          return;
        }
        if (U) {
          R(null);
          return;
        }
        if (Ee) {
          J
            ? je({
                tipo: "biblioteca-local",
              })
            : Ee();
          return;
        }
        if (J) {
          v.length > 0
            ? je({
                tipo: "voltar",
              })
            : o === "home" &&
              f !== "inicio" &&
              je({
                tipo: "aba",
                tab: "inicio",
              });
          return;
        }
        if (v.length > 0) {
          En();
          return;
        }
        if (o === "wizard") {
          ce((sr) => sr + 1);
          return;
        }
        if (o === "home" && f !== "inicio") {
          kn("inicio");
          return;
        }
        Vf.exitApp();
      }).then((qe) => {
        ae = qe;
      }),
      () => {
        ae == null || ae.remove();
      }
    );
  }, [Ee, Se, o, J, v.length, D, f, U]);
  const qr = Re
      ? `screen-${Re.routeKey || `${Re.name}-${v.length}`}`
      : `tab-${f}`,
    Sn = {};
  const homeV2Data = createHomeV2Data({
    now: new Date(),
    perfil: yt,
    turma: M,
    planosDeHoje: we,
    alunos: Za,
    frequenciaHoje: yi,
    agenda: homeAgendaState.items,
    agendaStatus: homeAgendaState.status,
    agendaError: homeAgendaState.error,
    onRetry: () => loadHomeV2Agenda(),
    offline: !homeIsOnline,
  });
  let ht;
  return (
    Re?.name === "importar-alunos" && M
      ? (ht = React.createElement(StudentImportScreen, {
          onBack: _t,
          turmaId: M.id,
          onImported: rt,
          onDirtyChange: pe,
        }))
      : Re?.name === "academico" && M
        ? (ht = React.createElement(AcademicScreen, {
            onBack: _t,
            turma: M,
            alunos: Za,
            studentId: Re.data?.studentId,
            goTo: zt,
            onDirtyChange: pe,
          }))
        : Re?.name === "caderno" && M
          ? (ht = React.createElement(NotebookScreen, {
              onBack: _t,
              turma: M,
              alunos: Za,
              studentId: Re.data?.studentId,
              goTo: zt,
              onDirtyChange: pe,
            }))
          : Re?.name === "sequencias" && M
            ? (ht = React.createElement(SequenceScreen, {
                onBack: _t,
                turma: M,
                goTo: zt,
                onDirtyChange: pe,
              }))
            : Re?.name === "assinatura"
              ? (ht = React.createElement(SubscriptionV2, { onBack: _t, goTo: zt }))
              : Re?.name === "organizacao"
                ? (ht = React.createElement(OrganizationScreen, {
                    onBack: _t,
                    onDirtyChange: pe,
                  }))
                : (Re == null ? void 0 : Re.name) === "perfil"
                  ? (ht = React.createElement(StudentProfileV2, {
                      student: Re.data,
                      className: M?.nome,
                      loadObservations: loadStudentObservationsV2,
                      crianca: Re.data,
                      onBack: _t,
                      goTo: zt,
                      onExcluir: Wn,
                      onEditar: Ho,
                      turma: M,
                    }))
                    : (Re == null ? void 0 : Re.name) === "planejamento-semana"
                    ? (ht = planningCalendarV2("week"))
                    : (Re == null ? void 0 : Re.name) === "planejamento-mes"
                    ? (ht = planningCalendarV2("month"))
                    : (Re == null ? void 0 : Re.name) === "planejamento-dia"
                    ? (ht = planningDayV2())
                    : (Re == null ? void 0 : Re.name) === "compromissos"
                    ? (ht = commitmentsV2())
                    : (Re == null ? void 0 : Re.name) === "observacao"
                    ? (ht = observationV2({
                        selectedStudentId: Re.data?.id,
                        onChangeStudent: () => zt("registro-rapido"),
                        onDirtyChange: pe,
                      }))
                    : (Re == null ? void 0 : Re.name) === "biblioteca" ||
                        ["musica", "videos", "links"].includes(
                          Re == null ? void 0 : Re.name,
                        )
                      ? (ht = React.createElement(FilesV2, {
                          storage,
                          onBack: _t,
                          onDirtyChange: pe,
                          setBackHandler: Ie,
                          onOpenTrash: () => zt("lixeira"),
                          onRequestLocalBack: () => {
                            J
                              ? je({
                                  tipo: "biblioteca-local",
                                })
                              : Ee == null || Ee();
                          },
                        }))
                        : (Re == null ? void 0 : Re.name) === "relatorios"
                        ? (ht = React.createElement(ReportsV2, {
                            turma: M,
                            onBack: _t,
                            alunos: Za,
                            storage,
                            onGoToClasses: () => zt("gerenciar-turmas"),
                          }))
                          : (Re == null ? void 0 : Re.name) === "tema"
                          ? (ht = React.createElement(AppearanceV2, {
                              onBack: _t,
                              theme: Oe,
                              setTheme: Ei,
                              accentColor: te,
                              setAccentColor: Le,
                              systemDark: xe,
                            }))
                          : (Re == null ? void 0 : Re.name) === "bncc"
                            ? (ht = React.createElement(BnccV2, {
                                etapa: M?.etapa,
                                storage,
                                onBack: _t,
                                onOpenPlan: (skill) => zt("plano-aula", {
                                  dataKey: dateKey(),
                                  prefill: { bncc: { habilidades: [skill.codigo] } },
                                }),
                              }))
                            : (Re == null ? void 0 : Re.name) ===
                                "bncc-infantil"
                              ? (ht = React.createElement(BnccInfantilScreen, {
                                  onBack: _t,
                                }))
                              : (Re == null ? void 0 : Re.name) === "documentos"
                                ? (ht = React.createElement(DocumentsScreen, {
                                    onBack: _t,
                                  }))
                                : (Re == null ? void 0 : Re.name) ===
                                    "configuracoes"
                                  ? (ht = React.createElement(SettingsV2, {
                                      onBack: _t,
                                      goTo: zt,
                                      sonsAtivados: Ga,
                                      setSonsAtivados: Ca,
                                    }))
                                  : (Re == null ? void 0 : Re.name) ===
                                      "configuracoes-v1"
                                  ? (ht = React.createElement(SettingsScreen, {
                                      onBack: _t,
                                      goTo: zt,
                                      sonsAtivados: Ga,
                                      setSonsAtivados: Ca,
                                    }))
                                  : (Re == null ? void 0 : Re.name) ===
                                      "privacidade"
                                    ? (ht = React.createElement(PrivacyV2, {
                                        onBack: _t,
                                        goTo: zt,
                                      }))
                                    : (Re == null ? void 0 : Re.name) ===
                                        "ajuda-feedback"
                                      ? (ht = React.createElement(
                                          HelpFeedbackScreen,
                                          { onBack: _t },
                                        ))
                                      : (Re == null ? void 0 : Re.name) ===
                                          "termos"
                                        ? (ht = React.createElement(
                                            LegalScreen,
                                            { onBack: _t },
                                          ))
                                        : (Re == null ? void 0 : Re.name) ===
                                            "backup"
                                          ? (ht = React.createElement(
                                              BackupV2,
                                              {
                                                onBack: _t,
                                              },
                                            ))
                                          : (Re == null ? void 0 : Re.name) ===
                                              "tutoriais"
                                            ? (ht = React.createElement(
                                                TutorialsScreen,
                                                {
                                                  onBack: _t,
                                                  onIniciarTutorial: (ae) => {
                                                    (E([]), R(ae));
                                                  },
                                                },
                                              ))
                                            : (Re == null
                                                  ? void 0
                                                  : Re.name) === "lixeira"
                                              ? (ht = React.createElement(
                                                  TrashScreen,
                                                  {
                                                    onBack: _t,
                                                  },
                                                ))
                                              : (Re == null
                                                    ? void 0
                                                    : Re.name) ===
                                                  "planejamento-pedagogico"
                                                ? (ht = React.createElement(
                                                    PedagogicalPlanningScreen,
                                                    {
                                                      onBack: _t,
                                                    },
                                                  ))
                                                : (Re == null
                                                      ? void 0
                                                      : Re.name) ===
                                                    "perfil-professor"
                                                  ? (ht = React.createElement(
                                                      ProfileV2,
                                                      {
                                                        onBack: _t,
                                                        onConcluido: Ot,
                                                        perfil: yt || {},
                                                        onSalvar: ot,
                                                        onDirtyChange: pe,
                                                        onTabChange: (tab) =>
                                                          xr(
                                                            {
                                                              inicio: "inicio",
                                                              planejamento: "plano",
                                                              turmas: "turmas-v2",
                                                              arquivos: "biblioteca",
                                                              mais: "mais",
                                                            }[tab],
                                                          ),
                                                      },
                                                    ))
                                                  : (Re == null
                                                        ? void 0
                                                        : Re.name) ===
                                                      "gerenciar-turmas"
                                                    ? (ht = classManagerV2())
                                                    : (Re == null
                                                          ? void 0
                                                          : Re.name) ===
                                                        "notificacoes"
                                                      ? (ht =
                                                          React.createElement(
                                                            NotificationsV2,
                                                            {
                                                              onBack: _t,
                                                              onDirtyChange: pe,
                                                            },
                                                          ))
                                                      : [
                                                            "ferramentas",
                                                            "cronometro",
                                                            "alarmes",
                                                          ].includes(
                                                            Re == null
                                                              ? void 0
                                                              : Re.name,
                                                          )
                                                        ? (ht =
                                                            React.createElement(
                                                              ToolsV2,
                                                              {
                                                                onBack: _t,
                                                              },
                                                            ))
                                                        : (Re == null
                                                              ? void 0
                                                              : Re.name) ===
                                                            "novo-aluno"
                                                          ? (ht =
                                                              React.createElement(
                                                                NewStudentV2,
                                                                {
                                                                  onBack: _t,
                                                                  onConcluido:
                                                                    Ot,
                                                                  onDirtyChange:
                                                                    pe,
                                                                  onSalvo: Si,
                                                                  turmaId:
                                                                    M == null
                                                                      ? void 0
                                                                      : M.id,
                                                                },
                                                              ))
                                                          : (Re == null
                                                                ? void 0
                                                                : Re.name) ===
                                                              "plano-aula"
                                                            ? (ht =
                                                                React.createElement(
                                                                  LessonPlanV2,
                                                                  {
                                                                    etapa:
                                                                      M?.etapa,
                                                                    plano:
                                                                      (_a =
                                                                        Re.data) ==
                                                                      null
                                                                        ? void 0
                                                                        : _a.plano,
                                                                    prefill:
                                                                      (bt =
                                                                        Re.data) ==
                                                                      null
                                                                        ? void 0
                                                                        : bt.prefill,
                                                                    dataKey:
                                                                      (qn =
                                                                        Re.data) ==
                                                                      null
                                                                        ? void 0
                                                                        : qn.dataKey,
                                                                    turmaId:
                                                                      M == null
                                                                        ? void 0
                                                                        : M.id,
                                                                    onBack: _t,
                                                                    onConcluido:
                                                                      Ot,
                                                                    onDirtyChange:
                                                                      pe,
                                                                    onSalvar:
                                                                      ki,
                                                                    onExcluir:
                                                                      Qa,
                                                                  },
                                                                ))
                                                              : (Re == null
                                                                    ? void 0
                                                                    : Re.name) ===
                                                                "registro-rapido"
                                                              ? (ht = observationV2({
                                                                  onDirtyChange: pe,
                                                                  onSelectStudent: (studentId) => {
                                                                    const student = Ka.find((item) => item.id === studentId);
                                                                    student && zt("observacao", student);
                                                                  },
                                                                }))
                                                              : (Re == null
                                                                    ? void 0
                                                                    : Re.name) ===
                                                                "chamada"
                                                                ? (ht =
                                                                    frequencyV2())
                                                                : Re &&
                                                                    Sn[Re.name]
                                                                  ? (ht =
                                                                      React.createElement(
                                                                        z0,
                                                                        {
                                                                          titulo:
                                                                            Sn[
                                                                              Re
                                                                                .name
                                                                            ],
                                                                          onBack:
                                                                            _t,
                                                                        },
                                                                      ))
                                                                  : f ===
                                                                      "biblioteca"
                                                                    ? (ht =
                                                                        React.createElement(
                                                                          FilesV2,
                                                                          {
                                                                            storage,
                                                                            onBack: _t,
                                                                            onDirtyChange:
                                                                              pe,
                                                                           setBackHandler:
                                                                             Ie,
                                                                            onOpenTrash:
                                                                              () => zt("lixeira"),
                                                                            onRequestLocalBack:
                                                                              () => {
                                                                                J
                                                                                  ? je(
                                                                                      {
                                                                                        tipo: "biblioteca-local",
                                                                                      },
                                                                                    )
                                                                                  : Ee ==
                                                                                      null ||
                                                                                    Ee();
                                                                              },
                                                                          },
                                                                        ))
                                                                    : f ===
                                                                        "inicio"
                                                                      ? (ht =
                                                                          React.createElement(
                                                                            HomeV2,
                                                                            {
                                                                              data:
                                                                                homeV2Data,
                                                                              onAction:
                                                                                (action) => {
                                                                                  if (action === "attendance")
                                                                                    return Za.length
                                                                                      ? zt("chamada")
                                                                                      : zt("novo-aluno");
                                                                                  if (action === "observation")
                                                                                    return Za.length
                                                                                      ? zt("registro-rapido")
                                                                                      : zt("novo-aluno");
                                                                                  if (action === "commitments")
                                                                                    return zt("compromissos");
                                                                                  if (action === "plan")
                                                                                    return zt("planejamento-dia");
                                                                                  if (action === "profile")
                                                                                    return zt("perfil-professor");
                                                                                  return xr("plano");
                                                                                },
                                                                              onTabChange:
                                                                                (tab) =>
                                                                                  xr(
                                                                                    {
                                                                                      inicio: "inicio",
                                                                                      planejamento: "plano",
                                                                                      turmas: "turmas-v2",
                                                                                      arquivos: "biblioteca",
                                                                                      mais: "mais",
                                                                                    }[tab],
                                                                                  ),
                                                                            },
                                                                          ))
                                                                      : f ===
                                                                          "plano"
                                                                        ? (ht =
                                                                            React.createElement(
                                                                              PlanningScreen,
                                                                              {
                                                                                goTo: zt,
                                                                                turmaId:
                                                                                  M ==
                                                                                  null
                                                                                    ? void 0
                                                                                    : M.id,
                                                                                formDirty:
                                                                                  J,
                                                                                onDirtyChange:
                                                                                  pe,
                                                                                onAbrirPlano:
                                                                                  (
                                                                                    ae,
                                                                                    qe,
                                                                                  ) =>
                                                                                    zt(
                                                                                      "plano-aula",
                                                                                      {
                                                                                        plano:
                                                                                          ae,
                                                                                        dataKey:
                                                                                          qe,
                                                                                      },
                                                                                    ),
                                                                              },
                                                                            ))
                                                                        : f ===
                                                                            "turmas-v2"
                                                                          ? (ht = classesV2())
                                                                          : f ===
                                                                            "turma"
                                                                          ? (ht =
                                                                              React.createElement(
                                                                                ClassScreen,
                                                                                {
                                                                                  goTo: zt,
                                                                                  alunos:
                                                                                    Za,
                                                                                  carregando:
                                                                                    mt,
                                                                                  turma:
                                                                                    M,
                                                                                  onRenomear:
                                                                                    bi,
                                                                                  onExcluir:
                                                                                    Wn,
                                                                                  aba: oa,
                                                                                  setAba:
                                                                                    $n,
                                                                                  dataKey:
                                                                                    yn,
                                                                                  setDataKey:
                                                                                    vi,
                                                                                  pulso:
                                                                                    en,
                                                                                },
                                                                              ))
                                                                          : f ===
                                                                              "mais" &&
                                                                            (ht =
                                                                              React.createElement(
                                                                                MoreV2,
                                                                                {
                                                                                  goTo: zt,
                                                                                  onTabChange: (tab) =>
                                                                                    xr(
                                                                                      {
                                                                                        inicio: "inicio",
                                                                                        planejamento: "plano",
                                                                                        turmas: "turmas-v2",
                                                                                        arquivos: "biblioteca",
                                                                                        mais: "mais",
                                                                                      }[tab],
                                                                                    ),
                                                                                },
                                                                              )),
    React.createElement(
      "div",
      {
        className: "app-viewport",
        style: {
          display: "flex",
          justifyContent: "center",
          background: colors.primaryLight,
          minHeight: "100dvh",
          padding: "24px 0",
          fontFamily: "Nunito Sans, system-ui, sans-serif",
        },
      },
      React.createElement(
        "div",
        {
          className: "app-shell",
          style: {
            width: "100%",
            // O Poco X7 trabalha em uma largura CSS próxima de 393px; manter o
            // limite aqui deixa o preview de navegador fiel ao viewport Android
            // sem limitar telas menores no aparelho.
            maxWidth: 393,
            minHeight: "100dvh",
            background: colors.bg,
            borderRadius: 36,
            overflow: "hidden",
            position: "relative",
            boxShadow: `0 20px 50px ${colors.primary}2A`,
            border: "8px solid #1E1B26",
          },
        },
        o === "carregando" &&
          React.createElement("div", {
            style: {
              height: "100%",
              background: colors.bg,
            },
          }),
        o === "splash" &&
          React.createElement(SplashV2, {
            onDone: () => u(yt ? "home" : dt ? "wizard" : "onboarding"),
          }),
        o === "onboarding" &&
          React.createElement(OnboardingV2, {
            onDone: (plan) => {
              storage
                .set("assinatura:interesse", plan || "gratuito")
                .catch(() => {})
                .finally(() => u("wizard"));
            },
          }),
        o === "wizard" &&
          React.createElement(SetupWizardV2, {
            onDone: Vt,
            onBack: () => u("onboarding"),
            onFinish: Ja,
            backSignal: X,
          }),
        o === "home" &&
          React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "div",
              {
                key: qr,
                className: `screen-motion screen-${b} app-screen-scroll`,
                style: {
                  height: "100%",
                  overflowY: "auto",
                },
              },
              ht,
            ),
            !Re &&
              f !== "inicio" &&
              React.createElement(BottomNavigation, {
                tab: f,
                setTab: xr,
              }),
            U &&
              React.createElement(GuidedTour, {
                tutorialId: U,
                onClose: () => R(null),
                onChangeTab: xr,
              }),
            ge &&
              React.createElement(
                "div",
                {
                  className: "celebration-toast success-celebration",
                  role: "status",
                  "aria-live": "polite",
                  style: {
                    background: colors.white,
                    color: colors.dark,
                    borderColor: colors.green,
                  },
                },
                React.createElement(
                  "span",
                  {
                    "aria-hidden": "true",
                    style: {
                      background: colors.green,
                    },
                  },
                  React.createElement(Zr, {
                    size: 17,
                    color: "#173626",
                  }),
                ),
                ge,
              ),
            Se &&
              React.createElement(
                "div",
                {
                  className: "modal-overlay",
                  role: "presentation",
                  onClick: () => {
                    (Ce(!1), ye(null));
                  },
                },
                React.createElement(
                  "div",
                  {
                    className: "ui-dialog",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "titulo-descartar",
                    onClick: (ae) => ae.stopPropagation(),
                    style: {
                      background: colors.white,
                    },
                  },
                  React.createElement(
                    "div",
                    {
                      id: "titulo-descartar",
                      style: {
                        fontSize: 16,
                        fontWeight: 800,
                        color: colors.dark,
                      },
                    },
                    "Descartar alterações?",
                  ),
                  React.createElement(
                    "div",
                    {
                      style: {
                        fontSize: 14,
                        color: colors.gray,
                        lineHeight: 1.5,
                        marginTop: 6,
                      },
                    },
                    "O que foi preenchido nesta tela ainda não foi salvo.",
                  ),
                  React.createElement(
                    "div",
                    {
                      style: {
                        display: "flex",
                        gap: 8,
                        marginTop: 16,
                      },
                    },
                    React.createElement(
                      "button",
                      {
                        className: "press-fx touch-target",
                        autoFocus: !0,
                        onClick: () => {
                          (Ce(!1), ye(null));
                        },
                        style: {
                          flex: 1,
                          border: `1px solid ${colors.border}`,
                          background: colors.white,
                          color: colors.dark,
                          borderRadius: 14,
                          fontWeight: 700,
                        },
                      },
                      "Continuar editando",
                    ),
                    React.createElement(
                      "button",
                      {
                        className: "press-fx touch-target",
                        onClick: wn,
                        style: {
                          flex: 1,
                          border: "none",
                          background: colors.red,
                          color: "#fff",
                          borderRadius: 14,
                          fontWeight: 700,
                        },
                      },
                      "Descartar",
                    ),
                  ),
                ),
              ),
          ),
        React.createElement(ConfirmationDialog, null),
      ),
    )
  );
}
export { App };
