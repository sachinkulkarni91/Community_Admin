import React, { useState } from 'react'
import { useUser } from '../Contexts/UserContext'
import displayError from '../utils/error-toaster'
import { editCommunityByName, editCommunityPhotoByName } from '../services/communities'
import ImageUpload from './ImageUpload'
import Input from './Input'

type Props = {
  ref: React.RefObject<HTMLDivElement | null>
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  oldName: string
  oldDescription: string
}

const EditCommunity = ({ref, setVisible, oldName, oldDescription} : Props) => {
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
        newCommunity = await editCommunityPhotoByName(oldName, file);
      }
      if (name !== oldName || desc !== oldDescription) {
        newCommunity = await editCommunityByName(oldName, name, desc);
      }

      setUser((u) => {
      if (!u) return null;
      const newCommunities = [...u.communities, {
        name: newCommunity.name,
        id: newCommunity.id,
        profilePhoto: newCommunity.profilePhoto
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
    <div className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center">
      <div ref={ref} className="bg-post py-6 px-6 z-40 rounded-2xl flex flex-col w-1/3 max-w-md max-h-[90vh] shadow-2xl">
        <div className='rounded-2xl mb-6 h-20'>
          <img className="rounded-2xl object-cover h-full w-full" src="/assets/generic4.jpg" alt="generic image" />
        </div>
        <div className='font-bold font-condensed text-xl text-left mb-4 text-text'>Edit an existing community</div>
        
        <div className='mb-6'>
          <div className='text-sm text-text mb-3 font-medium text-left'>Profile Picture</div>
          <ImageUpload width="64" height="64" setFile={setFile} />
        </div>
        
        <Input id="Name" type="text" label="Name" placeholder='Enter community Name' value={name} setValue={setName} />
        <Input id="Description" type="text" label="Description" placeholder='Enter community Description' value={desc} setValue={setDesc} />

        <div className='mt-6 flex justify-between'>
          <div className='py-2 px-4 rounded-2xl text-lightText text-sm items-center cursor-pointer' onClick={() => {setVisible(false)}}>Cancel</div>
          <button className='py-2 px-4 rounded-2xl text-white bg-[#00338D] flex text-sm items-center' onClick={handleEditCommunity}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
    </div>
    </>
  )
}

export default EditCommunity