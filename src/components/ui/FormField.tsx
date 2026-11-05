import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  label: ReactNode;
  error?: string;
  required?: boolean;
  hint?: ReactNode;
  className?: string;
  /** A single input/select/textarea; receives id, aria-invalid, aria-describedby. */
  children: ReactElement<Record<string, unknown>>;
}

/** Label + control + error, wired up for screen readers. */
export const FormField = ({
  id,
  label,
  error,
  required,
  hint,
  className = '',
  children,
}: FormFieldProps) => {
  const errorId = `${id}-error`;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [error ? errorId : undefined, hintId].filter(Boolean).join(' ') || undefined;

  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
        'aria-required': required || undefined,
      })
    : children;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-semibold text-slate-700 uppercase mb-1">
        {label}
        {required && (
          <span className="text-vred" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {control}
      {hint && (
        <p id={hintId} className="mt-1 text-[11px] text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1 text-xs font-medium text-vred">
          {error}
        </p>
      )}
    </div>
  );
};
