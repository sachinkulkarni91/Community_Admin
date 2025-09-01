
const ScreenTile = () => {
  return (
    <div className='px-20 text-left mt-20'>
      <div className='text-[32px] mb-3 font-medium'>Explore our top features designed to <span className='text-[#33B2E1]'>simplify</span> your day-to-day work.</div>
      <div className='text-[20px] font-semibold mb-5 opacity-50'>These tools are crafted to make work feel effortless.</div>
      <div className='flex gap-6 mt-12 mb-8 font-bold'>
        <div className='bg-[#33B2E114] text-[#5C5C5C] w-[96px] h-[48px] flex items-center justify-center rounded-2xl text-[14px] hover:bg-[#C6E7FF] hover:text-[#000000] text-center'>Community</div>
        <div className='bg-[#33B2E114] text-[#5C5C5C] w-[96px] h-[48px] flex items-center justify-center rounded-2xl text-[14px] hover:bg-[#C6E7FF] hover:text-[#000000] text-center'>Chat</div>
        <div className='bg-[#33B2E114] text-[#5C5C5C] w-[96px] h-[48px] flex items-center justify-center rounded-2xl text-[14px] hover:bg-[#C6E7FF] hover:text-[#000000] text-center'>Events</div>
        <div className='bg-[#33B2E114] text-[#5C5C5C] w-[96px] h-[48px] flex items-center justify-center rounded-2xl text-[14px] hover:bg-[#C6E7FF] hover:text-[#000000] text-center'>Courses</div>
        <div className='bg-[#33B2E114] text-[#5C5C5C] w-[96px] h-[48px] flex items-center justify-center rounded-2xl text-[14px] hover:bg-[#C6E7FF] hover:text-[#000000] text-center'>Live</div>
        <div className='bg-[#33B2E114] text-[#5C5C5C] w-[96px] h-[48px] flex items-center justify-center rounded-2xl text-[14px] hover:bg-[#C6E7FF] hover:text-[#000000] text-center'>Ai agents</div>
        <div className='bg-[#33B2E114] text-[#5C5C5C] w-[96px] h-[48px] flex items-center justify-center rounded-2xl text-[14px] hover:bg-[#C6E7FF] hover:text-[#000000] text-center'>Customize</div>
        

      </div>
      <div className='w-full flex justify-center'>
        <img className='w-full' src="./assets/feed.png" alt="feed" />
      </div>
    </div>
  )
}

export default ScreenTile