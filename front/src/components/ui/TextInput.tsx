import React from "react";

type TextInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  error?: string;
  name?: string;
  autoComplete?: string;
};

export function TextInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  name,
  autoComplete,
}: TextInputProps) {
  return (
    <label className="flex flex-col gap-1">
      {label ? (
        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</span>
      ) : null}
      <input
        className={[
          "w-full rounded-lg border px-3 py-2 text-sm text-slate-900 dark:text-slate-100",
          "border-slate-300 bg-white dark:bg-slate-900",
          "focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600",
          error ? "border-red-500 focus:ring-red-300 dark:border-red-500 dark:focus:ring-red-300" : "",
        ].join(" ")}
        name={name}
        autoComplete={autoComplete}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {error ? <span className="text-xs text-red-600 dark:text-red-500">{error}</span> : null}
    </label>
  );
}


