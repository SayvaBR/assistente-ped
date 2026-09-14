import { useId, type InputHTMLAttributes, type CSSProperties, type ChangeEventHandler, type ComponentType } from 'react';
import { Clock, type LucideIcon } from 'lucide-react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: LucideIcon;
};

export function Input({ label, icon: Icon, id, style, ...props }: InputProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  // Existing date fields already have an explicit label in their parent form.
  const visibleLabel = label ?? (!id ? props.placeholder : undefined);
  return <div className="input-group" style={style}>
    {visibleLabel && <label className="input-label" htmlFor={fieldId}>{visibleLabel}</label>}
    <div className="field-control input-container">
      {Icon && <Icon size={20} aria-hidden />}
      <input {...props} id={fieldId} />
    </div>
  </div>;
}

export function TimeInput({ placeholder, value, onChange, style }: {
  placeholder?: string; value?: string; onChange?: ChangeEventHandler<HTMLInputElement>; style?: CSSProperties;
}) {
  return <Input type="time" icon={Clock} label={placeholder ?? 'Horário'} value={value ?? ''} onChange={onChange} style={style} />;
}
