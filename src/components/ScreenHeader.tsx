import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';
export function ScreenHeader({title, subtitle, onBack, action}: {title:string; subtitle?:ReactNode; onBack?:()=>void; action?:ReactNode}) {
  return <header className="app-header"><div className="screen-heading">
    {onBack && <button className="icon-button press-fx back-button" aria-label="Voltar" onClick={onBack}><ChevronLeft size={24}/></button>}
    <div className="screen-heading-copy"><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
    {action && <div className="header-action">{action}</div>}
  </div></header>;
}
