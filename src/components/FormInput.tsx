import React from "react";

interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  error,
}) => (
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="rounded border px-3 py-2"
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

export default FormInput;
