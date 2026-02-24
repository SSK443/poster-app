import React from "react";
// This component is used to wrap the content of the page and provide a consistent layout
function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-full mx-auto px-4 max-w-7xl  ${className}`}>
      {children}
    </div>
  );
}

export default Container;
