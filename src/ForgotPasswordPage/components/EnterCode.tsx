import React from 'react'
import Input from '../../CommonComponents/Input'
import { Link } from 'react-router-dom'
type Props  = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  handleEnterCode: () => Promise<void>;
}

const EnterCode = ({code, setCode, handleEnterCode} : Props) => {
  return (
   <div className='w-3/4 max-w-[550px] bg-primary rounded-4xl flex flex-col text-lightText'> 
          <div className='text-3xl font-condensed font-bold text-text text-left mb-8'>Forgot your Password?</div>
          <Input label="Code" type="code" id="Code" placeholder="Enter your code" value={code} setValue={setCode} />


        <div className='flex items-center gap-16'>
           <div className='flex-2/3 text-left text-md'><Link to='/login' className='text-[#009FDA]'>Back to Login</Link></div>
          <button className="flex-1/3 max-w-[160px] text-sm text-white bg-KPMG py-2 px-2 rounded-3xl w-full flex justify-center items-center gap-1 transition-all duration-300 hover:bg-white hover:text-KPMG border-2 border-KPMG my-8" onClick={() => {handleEnterCode()}}>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-arrow-right-short"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 
            .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
          />
        </svg>
          Enter Code
        </button>
        </div>
       
        </div>
  )
}

export default EnterCode