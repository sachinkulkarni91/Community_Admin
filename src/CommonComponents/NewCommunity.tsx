import React, { useState } from 'react'
import { createCommunity, createCommunityCustom} from '../services/communities'
import { useUser } from '../Contexts/UserContext'
import displayError from '../utils/error-toaster'
import Input from './Input'
import ImageUpload from './ImageUpload'

type Props = {
  ref: React.RefObject<HTMLDivElement | null>
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

// Component to create a new community
const NewCommunity = ({ref, setVisible} : Props) => {
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [generic, setGeneric] = useState<number>(1)
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setUser} = useUser()

  // Add the community locally and sent an API request to create a new community
  const handleNewCommunity = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      let newCommunity = null;
      if (file) {
        console.log('customCommunity')
        newCommunity = await createCommunityCustom(name, desc, file);
      } else {
        newCommunity = await createCommunity(name, desc, generic);
      }

      setUser((u) => {
      if (!u) return null;
      const newCommunities = [...u.communities, {
        name: newCommunity.name,
        id: newCommunity.id,
        profilePhoto: newCommunity.profilePhoto,
        description: newCommunity.description,
        members: newCommunity.members,
      }];
      return {
        ...u,
        communities: newCommunities
      };
    });

      setVisible(false)
    } catch (error) {
      displayError(error)
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
    <div ref={ref} className="fixed top-1/2 translate-y-[-50%] left-1/2 ml-[-16.6667%] w-1/3 max-h-[1000px] bg-post py-8 px-6 z-40 rounded-2xl flex flex-col min-h-[500px] overflow-scroll">

      <div className='rounded-2xl mb-8 h-[10%]'>
      <img className="rounded-2xl object-contain h-full" src="/assets/generic4.jpg" alt="generic image" />
      </div>
      <div className='font-bold font-condensed text-2xl text-left mb-6 text-text'>Create a new community</div>
      <div className='flex gap-4 items-center mb-6'>
        <button className={generic === 1 ? 'w-16 h-16 flex items-center border-2 rounded-2xl p-2 border-[#6C16E9]' : 'w-16 h-16 flex items-center p-2'} onClick={() => {setGeneric(1)}}><img className='object-cover' src="/assets/1.png" alt="generic" /></button>
        <button className={generic === 2 ? 'w-16 h-16 flex items-center border-2 rounded-2xl p-2 border-[#6C16E9]' : 'w-16 h-16 flex items-center p-2'} onClick={() => {setGeneric(2)}}><img className='object-cover' src="/assets/2.png" alt="generic" /></button>
        <button className={generic === 3 ? 'w-16 h-16 flex items-center border-2 rounded-2xl p-2 border-[#6C16E9]' : 'w-16 h-16 flex items-center p-2'} onClick={() => {setGeneric(3)}}><img className='object-cover' src="/assets/3.png" alt="generic" /></button>
        <ImageUpload width="54" height="54" setFile={setFile} setGeneric={setGeneric}/>
      </div>
      <Input id="Name" type="text" label="Name" placeholder='Enter community Name' value={name} setValue={setName} />
      <Input id="Description" type="text" label="Description" placeholder='Enter community Description' value={desc} setValue={setDesc} />

      <div className='mt-8 flex justify-between'>
        <div className='py-2 px-4 rounded-2xl text-lightText text-[16px] items-center cursor-pointer' onClick={() => {setVisible(false)}}>Cancel</div>
        <button className='py-2 px-4 rounded-2xl text-white bg-[#00338D] flex   text-[16px] items-center' onClick={handleNewCommunity}>
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
        Create Community
        </button>
      </div>
    </div>
    <div className='fixed z-30 w-full h-full bg-black opacity-30 top-0 left-0'></div>
    </>
  )
}

export default NewCommunity