import React, { useEffect, useRef, useState } from 'react'
import NewCommunity from './NewCommunity'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'
type Props  = {
  selected: number,
  setSelected: React.Dispatch<React.SetStateAction<number>>,
  sidebarOpen?: boolean,
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

// Sidebar component to aid with navigation
const Sidebar = ({selected, setSelected, sidebarOpen, setSidebarOpen} : Props) => {
  const nonSelectedStyle = 'flex items-center h-[44px] py-[10px] gap-2 xl:gap-4 px-6 text-sm text-gray-800 rounded-md cursor-pointer'
  const selectedStyle = 'flex items-center h-[44px] py-[10px] gap-2 xl:gap-4 px-6 text-sm text-white bg-[#01338D] rounded-md cursor-pointer'
  const [newCommunityDisplay, setNewCommunityDisplay] = useState(false)
  const [showCommunities, setShowCommunities] = useState(false)
  const newCommunityRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Check if we're on a community page and get the community ID
  const isOnCommunityPage = location.pathname.startsWith('/community/')
  const currentCommunityId = isOnCommunityPage ? location.pathname.split('/community/')[1] : null
  
  // Handle clicking outside a new community
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (newCommunityRef.current && !newCommunityRef.current.contains(event.target as Node)) {
        setNewCommunityDisplay(false)
      }
    }

    if (newCommunityDisplay) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }

  }, [newCommunityDisplay])

  return (
    <>
    {/* Mobile overlay */}
    {sidebarOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
        onClick={() => setSidebarOpen?.(false)}
      />
    )}
    
    {/* Sidebar */}
    <div className={`
      rounded-lg h-full bg-primary py-4 px-1.5 flex flex-col overflow-auto transition-all duration-300 ease-in-out
      ${sidebarOpen ? 'fixed left-4 top-20 bottom-4 z-50 w-[264px] lg:relative lg:left-0 lg:top-0 lg:bottom-0 lg:z-0' : 'hidden lg:flex lg:w-[264px]'}
      md:w-[220px] lg:w-[264px] xl:w-[275px]
    `}>
      <div className={selected == 1 && !isOnCommunityPage ? selectedStyle : nonSelectedStyle} onClick={() => {setSelected(1); navigate("/feed"); setSidebarOpen?.(false)}}>
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill='currentColor'><path d="M240-280h280v-80H240zm400 0h80v-400h-80zM240-440h280v-80H240zm0-160h280v-80H240zm-80 480q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120zm0-80h640v-560H160zm0 0v-560z"/></svg>
        <span className="hidden sm:inline">My Feed</span>
      </div>
      <div className={selected == 2 || isOnCommunityPage ? selectedStyle : nonSelectedStyle} onClick={() => {setShowCommunities(!showCommunities)}}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.75 6C3.75 4.75736 4.75736 3.75 6 3.75H8.25C9.49264 3.75 10.5 4.75736 10.5 6V8.25C10.5 9.49264 9.49264 10.5 8.25 10.5H6C4.75736 10.5 3.75 9.49264 3.75 8.25V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.75 15.75C3.75 14.5074 4.75736 13.5 6 13.5H8.25C9.49264 13.5 10.5 14.5074 10.5 15.75V18C10.5 19.2426 9.49264 20.25 8.25 20.25H6C4.75736 20.25 3.75 19.2426 3.75 18V15.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.5 6C13.5 4.75736 14.5074 3.75 15.75 3.75H18C19.2426 3.75 20.25 4.75736 20.25 6V8.25C20.25 9.49264 19.2426 10.5 18 10.5H15.75C14.5074 10.5 13.5 9.49264 13.5 8.25V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.5 15.75C13.5 14.5074 14.5074 13.5 15.75 13.5H18C19.2426 13.5 20.25 14.5074 20.25 15.75V18C20.25 19.2426 19.2426 20.25 18 20.25H15.75C14.5074 20.25 13.5 19.2426 13.5 18V15.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="hidden sm:inline">Communities</span>
        <svg className={`w-3 h-3 ml-auto transition-transform duration-200 ${showCommunities || isOnCommunityPage ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </div>
      
      {/* Communities Dropdown */}
      {(showCommunities || isOnCommunityPage) && (
        <div className="ml-4 space-y-1">
          {user?.communities && user.communities.length > 0 ? (
            user.communities.map((community) => (
              <div 
                key={community.id}
                className={`flex items-center h-[38px] py-2 gap-2 px-4 text-xs rounded-md cursor-pointer transition-colors ${
                  currentCommunityId === community.id 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => {
                  navigate(`/community/${community.id}`);
                  setSidebarOpen?.(false);
                }}
              >
                <img 
                  src={community.profilePhoto || '/assets/generic1.png'} 
                  alt={community.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="hidden sm:inline truncate">{community.name}</span>
              </div>
            ))
          ) : (
            <div className="flex items-center h-[38px] py-2 gap-2 px-4 text-xs text-gray-400">
              <span className="hidden sm:inline">No communities joined</span>
            </div>
          )}
          <div 
            className="flex items-center h-[38px] py-2 gap-2 px-4 text-xs text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer transition-colors"
            onClick={() => {
              navigate("/communities");
              setSidebarOpen?.(false);
            }}
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <span className="hidden sm:inline">View All Communities</span>
          </div>
        </div>
      )}
      <div className={selected == 3 ? selectedStyle : nonSelectedStyle} onClick={() => {setSelected(3); setSidebarOpen?.(false)}}>
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
        </svg>
        <span className="hidden sm:inline">Events</span>
      </div>
      <div className={selected == 4 ? selectedStyle : nonSelectedStyle} onClick={() => {setSelected(4); setSidebarOpen?.(false)}}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.3404 15.8398C9.65153 15.7803 8.95431 15.75 8.25 15.75H7.5C5.01472 15.75 3 13.7353 3 11.25C3 8.76472 5.01472 6.75 7.5 6.75H8.25C8.95431 6.75 9.65153 6.71966 10.3404 6.66022M10.3404 15.8398C10.5933 16.8015 10.9237 17.7317 11.3246 18.6234C11.5721 19.1738 11.3842 19.8328 10.8616 20.1345L10.2053 20.5134C9.6539 20.8318 8.9456 20.6306 8.67841 20.0527C8.0518 18.6973 7.56541 17.2639 7.23786 15.771M10.3404 15.8398C9.95517 14.3745 9.75 12.8362 9.75 11.25C9.75 9.66379 9.95518 8.1255 10.3404 6.66022M10.3404 15.8398C13.5 16.1124 16.4845 16.9972 19.1747 18.3749M10.3404 6.66022C13.5 6.3876 16.4845 5.50283 19.1747 4.12509M19.1747 4.12509C19.057 3.74595 18.9302 3.37083 18.7944 3M19.1747 4.12509C19.7097 5.84827 20.0557 7.65462 20.1886 9.51991M19.1747 18.3749C19.057 18.7541 18.9302 19.1292 18.7944 19.5M19.1747 18.3749C19.7097 16.6517 20.0557 14.8454 20.1886 12.9801M20.1886 9.51991C20.6844 9.93264 21 10.5545 21 11.25C21 11.9455 20.6844 12.5674 20.1886 12.9801M20.1886 9.51991C20.2293 10.0913 20.25 10.6682 20.25 11.25C20.25 11.8318 20.2293 12.4087 20.1886 12.9801" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="hidden sm:inline">Announcements</span>
      </div>
      {newCommunityDisplay && <NewCommunity setVisible={setNewCommunityDisplay} ref={newCommunityRef}></NewCommunity>}
    </div>
    </>
  )
}

export default Sidebar