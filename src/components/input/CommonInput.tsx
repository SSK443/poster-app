import React,{useId,forwardRef} from 'react'
interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  label?:string,
  error?:string,
}

const CommonInput=forwardRef<HTMLInputElement,CommonInputProps>(function CommonInput({
  label,
  type="text",
  error,
  className="",
  ...props

},ref){
  const id=useId();
  return(
<div className='w-full'>
  {
    label&&(
      <label htmlFor={id} 
      className='text-gray-900 dark:text-gray-300 mb-1 block text-sm font-medium '>
        {label}
      </label>
    )
  }
  <input
   type={type} 
   ref={ref} 
   id={id}
   aria-invalid={!!error}
     className={`  w-full rounded-lg border px-3 py-2 text-sm
            bg-white text-gray-900
            dark:bg-slate-900 dark:text-gray-100
            border-gray-300 dark:border-slate-700
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${className} ${error?"border-red-500 focus:ring-red-500/40":"focus:border-blue-500"}`} {...props} />

            {error &&(<p className='mt-1 text-xs text-red-600'>
              {error}
            </p>)}

</div>
  )
})

CommonInput.displayName="CommonInput"

export default CommonInput