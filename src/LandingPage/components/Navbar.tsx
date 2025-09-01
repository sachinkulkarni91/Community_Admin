import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='flex bg-primary justify-between fixed top-0 min-w-full left-0 px-16 py-4 z-50 shadow-xl align-middle'>
      <div className='flex justify-evenly w-fit items-center gap-6'>
      <button className='w-[100px]' onClick={() => {navigate("/")}}>
        <img src="./assets/kpmg.png" alt="KPMG Logo" />
      </button>
      </div>
      <div className='hidden md:flex gap-6 align-middle text-[14px]'>
        <button className=''>Home</button>
        <button className=''>Aboout Us</button>
        <button className=''>Features</button>
        <button className=''>Testimonials</button>
        <button className=''>Contact</button>
      </div>

      <div className='flex justify-evenly w-fit items-center gap-6'>
        <button className="text-[14px] font-medium text-primary bg-[#00338D] py-1.5 px-3 rounded-xl w-fit inline-flex items-center gap-1 transition-all duration-300 hover:bg-primary hover:text-[#00338D] border-2 border-[#00338D]" onClick={() => {navigate("/login")}}>
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
          Get Started
        </button>
      </div>
      </div>
  )
}

export default Navbar