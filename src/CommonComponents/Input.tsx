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
    <label htmlFor={id} className='top-[-14%] left-8 absolute text-xs z-10 bg-primary px-1'>{label} <span className='text-red-600'>*</span></label>
    <input className='border-1 border-text text-text  w-full h-full rounded-2xl  px-4 py-4 text-md' type={type} id={id} placeholder={placeholder} value={value} onChange={(e : React.ChangeEvent<HTMLInputElement>) => {setValue(e.target.value)}}/>
  </div>
  )
}

export default Input