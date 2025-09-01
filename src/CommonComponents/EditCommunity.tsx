import React, { useState } from 'react'
import { useUser } from '../Contexts/UserContext'
import displayError from '../utils/error-toaster'
import { editCommunity, editCommunityPhoto } from '../services/communities'
import ImageUpload from './ImageUpload'
import Input from './Input'

type Props = {
  ref: React.RefObject<HTMLDivElement | null>
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id: string
  oldName: string
  oldDescription: string
}

const EditCommunity = ({ref, setVisible, id, oldName, oldDescription} : Props) => {
  const [name, setName] = useState(oldName)
  const [desc, setDesc] = useState(oldDescription)
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setUser} = useUser()

  // Add the community locally and sent an API request to create a new community
  const handleEditCommunity = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      let newCommunity = null;
      if (file) {
        newCommunity = await editCommunityPhoto(id, file);
      }
      if (name !== oldName || desc !== oldDescription) {
        newCommunity = await editCommunity(id, name, desc);
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
    <div ref={ref} className="fixed top-[20%] left-1/2 ml-[-16.6667%] w-1/3 max-h-[1000px] bg-post py-8 px-6 z-40 rounded-2xl flex flex-col min-h-[500px] overflow-scroll">

      <div className='rounded-2xl mb-8'>
      <img className="w-full rounded-2xl" src="/assets/generic4.jpg" alt="generic image" />
      </div>
      <div className='font-bold font-condensed text-2xl text-left mb-6 text-text'>Edit an existing community</div>
      <div className='flex gap-4 items-center mb-6'>
        <ImageUpload width="54" height="54" setFile={setFile}/>
      </div>
      <Input id="Name" type="text" label="Name" placeholder='Enter your Name' value={name} setValue={setName} />
      <Input id="Description" type="text" label="Description" placeholder='Enter your Description' value={desc} setValue={setDesc} />

      <div className='mt-8 flex justify-between'>
        <div className='py-2 px-4 rounded-2xl text-lightText text-[16px] items-center cursor-pointer' onClick={() => {setVisible(false)}}>Cancel</div>
        <button className='py-2 px-4 rounded-2xl text-white bg-[#00338D] flex   text-[16px] items-center' onClick={handleEditCommunity}>
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
        Edit Community
        </button>
      </div>
    </div>
    <div className='fixed z-30 w-full h-full bg-black opacity-30 top-0 left-0'></div>
    </>
  )
}

export default EditCommunity