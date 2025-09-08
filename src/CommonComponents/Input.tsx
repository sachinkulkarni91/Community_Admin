import React from 'react'
type Props = {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ label, type, id, placeholder, value, setValue }: Props) => {
  return (
   <div className='mb-4 h-12 w-full relative'>
    <label htmlFor={id} className='top-[-8px] left-3 absolute text-xs z-10 bg-post px-1 text-text'>{label} <span className='text-red-600'>*</span></label>
    <input 
      className='border border-gray-300 text-text bg-post w-full h-full rounded-lg px-3 py-2 text-sm placeholder:text-lightText focus:outline-none focus:ring-2 focus:ring-[#00338D] focus:border-transparent' 
      type={type} 
      id={id} 
      placeholder={placeholder} 
      value={value} 
      onChange={(e : React.ChangeEvent<HTMLInputElement>) => {setValue(e.target.value)}}
    />
  </div>
  )
}

export default Input