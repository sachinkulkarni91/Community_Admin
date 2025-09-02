import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';
import login from '../services/login';
import KPMG from './KPMG';
import { useTheme } from '../Contexts/ThemeContext';
import displayError from '../utils/error-toaster';

// Top navigation bar component
const Topbar = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();
  const profile = useRef<HTMLDivElement | null>(null);
  const [userPopup, setUserPopup] = useState(false)
  const {user, setUser} =  useUser()
  const {setTheme} = useTheme()

  const profilePhoto = user?.profilePhoto
  const profilePhotoUrl = typeof profilePhoto === 'string' && profilePhoto !== '' ? profilePhoto : '/assets/generic1.png';

  // Functions to aid with closing of popups
  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (profile.current && !profile.current.contains(event.target as Node)) {
          setUserPopup(false)
        }
      }
  
      if (userPopup) {
        document.addEventListener('mousedown', handleClickOutside)
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
  
    }, [userPopup])

    // Handle logout of user
    const handleLogout = async () => {
      try {
        await login.logout()
        setUser(null)
        navigate('/login')
      } catch (error) {
        displayError(error)
      }

    }

    // Change theme between dark mode and light mode
    const handleThemeSwap = () => {
      setTheme((t) => {
        if (t === 'dark') {
          return ''
        } else return 'dark'
      })
    }

  return (
  <div className='bg-primary h-[51px] lg:h-[68px] rounded-2xl flex justify-between py-2 px-3 lg:px-7 items-center relative'>
  <div className='w-[51px] lg:w-[82px] flex-shrink-0' onClick={() => {navigate('/feed')}}>
        <KPMG></KPMG>
      </div>
  
  {/* Search bar - hidden on mobile, shown on tablet and up */}
  <div className='hidden md:flex h-[31px] lg:h-[34px] flex-1 max-w-[340px] lg:max-w-[476px] mx-3 lg:mx-5 rounded-4xl px-3 lg:px-5 relative border-1 border-lightText text-lightText'>
        <input className='w-full h-full outline-none cursor-pointer text-sm lg:text-base' placeholder='Search'  value={search} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setSearch(event.target.value)}}>
        </input>
        <svg className='absolute top-1/2 right-3 lg:right-4 -translate-y-1/2 cursor-pointer text-text w-5 h-5 lg:w-6 lg:h-6' fill='currentColor' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580t75.5-184.5T380-840t184.5 75.5T640-580q0 44-14 83t-38 69l252 252zM380-400q75 0 127.5-52.5T560-580t-52.5-127.5T380-760t-127.5 52.5T200-580t52.5 127.5T380-400"/></svg>
      </div>

      <div className='flex gap-2 lg:gap-5 items-center text-text'>
        {/* Mobile search icon */}
        <div className='cursor-pointer md:hidden'>
          <svg className='w-4 h-4' fill='currentColor' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580t75.5-184.5T380-840t184.5 75.5T640-580q0 44-14 83t-38 69l252 252zM380-400q75 0 127.5-52.5T560-580t-52.5-127.5T380-760t-127.5 52.5T200-580t52.5 127.5T380-400"/></svg>
        </div>
        
        <div className='cursor-pointer'>
        <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M13.377 10.573a7.63 7.63 0 0 1-.383-2.38V6.195a5.115 5.115 0 0 0-1.268-3.446 5.138 5.138 0 0 0-3.242-1.722c-.694-.072-1.4 0-2.07.227-.67.215-1.28.574-1.794 1.053a4.923 4.923 0 0 0-1.208 1.675 5.067 5.067 0 0 0-.431 2.022v2.2a7.61 7.61 0 0 1-.383 2.37L2 12.343l.479.658h3.505c0 .526.215 1.04.586 1.412.37.37.885.586 1.412.586.526 0 1.04-.215 1.411-.586s.587-.886.587-1.412h3.505l.478-.658-.586-1.77zm-4.69 3.147a.997.997 0 0 1-.705.299.997.997 0 0 1-.706-.3.997.997 0 0 1-.3-.705h1.999a.939.939 0 0 1-.287.706zm-5.515-1.71l.371-1.114a8.633 8.633 0 0 0 .443-2.691V6.004c0-.563.12-1.113.347-1.616.227-.514.55-.969.969-1.34.419-.382.91-.67 1.436-.837.538-.18 1.1-.24 1.65-.18a4.147 4.147 0 0 1 2.597 1.4 4.133 4.133 0 0 1 1.004 2.776v2.01c0 .909.144 1.818.443 2.691l.371 1.113h-9.63v-.012z"/></svg>
        </div>
        
        {/* Settings icon - hidden on mobile */}
        <div className='cursor-pointer hidden sm:block'>
          <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M19.85 8.75l4.15.83v4.84l-4.15.83 2.35 3.52-3.43 3.43-3.52-2.35-.83 4.15H9.58l-.83-4.15-3.52 2.35-3.43-3.43 2.35-3.52L0 14.42V9.58l4.15-.83L1.8 5.23 5.23 1.8l3.52 2.35L9.58 0h4.84l.83 4.15 3.52-2.35 3.43 3.43-2.35 3.52zm-1.57 5.07l4-.81v-2l-4-.81-.54-1.3 2.29-3.43-1.43-1.43-3.43 2.29-1.3-.54-.81-4h-2l-.81 4-1.3.54-3.43-2.29-1.43 1.43L6.38 8.9l-.54 1.3-4 .81v2l4 .81.54 1.3-2.29 3.43 1.43 1.43 3.43-2.29 1.3.54.81 4h2l.81-4 1.3-.54 3.43 2.29 1.43-1.43-2.29-3.43.54-1.3zm-8.186-4.672A3.43 3.43 0 0 1 12 8.57 3.44 3.44 0 0 1 15.43 12a3.43 3.43 0 1 1-5.336-2.852zm.956 4.274c.281.188.612.288.95.288A1.7 1.7 0 0 0 13.71 12a1.71 1.71 0 1 0-2.66 1.422z"/></svg>
        </div>
        
        {/* Theme toggle - hidden on mobile */}
        <div className='cursor-pointer hidden sm:block' onClick={handleThemeSwap}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 -960 960 960" fill='currentColor'><path d="M480-120q-150 0-255-105T120-480t105-255 255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120m0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82m-10-270"/></svg>
        </div>
        
        <div className='cursor-pointer' onClick={() => {setUserPopup(true)}}>
          <img src={profilePhotoUrl} alt="" className='w-[24px] h-[24px] lg:w-[27px] lg:h-[27px] rounded-4xl'/>
        </div>
      </div>
      
      {userPopup && <div ref={profile} className='absolute w-[280px] lg:w-[300px] rounded-md bg-profile shadow-lg shadow-[rgba(0,0,0,0.1)] top-[90%] right-[2%] z-30 px-4 py-4 flex-col gap-6 flex'>
          <div className='flex gap-4 items-center'>
            <img  className="w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] rounded-4xl" src={profilePhotoUrl} alt="" />
            <div className='text-left'>
              <div className='font-semibold text-base lg:text-lg text-text'>{user?.name}</div>
              <div className='text-xs text-text'>Tech Enthusiast | Admin</div>
            </div>
          </div>
          <div className='flex justify-between font-bold gap-2'>
            <div className='text-sm px-3 py-1 border-lightText border-1 rounded-2xl text-lightText cursor-pointer flex-1 text-center'>View Profile</div>
            <div className='text-sm px-3 py-1 border-lightText border-1 rounded-2xl text-lightText cursor-pointer flex-1 text-center' onClick={handleLogout}>Logout</div>
          </div>
        </div>}
    </div>
  )
}

export default Topbar