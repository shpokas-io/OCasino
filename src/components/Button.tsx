import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, loading, ...props }) => {
  return (
    <button
      {...props}
      className="rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={loading || props.disabled}
    >
      {loading ? "Please wait..." : text}
    </button>
  );
};

export default Button;
