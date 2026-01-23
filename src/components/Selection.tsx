import React, {  useId } from 'react'
interface SelectionProps{
  label?:string,
  options:string[],
  className?:string
}

function Selection({
  className="",
  label,
  options,
  ...props
}: SelectionProps,ref:React.Ref<HTMLSelectElement>) {
  const id=useId();
  return (
    <div className='w-full'>
      {
        label&& <label htmlFor={id} className={`block mb-2 font-medium `} >{label}</label>

      }
      <select name="" id={id} ref={ref} {...props} className={`outline-none py-3 px-2 bg-white text-black text-lg rounded-lg font-semibold ${className}`}>
        {options?.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Selection)
