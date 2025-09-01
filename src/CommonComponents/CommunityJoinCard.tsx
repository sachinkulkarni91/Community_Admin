import { useState } from 'react'

type Props = {
  id: string,
  name: string,
  handleJoin: (id: string) => void
}
const CommunityJoinCard = ({id, name, handleJoin} : Props) => {
  const [joined, setJoined] = useState(false)
  return (
   <div className='flex items-center justify-between' key={id}>
          <div className='flex gap-3 md:gap-4 items-center'>
            <img className='w-[28px] h-[28px] md:w-[32px] md:h-[32px]' src="/assets/2.png" alt="community logo" />
            <div className='text-left'>
              <div className='text-[13px] md:text-[14px] font-bold max-w-[80px] lg:max-w-[120px] xl:max-w-[150px] text-nowrap overflow-hidden text-ellipsis text-text'>{name}</div>
              <div className='text-[9px] md:text-[10px] text-text'>1200+ members</div>
            </div>
          </div>
          {!joined ? <div className='border-1 border-lightText px-2 md:px-3 py-1.5 md:py-2 text-[11px] md:text-[12px] rounded-4xl flex gap-1 md:gap-2 items-center cursor-pointer text-text hover:bg-gray-50 transition-colors' onClick={() => {handleJoin(id); setJoined(true)}}>
            <svg className='w-[14px] h-[14px] md:w-[16px] md:h-[16px]' viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M14 7v1H8v6H7V8H1V7h6V1h1v6h6z"/></svg>
            Join
          </div> :
           <div className='border-1 border-green-500 px-2 md:px-3 py-1.5 md:py-2 text-[11px] md:text-[12px] rounded-4xl flex gap-1 md:gap-2 items-center text-green-600 bg-green-50'>
            <svg xmlns="http://www.w3.org/2000/svg" className='w-[14px] h-[14px] md:w-[16px] md:h-[16px]' viewBox="0 -960 960 960" fill='currentColor'><path d="M382-240 154-468l57-57 171 171 367-367 57 57z"/></svg>
            Requested
          </div>
          }
        </div>
  )
}

export default CommunityJoinCard