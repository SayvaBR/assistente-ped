import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
export function Select({
  label,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  const id = useId();
  return (
    <label className="field-label" htmlFor={id}>
      {label}
      <select id={id} {...props}>
        {children}
      </select>
    </label>
  );
}
export function Notice({
  children,
  error = false,
}: {
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <p
      className={error ? "notice notice-error" : "notice"}
      role={error ? "alert" : "status"}
    >
      {children}
    </p>
  );
}
export function Card({ children }: { children: ReactNode }) {
  return <article className="ui-card stack">{children}</article>;
}
export function ActionBar({ children }: { children: ReactNode }) {
  return <div className="action-row">{children}</div>;
}
