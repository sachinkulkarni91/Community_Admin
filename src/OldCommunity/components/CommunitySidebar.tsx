import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewCommunity from '../../CommonComponents/NewCommunity'

type Props = {
  communities: {
    name: string,
    id: string,
    src: string,
  }[],
  onCommunitiesClick?: () => void
}

const CommunitySidebar = ({communities, onCommunitiesClick}: Props) => {

  const selectedStyle = 'flex items-center gap-4 text-xl text-[#FFFFFF] bg-[#01338D] rounded-xl cursor-pointer w-[40px] h-[40px] 2xl:w-[52px] 2xl:h-[52px] justify-center'
  const navigate = useNavigate()
  const [newCommunityDisplay, setNewCommunityDisplay] = useState(false)
  const newCommunityRef = useRef<HTMLDivElement | null>(null);
    
  // Handle closing of popups
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
    <div className='w-[64px] 2xl:w-[80px] h-full bg-primary py-8 flex flex-col gap-4 items-center overflow-auto'>
      <div className={selectedStyle} onClick={() => {
        if (typeof onCommunitiesClick === 'function') onCommunitiesClick();
        navigate('/feed');
      }}>
      <svg  className="w-[24px] 2xl:w-[32px] cursor-pointer" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M8.36 1.37l6.36 5.8-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71 6.35-5.8h.72zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43 4 6.063z"/></svg>
      </div>
      {
        communities.map((c) => <div key={c.id} className='flex items-center gap-4 text-xl text-[#FFFFFF] rounded-md' onClick={() => {navigate(`/community/${c.id}`)}}>
          <img className="w-[48px] 2xl:w-[60px]" src={c.src} alt="logo" />
          </div>)
      }
      <div className="border-lightText border-2 flex items-center py-2 px-2 rounded-xl border-dashed cursor-pointer w-[42px] h-[42px] 2xl:w-[52px] 2xl:h-[52px] text-text" onClick={() => {setNewCommunityDisplay(true)}}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[30px] 2xl:w-[32px]" viewBox="0 -960 960 960 " fill='currentColor'><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80z"/></svg>
      </div>
      {newCommunityDisplay && <NewCommunity setVisible={setNewCommunityDisplay} ref={newCommunityRef}></NewCommunity>}
    </div>
  )
}

export default CommunitySidebar