
const StartTile = () => {
  return (
<div className="
  w-full 
  bg-gradient-to-b	from-[#DDF5FB] to-primary
  p-6 
">      <div className='w-8/12 justify-items-center min-h-full mx-auto'>
        <div className='text-center w-8/12 text-6xl/24 mb-6 font-semibold'>Launch your own <span className='text-primary bg-gradient-to-r	from-[#335195] to-[#33B2E1] py-1 px-3 rounded-2xl'>Community</span> Platform.</div>
        <div className='text-center w-8/12 text-lg mb-6 font-semibold'>Connect instantly with experts, share ideas across teams, & turn insight 
        into impact all in one vibrant community</div>
        <button className="text-md text-primary bg-[#009FDA] py-2 px-3 rounded-3xl w-fit inline-flex items-center gap-1 mb-6 transition-all duration-300 hover:bg-primary hover:text-[#009FDA] border-2 border-[#009FDA] ">
          Get Started
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-arrow-right-short"
            viewBox="0 0 16 16"
          >
          <path
            fillRule="evenodd"
            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 
            .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
          />
          </svg>
        </button>
        <div className='flex w-8/12 justify-center items-center gap-10 mt-12'>
        <button className='text-lg font-bold'>As a guest</button>
        <button className='text-lg font-bold text-[#C6C5D0]'>Admin</button>
        <button className='text-lg font-bold text-[#C6C5D0]'>Owner</button>
        <button className='text-lg font-bold text-[#C6C5D0]'>Members</button>
        </div>
      </div>
      <div className='w-8/12 h-[600px] bg-[#CCD3E4] rounded-4xl mx-auto mt-6'></div>        

    </div>
  )
}

export default StartTile