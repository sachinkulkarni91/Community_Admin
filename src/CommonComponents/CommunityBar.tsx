import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'

type Props  = {
  setNew : React.Dispatch<React.SetStateAction<boolean>>
}

// Display all the communities the user is part of
const CommunityBar = ({setNew} : Props) => {
  const navigate = useNavigate()

  const {user} = useUser();
    const [communities, setCommunities] = useState<{name: string, id: string, src: string}[]>([]);


    useEffect(() => {
      if (!user) return;
      console.log('user.communities:', user.communities);
      setCommunities(user.communities.map((c, index) => ({ name: c.name, id: c.id, src: `/assets/${index % 3 + 1}.png` })));
    }, [user]);

  return (
    <div className='flex flex-col pl-4 mb-2 pt-1'>
      {
        communities.map((c) => <div key={c.name} className='flex items-center h-[36px] pl-4 rounded-lg gap-4 text-lightText hover:bg-hov hover:text-text cursor-pointer text-[12px] truncate overflow-hidden whitespace-nowrap' onClick={() => {navigate(`/community/${c.id}`)}}>
          <img className="w-[24px]" src={c.src} alt="logo" />
          {c.name}</div>)
      }
      {user?.role === 'admin' && (
        <div className='border-dashed flex h-[36px] text-[12px] truncate overflow-hidden whitespace-nowrap gap-0 lg:gap-2 xl:gap-4 border-[#D0D0D0] border-2 px-4 md:px-2 py-2 rounded-lg hover:bg-[#00338D26] hover:border-solid hover:border-[#FFFFFF] cursor-pointer items-center mt-1 text-text' onClick={() => {setNew(true)}}>
          <svg className='text-logo' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -960 960 960" fill='currentColor'><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80z"/></svg>
          Create new community
        </div>
      )}
    </div>
  )
}

export default CommunityBar