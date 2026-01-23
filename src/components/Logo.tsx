import React from "react";

interface LogoProps {
  width?: string;
}

function Logo({ width = "100px" }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Logo"
      style={{ width }}
      className="object-contain"
    />
  );
}

export default Logo;
