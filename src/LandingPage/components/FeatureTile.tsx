
const FeatureTile = () => {
  return (
    <div className='mb-24 text-left mt-20 px-20 pb-6'>
      <div className='text-[32px] mb-3 font-semibold font-condensed'>Explore our top features designed to <span className='text-[#33B2E1]'>simplify</span> your day-to-day work.</div>
      <div className='text-[20px] font-semibold mb-5 opacity-50'>These tools are crafted to make work feel effortless.</div>

      <div className='flex items-center w-full h-fit gap-16 pt-12'>
        <div className='w-[560px]'>
          <div className='font-semibold text-[20px] pl-4 flex justify-between border-b border-[#C1C1C1] py-4 
                  hover:bg-[#f0f0f0] hover:border-l-2 hover:border-l-[#63EBDA] transition-colors duration-200'>
            Verified AI Answers
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960">
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56z"/>
            </svg>
          </div>
          <div className='font-semibold text-[20px] pl-4 flex justify-between border-b border-[#C1C1C1] py-4 
                  hover:bg-[#f0f0f0] hover:border-l-2 hover:border-l-[#63EBDA] transition-colors duration-200'>
            Live Learning Events
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960">
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56z"/>
            </svg>
          </div>
          <div className='font-semibold text-[20px] pl-4 flex justify-between border-b border-[#C1C1C1] py-4 
                  hover:bg-[#f0f0f0] hover:border-l-2 hover:border-l-[#63EBDA] transition-colors duration-200'>
            Secure Role Access
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960">
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56z"/>
            </svg>
          </div>
          <div className='font-semibold text-[20px] pl-4 flex justify-between border-b border-[#C1C1C1] py-4 
                  hover:bg-[#f0f0f0] hover:border-l-2 hover:border-l-[#63EBDA] transition-colors duration-200'>
            Automated Team Workflows
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960">
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56z"/>
            </svg>
          </div>
          <div className='font-semibold text-[20px] pl-4 flex justify-between border-b border-[#C1C1C1] py-4 
                  hover:bg-[#f0f0f0] hover:border-l-2 hover:border-l-[#63EBDA] transition-colors duration-200'>
            Rewarded Expert Discovery
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960">
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56z"/>
            </svg>
          </div>

        </div>
        <img  className='w-[400px] ' src="./assets/Chatbot.png" alt="" />
      </div>

    </div>
  )
}

export default FeatureTile