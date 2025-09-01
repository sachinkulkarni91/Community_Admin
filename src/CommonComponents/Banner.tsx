import React from 'react'

type Props = {
  banner: boolean;
  setBanner: React.Dispatch<React.SetStateAction<boolean>>
}

// Default banner for the top of all pages
const Banner = ({banner, setBanner} : Props) => {
  if (banner) return (
    <div className='bg-gradient-to-r from-[#6C16E9] to-[#2A41E3] text-white relative flex items-center h-[29px] md:h-[32px] justify-center px-4'>
      <div
        className='font-bold text-[13px] font-condensed text-center'
        >
        Welcome to KPMG's Knitspace. Launch new communities, explore countless others, and watch ideas take flight!
      </div>
      <div className="absolute top-1/2 right-2 md:right-3 -translate-y-1/2 cursor-pointer" onClick={() => {setBanner(false)}}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] xl:w-[16px] xl:h-[16px]"  viewBox="0 -960 960 960" fill='#FFFFFF'><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224z"/></svg>
      </div>
    </div>
  )
  return null
}

export default Banner