import { forwardRef, useId } from "react";

type OptionsType = string | { label: string; value: string };

interface SelectionProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: OptionsType[];
  className?: string;
  label?: string;
}

const Selection = forwardRef<HTMLSelectElement, SelectionProps>(
  ({ label, options = [], className = "", ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full space-y-1">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {label}
          </label>
        )}

        <select
          id={id}
          ref={ref}
          className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition 
          focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 
          disabled:cursor-not-allowed disabled:bg-gray-100 
          dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 
          ${className}`}
          {...props}
        >
          {options.map((option) =>
            typeof option === "string" ? (
              <option key={option} value={option}>
                {option}
              </option>
            ) : (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          )}
        </select>
      </div>
    );
  }
);

Selection.displayName = "Selection";

export default Selection;
