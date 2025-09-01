import React, { useState } from 'react'
import ImageUpload from '../../CommonComponents/ImageUpload'

import { toast } from 'react-toastify'
import { editUser, uploadProfilePhoto } from '../../services/user'
import { useUser } from '../../Contexts/UserContext'
import displayError from '../../utils/error-toaster'

type Props = {
  ref: React.RefObject<HTMLDivElement | null>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

// Popup to edit user profile information including profile picture
const EditProfilePopup = ({ref, setVisible} : Props) => {
  const {user, setUser} = useUser()
  if (!user) throw Error("user not found")
  const [file, setFile] = useState<File | null>(null)
  const [email, setEmail] = useState<string>(user?.email)
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')

  const handleSubmit = async () => {
    try {
      if (password != confirm) {
        toast.error("Your passwords do not match")
        return
      }
      if (file) {
        const returnedUser = await uploadProfilePhoto(file)
        setUser((u) => {
          if (!u) return null
          return {...u, profilePhoto: returnedUser.profilePhoto}
        })
      }
      const newUser = {email: '', password: password}
      if (email != user.email) {
        newUser.email = email;
      } 

      if ((password !== '' || email !== '') && (password === '' && email !== user.email)) {
        const userInfo = await editUser(email, password) 
        setUser({
          name: userInfo.name,
          username: userInfo.username,
          email: userInfo.email,
          id: userInfo.id,
          role: userInfo.role,
          communities: userInfo.joinedCommunities,
          profilePhoto: userInfo.profilePhoto
        })
      }

    } catch (error) {
      displayError(error)
    } finally {
      setVisible(false)
    }
  }

  return (
    <>
      <div ref={ref} className='fixed w-[496px] h-[576px] bg-post z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 text-left' >
        <div className='text-text text-[24px] font-bold font-condensed mb-6' >Edit Profile</div>
        <div className='w-[440px] border-lightText text-text text-[16px] h-[56px] border-1 rounded-lg relative mb-6' >
          <label htmlFor="Email" className='top-[-14%] left-8 absolute text-xs z-10 bg-post px-1 text-lightText'>Email</label>
          <input id="Email" className='w-full h-full outline-none px-4 py-2' type="text" placeholder='Email' value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}}/>
        </div>
        <div className='text-text text-[20px] font-bold font-condensed mb-6' >Profile Picture</div>
       <ImageUpload width="64" height="64" setFile={setFile}></ImageUpload>
        <div className='text-text text-[20px] font-bold font-condensed mt-6 mb-6' >New Password</div>
        <div className='w-[440px] border-lightText text-text text-[16px] h-[56px] border-1 rounded-lg relative mb-6' >
          <label htmlFor="NewPassword" className='top-[-14%] left-8 absolute text-xs z-10 bg-post px-1 text-lightText'>New Password</label>
          <input id="NewPassword" className='w-full h-full outline-none px-4 py-2' type="text" placeholder='Change your password' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}}/>
        </div>
        <div className='w-[440px] border-lightText text-text text-[16px] h-[56px] border-1 rounded-lg relative mb-6' >
          <label htmlFor="ConfirmPassword" className='top-[-14%] left-8 absolute text-xs z-10 bg-post px-1 text-lightText'>Confirm New Password</label>
          <input id="ConfirmPassword" className='w-full h-full outline-none px-4 py-2' type="text" placeholder='Change your password' value={confirm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setConfirm(e.target.value)}}/>
        </div>
        <div className='justify-between flex' >
          <div className='py-2 rounded-2xl text-lightText cursor-pointer text-left' onClick={() => {setVisible(false)}}>Cancel</div>
          <button className='py-2 px-3 rounded-2xl text-white bg-[#00338D] flex' onClick={handleSubmit}>
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
          Save Changes
          </button>
        </div>
      </div>
      <div className='fixed w-full h-full bg-black opacity-30 z-30 top-0 left-0' ></div>
    </>
  )
}

export default EditProfilePopup