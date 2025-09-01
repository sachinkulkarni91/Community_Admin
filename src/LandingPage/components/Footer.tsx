
const Footer = () => {
  return (
    <div className='w-full h-[400px] bg-[#00338D] flex justify-around py-12 text-left text-primary'>
      <div className='flex flex-col text gap-4'>
        <img className='w-[100px] text-primary' src="./assets/kpmg-alt.png" alt="logo" />
      <div className="flex items-center gap-2 ">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960"><path fill="currentColor" d="M480-480q33 0 56.5-23.5T560-560t-23.5-56.5T480-640t-56.5 23.5T400-560t23.5 56.5T480-480m0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800t-170.5 69.5T240-552q0 71 59 162.5T480-186m0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880t223.5 89T800-552q0 100-79.5 217.5T480-80m0-480"/></svg>
      8819 Ohio St. South Gate, CA 90280</div>
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960">
          <path
            fill="currentColor"
            d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160zm320-280L160-640v400h640v-400zm0-80 320-200H160zM160-640v-80 480z"
          />
        </svg>
        Ourstudio@hello.com
      </div>

      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960"><path             fill="currentColor"d="M680-200h80v-560h-80zM280-400q17 0 28.5-11.5T320-440t-11.5-28.5T280-480t-28.5 11.5T240-440t11.5 28.5T280-400m0 120q17 0 28.5-11.5T320-320t-11.5-28.5T280-360t-28.5 11.5T240-320t11.5 28.5T280-280m-40-240h320v-160H240zm160 120q17 0 28.5-11.5T440-440t-11.5-28.5T400-480t-28.5 11.5T360-440t11.5 28.5T400-400m0 120q17 0 28.5-11.5T440-320t-11.5-28.5T400-360t-28.5 11.5T360-320t11.5 28.5T400-280m120-120q17 0 28.5-11.5T560-440t-11.5-28.5T520-480t-28.5 11.5T480-440t11.5 28.5T520-400m0 120q17 0 28.5-11.5T560-320t-11.5-28.5T520-360t-28.5 11.5T480-320t11.5 28.5T520-280m80 40v-480H200v480zm80 120q-23 0-40.5-11T611-160H200q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h411q11-18 28.5-29t40.5-11h80q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120zM200-240v-480z"/></svg>
      +1 386-688-3295</div>
      </div>
      <div className='flex flex-col text-md gap-4'>
      <div className='text-[#00338D]'><b>Service</b></div>
      <div className='text-[#00338D]'>Illustration</div>
      <div className='text-[#00338D]'>Mobile Design</div>
      <div className='text-[#00338D]'>Motion Graphic</div>
      <div className='text-[#00338D]'>Web Design</div>
      <div className='text-[#00338D]'>Development</div>
      <div className='text-[#00338D]'>SEO</div></div>

      <div className=' flex flex-col text-md gap-4'>
        <div><b>Company</b></div>
        <div>Service</div>
        <div>Features</div>
        <div>Our Team</div>
        <div>Portfolio</div>
        <div>Blog</div>
        <div>Contact Us</div>
      </div>
      <div className=' flex flex-col text-md gap-4'>
        <div><b>Our Social Media</b></div>
        <div>Dribbble</div>
        <div>Medium</div>
        <div>Facebook</div>
        <div>Twitter</div>
        <div>Instagram</div>
        </div>
    </div>
  )
}


export default Footer