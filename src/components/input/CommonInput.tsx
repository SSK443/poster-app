import React, { useId } from "react";

interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const CommonInput = React.forwardRef<HTMLInputElement, CommonInputProps>(
  function CommonInput({ label, type = "text", className = "", ...rest }, ref) {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className={`block mb-2 font-medium ${className}`}>
            {label}
          </label>
        )}

        <input
          id={id}
          ref={ref}
          type={type}
          className={`outline-none py-3 px-2 bg-white text-black text-lg rounded-lg font-semibold ${className}`}
          {...rest}
        />
      </div>
    );
  },
);

export default CommonInput;
