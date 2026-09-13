import {
  AlertCircle,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  FileText,
  FolderOpen,
  House,
  LoaderCircle,
  MoreHorizontal,
  Search,
  Users,
} from 'lucide-react';
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';
import { haptics, type HapticKind } from './haptics';
import { motionClass, useReducedMotion } from './motion';

export { haptics } from './haptics';
export { useReducedMotion } from './motion';
export { MOTION_TOKENS } from './motion';

type Icon = typeof House;

export function AppShell({ children, className = '', style, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`v2-app-viewport app-viewport ${className}`} style={style} {...props}>{children}</div>;
}

export function Screen({ children, variant = 'standard', className = '', ...props }: HTMLAttributes<HTMLElement> & { variant?: 'standard' | 'dense' | 'narrative' | 'calendar' }) {
  return <main className={`v2-screen v2-screen-${variant} ${className}`} {...props}>{children}</main>;
}

export function TopBar({ title, subtitle, onBack, trailing, className = '' }: { title: string; subtitle?: ReactNode; onBack?: () => void; trailing?: ReactNode; className?: string }) {
  return <header className={`v2-topbar ${className}`}>
    {onBack ? <IconButton label="Voltar" onClick={onBack}><ChevronLeft /></IconButton> : <span className="v2-topbar-spacer" aria-hidden="true" />}
    <div className="v2-topbar-copy"><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
    <div className="v2-topbar-trailing">{trailing}</div>
  </header>;
}

const navigation = [
  { key: 'inicio', label: 'Início', Icon: House },
  { key: 'plano', label: 'Planejamento', Icon: CalendarDays },
  { key: 'turma', label: 'Turmas', Icon: Users },
  { key: 'biblioteca', label: 'Arquivos', Icon: FolderOpen },
  { key: 'mais', label: 'Mais', Icon: MoreHorizontal },
] as const;

export function BottomNavigation({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) {
  const reduced = useReducedMotion();
  return <nav className="v2-bottom-nav" aria-label="Navegação principal">
    {navigation.map(({ key, label, Icon }) => {
      const active = tab === key;
      return <button key={key} type="button" className={motionClass(`v2-nav-item${active ? ' is-active' : ''}`, reduced)} aria-label={label} aria-current={active ? 'page' : undefined} onClick={() => { setTab(key); haptics.selection(); }}>
        <span className="v2-nav-icon"><Icon aria-hidden="true" /></span><span>{label}</span>
      </button>;
    })}
  </nav>;
}

export function IconButton({ label, children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return <button type="button" aria-label={label} className={`v2-icon-button ${className}`} {...props}>{children}</button>;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'; loading?: boolean; haptic?: HapticKind };
export function Button({ variant = 'primary', loading = false, haptic, children, className = '', disabled, onPointerDown, ...props }: ButtonProps) {
  return <button className={`v2-button v2-button-${variant} ${loading ? 'is-loading' : ''} ${className}`} disabled={disabled || loading} aria-busy={loading || undefined} onPointerDown={(event) => { if (haptic) haptics.trigger(haptic); onPointerDown?.(event); }} {...props}>
    {loading && <LoaderCircle className="v2-button-spinner" aria-hidden="true" />}{loading ? 'Salvando…' : children}
  </button>;
}

export function Field({ label, error, helper, icon: Icon, id, className = '', ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; helper?: string; icon?: Icon; className?: string }) {
  const describedBy = error ? `${id}-error` : helper ? `${id}-help` : undefined;
  return <div className={`v2-field ${className}`}>
    <label htmlFor={id}>{label}</label>
    <div className={`v2-field-control${error ? ' has-error' : ''}`}>{Icon && <Icon aria-hidden="true" />}<input id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy} {...props} /></div>
    {helper && !error && <span id={`${id}-help`} className="v2-field-helper">{helper}</span>}
    {error && <span id={`${id}-error`} className="v2-field-error" role="alert"><AlertCircle aria-hidden="true" />{error}</span>}
  </div>;
}

export function SearchField({ id = 'v2-search', label = 'Buscar', ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return <Field id={id} label={label} icon={Search} {...props} />;
}

export function SelectField({ label, id, children, className = '', ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; className?: string }) {
  return <div className={`v2-field ${className}`}><label htmlFor={id}>{label}</label><div className="v2-field-control"><select id={id} {...props}>{children}</select><ChevronRight className="v2-select-chevron" aria-hidden="true" /></div></div>;
}

export function SegmentedControl({ options, value, onChange, label }: { options: Array<{ value: string; label: string }>; value: string; onChange: (value: string) => void; label: string }) {
  const reduced = useReducedMotion();
  return <div className="v2-segmented" role="group" aria-label={label}>
    {options.map((option) => <button key={option.value} type="button" className={motionClass(option.value === value ? 'is-selected' : '', reduced)} aria-pressed={option.value === value} onClick={() => { onChange(option.value); haptics.selection(); }}>{option.label}</button>)}
  </div>;
}

export function Chip({ children, selected = false, tone = 'neutral', onClick }: { children: ReactNode; selected?: boolean; tone?: 'neutral' | 'success' | 'warning' | 'danger'; onClick?: () => void }) {
  const className = `v2-chip v2-chip-${tone}${selected ? ' is-selected' : ''}`;
  return onClick ? <button type="button" className={className} aria-pressed={selected} onClick={onClick}>{selected && <Check aria-hidden="true" />}{children}</button> : <span className={className}>{children}</span>;
}

export function Surface({ children, tone = 'plain', className = '', ...props }: HTMLAttributes<HTMLDivElement> & { tone?: 'plain' | 'soft' | 'accent' | 'tactile' }) {
  return <div className={`v2-surface v2-surface-${tone} ${className}`} {...props}>{children}</div>;
}

export function Row({ children, onClick, trailing, className = '', ...props }: HTMLAttributes<HTMLDivElement> & { onClick?: () => void; trailing?: ReactNode }) {
  const content = <><div className="v2-row-content">{children}</div>{trailing && <div className="v2-row-trailing">{trailing}</div>}</>;
  return onClick ? <button type="button" className={`v2-row v2-row-button ${className}`} onClick={onClick} {...props as ButtonHTMLAttributes<HTMLButtonElement>}>{content}</button> : <div className={`v2-row ${className}`} {...props}>{content}</div>;
}

export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return <div className="v2-section-header"><h2>{title}</h2>{action && <button type="button" onClick={onAction}>{action}<ChevronRight aria-hidden="true" /></button>}</div>;
}

export function LoadingState({ label = 'Carregando…' }: { label?: string }) { return <div className="v2-state v2-loading-state" role="status"><LoaderCircle aria-hidden="true" /><span>{label}</span></div>; }
export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) { return <div className="v2-state v2-empty-state"><div className="v2-state-mark"><FileText aria-hidden="true" /></div><h2>{title}</h2><p>{description}</p>{action}</div>; }
export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) { return <div className="v2-state v2-error-state" role="alert"><div className="v2-state-mark"><AlertCircle aria-hidden="true" /></div><p>{message}</p>{onRetry && <Button variant="secondary" onClick={onRetry}>Tentar novamente</Button>}</div>; }
export function SuccessState({ children }: { children: ReactNode }) { return <div className="v2-success-inline" role="status"><CircleCheck aria-hidden="true" />{children}</div>; }

export function AvatarMark({ name = 'Docente' }: { name?: string }) { return <span className="v2-avatar" aria-hidden="true">{name.trim().charAt(0).toUpperCase() || 'D'}</span>; }

export function DateBadge({ date }: { date: string }) { return <span className="v2-date-badge"><strong>{date.split(' ')[0]}</strong><small>{date.split(' ').slice(1).join(' ')}</small></span>; }

export function touchTargetStyle(): CSSProperties { return { minWidth: 48, minHeight: 48 }; }
