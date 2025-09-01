import { useEffect, useRef, useState } from "react"
import { useUser } from "../../Contexts/UserContext"
import EditProfilePopup from "./EditProfilePopup"

// Component to display and edit user profile information
const EditProfile = () => {
  const {user} = useUser()
  const [edit, setEdit] = useState<boolean>(false);
  const editRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

      const handleClickOutside = (event: MouseEvent) => {
        if (editRef.current && !editRef.current.contains(event.target as Node)) {
          setEdit(false)
        }
      }
  
      if (edit) {
        document.addEventListener('mousedown', handleClickOutside)
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
  
    }, [edit])

  return (
    <div className='bg-post w-[324px] h-fit rounded-lg flex flex-col text-text p-4 gap-2 shrink-0'>
      <div className='font-medium text-[16px] text-left'>About</div>
      <div className='text-[10px] text-left'>Tech Enthusiast | Admin</div>
      <div className='text-[10px] text-left'>Member since: 12/07/2025</div>
      <div className='text-[10px] text-left'>{`Email: ${user?.email}`}</div>
      <div onClick={() => {setEdit(true)}} className='mt-2 flex gap-2 border-1 rounded-2xl py-2 px-1 justify-center items-center border-logo text-logo text-[10px] max-w-[104px] cursor-pointer'>
        <svg className='text-logo' width="16" height="16" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_1_6467)">
          <path d="M15.1667 6.9621C15.704 7.57143 16 8.3541 16 9.16676V12.5001C16 14.3381 14.5047 15.8334 12.6667 15.8334H3.33333C1.49533 15.8334 0 14.3381 0 12.5001V9.16676C0 7.32876 1.49533 5.83343 3.33333 5.83343H6C6.36867 5.83343 6.66667 6.1321 6.66667 6.5001C6.66667 6.8681 6.36867 7.16676 6 7.16676H3.33333C2.23067 7.16676 1.33333 8.0641 1.33333 9.16676V12.5001C1.33333 13.6028 2.23067 14.5001 3.33333 14.5001H12.6667C13.7693 14.5001 14.6667 13.6028 14.6667 12.5001V9.16676C14.6667 8.67943 14.4887 8.20943 14.1667 7.8441C13.9233 7.5681 13.9493 7.14676 14.226 6.90276C14.5013 6.6601 14.9227 6.6861 15.1667 6.9621ZM3.33333 10.8334C3.33333 11.3854 3.78133 11.8334 4.33333 11.8334C4.88533 11.8334 5.33333 11.3854 5.33333 10.8334C5.33333 10.2814 4.88533 9.83343 4.33333 9.83343C3.78133 9.83343 3.33333 10.2814 3.33333 10.8334ZM7.66667 11.8334C8.21867 11.8334 8.66667 11.3854 8.66667 10.8334C8.66667 10.2814 8.21867 9.83343 7.66667 9.83343C7.11467 9.83343 6.66667 10.2814 6.66667 10.8334C6.66667 11.3854 7.11467 11.8334 7.66667 11.8334ZM8 7.83343V6.7761C8 6.0641 8.27733 5.3941 8.78133 4.89076L12.586 1.0861C13.366 0.306099 14.634 0.306099 15.414 1.0861C15.7913 1.46343 16 1.9661 16 2.5001C16 3.0341 15.7913 3.53677 15.414 3.91477L11.6093 7.71943C11.106 8.22276 10.436 8.50076 9.724 8.50076H8.66667C8.298 8.50076 8 8.2021 8 7.8341V7.83343ZM9.33333 7.16676H9.724C10.08 7.16676 10.4147 7.0281 10.6667 6.7761L14.4713 2.97143C14.5973 2.84543 14.6667 2.6781 14.6667 2.5001C14.6667 2.3221 14.5973 2.15477 14.4713 2.02877C14.2107 1.7681 13.7893 1.76877 13.5287 2.02877L9.724 5.83343C9.476 6.0821 9.33333 6.42543 9.33333 6.7761V7.16676Z" fill="currentColor"/>
          </g>
        </svg>
        Edit Profile
      </div>
      {edit && <EditProfilePopup ref={editRef} setVisible={setEdit}></EditProfilePopup>}
    </div>
  )
}

export default EditProfile