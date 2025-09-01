import React, { useState } from 'react'
import { createSpace } from '../../services/spaces';

import SpaceTypeSelect from './Select';
import displayError from '../../utils/error-toaster';

type Props = {
  communityID: string,
  ref: React.RefObject<HTMLDivElement | null>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSpaces: React.Dispatch<React.SetStateAction<RawShortSpace[]>>
}

// Popup to handle the creation of a new space
const NewSpace = ({communityID, setVisible, ref, setSpaces} : Props) => {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [type, setType] = useState<"chat" | "feed">("feed")
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleNewSpace = async () => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        const newSpace = await createSpace(communityID, name, type, desc);
        setSpaces((s) => [...s, newSpace])
        setVisible(false)
      } catch (error) {
        displayError(error)
      } finally {
        setIsSubmitting(false);
      }
    }
    return (
      <>
      <div ref={ref} className="fixed top-[10%] left-1/2 ml-[-16.6667%] w-1/3 max-h-3/4 bg-post py-8 px-6 z-40 rounded-2xl flex flex-col min-h-[600px] overflow-scroll">
        <div className='rounded-2xl mb-8'>
        <img className="w-full rounded-2xl" src="/assets/generic4.jpg" alt="generic image" />
        </div>
        <div className='font-bold font-condensed text-2xl text-left mb-6 text-text'>Create a new space</div>
        <div className='mb-4 h-10 w-full relative'>
        <label htmlFor="Name" className='top-[-14%] left-8 absolute text-xs z-10 bg-post px-1 text-lightText'>Name <span className='text-red-600'>*</span></label>
        <input className='border-1 border-lightText  w-full h-full rounded-2xl outline-none   px-4 py-4 text-[16px] text-text' type="text" id="Name" placeholder='Enter your Name' value={name} onChange={(e : React.ChangeEvent<HTMLInputElement>) => {setName(e.target.value)}}/></div>
        
        <div className='mb-4 h-10 w-full relative'>
          <label htmlFor="Description" className='top-[-14%] left-8 absolute text-xs z-10 bg-post px-1 text-lightText'>Description <span className='text-red-600'>*</span></label>
          <input className='border-1 border-lightText rounded-2xl w-full h-full px-4 outline-none py-4 text-[16px] text-text'type="text"  id="Description" placeholder='Enter your Description' value={desc} onChange={(e : React.ChangeEvent<HTMLInputElement>) => {setDesc(e.target.value)}}/></div>

          <SpaceTypeSelect type={type} setType={setType} ></SpaceTypeSelect>
        <div className='mt-auto flex justify-between'>
          <div className='py-2 px-4 rounded-2xl text-lightText cursor-pointer' onClick={() => {setVisible(false)}}>Cancel</div>
          <button className='py-2 px-3 rounded-2xl text-white bg-[#00338D] flex' onClick={handleNewSpace}>
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
          Create Space
          </button>
        </div>
      </div>
      <div className='fixed z-30 w-full h-full bg-black opacity-30 top-0 left-0'></div>
      </>
    )
}

export default NewSpace