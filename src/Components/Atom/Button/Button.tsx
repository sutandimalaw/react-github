import React from "react";

type ButtonProps = Partial<
  HTMLButtonElement & {
    label: string;
    onClick: () => void;
    isLoading?: boolean;
    isDisable?: boolean;
  }
>;

const Button: React.FC<ButtonProps> = ({
  isDisable,
  label,
  onClick,
  isLoading,
  type,
}) => {
  return (
    <button
      type={type}
      disabled={isDisable}
      className="bg-cyan-600 disabled:cursor-not-allowed hover:bg-cyan-700 text-white py-2 px-2 border border-blue-700 rounded"
      onClick={onClick}
    >
      {isLoading ? <span className="loading loading-spinner"></span> : label}
    </button>
  );
};

export default Button;
