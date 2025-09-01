import styles from './LandingPage.module.css';

const ImageTile = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <img src="./assets/generic3.jpg" alt="Image" className="w-full h-full object-cover" />
      <div className={`${styles.mask} absolute inset-0`}></div>
      <div className='absolute left-[10%] top-[15%]  text-primary flex flex-col text-left font-condensed font-bold gap-4'>
        <div className=' text-5xl'>Insight.</div>
        <div className=' text-5xl'>Collaboration.</div>
        <div className=' text-5xl'>Success.</div>
        <div className='text-md w-1/2'>Instantly connect with experts, exchange ideas across teams, and transform insights into impact all within a dynamic community.</div>
        <div className='flex bg-primary t w-fit font-normal px-4 py-2 rounded-xl text-sm items-center gap-2'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 16 16"
            className="bi bi-arrow-right-short"
          >
            <defs>
              <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6C16E9" />
                <stop offset="100%" stopColor="#2A41E3" />
              </linearGradient>
            </defs>
            <path
              fill="url(#arrowGradient)"
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 
              .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
            />
          </svg>
          <span className='text-transparent bg-gradient-to-r from-[#6c16e9] to-[#2a41e3] bg-clip-text font-bold text-sm'>
            Start your community
          </span>
        </div>

      </div>
    </div>
  );
};

export default ImageTile;
