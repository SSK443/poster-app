import React from "react";

interface CommonBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  text?: string;
  hoverBg?: string;
}

function CommonBtn({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  text = "text-white",
  hoverBg = "hover:bg-blue-700",
  className = "",
  ...rest
}: CommonBtnProps) {
  return (
    <button
      type={type}
      className={`${bgColor} ${text} ${hoverBg} px-4 py-2 font-bold rounded-lg ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default CommonBtn;
