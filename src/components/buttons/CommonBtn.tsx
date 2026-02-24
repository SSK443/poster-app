import React from "react";

interface CommonBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"|"tertiary";
  size?: "sm" | "md" | "lg";

}

function CommonBtn({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: CommonBtnProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50";
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700",
      tertiary:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800",

  };

  const sizes={
     sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg:"px-5 py-3 text-base"

  } as const

  return <button type={type} className={`${base} ${variants[variant]} ${sizes[size]} ${className} `} {...rest}>
    {children}
  </button>;
}

export default CommonBtn;
