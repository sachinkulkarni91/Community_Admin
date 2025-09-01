import React from 'react'

type Props = {
  user: string,
  content: string
  self: boolean
  ref?: React.RefObject<HTMLDivElement | null>
  profilePhoto: string
}

// Message component to display individual messages
const Message = ({content, self, ref, profilePhoto} : Props) => {
  profilePhoto = profilePhoto === '' ? '/assets/generic1.png' : profilePhoto
  if (self) return (
     <div ref={ref} className='flex text-[16px] font-medium text-left items-center'>
      <div className='px-4 rounded-xl py-2 bg-self ml-auto mr-4 max-w-[400px] relative text-text'>{content}</div>
      <img  className='w-[32px] h-[32px] rounded-4xl' src={profilePhoto} alt="" />
    </div>
  )
  return (
    <div ref={ref} className='flex text-[16px] font-medium text-left items-center'>
      <img  className='w-[32px] h-[32px] rounded-4xl' src={profilePhoto} alt="" />
      <div className='px-4 rounded-xl py-2 bg-other mr-auto ml-4 max-w-[320px] relative text-text'>{content}</div>
    </div>
  )
}

export default Message