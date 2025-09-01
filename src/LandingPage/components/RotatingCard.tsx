
type Props = {
  title: string,
  description: string,
  link: string,
  color: string,
}
const RotatingCard = ({title, description, color} : Props) => {
  return (
    <div style={{ backgroundColor: color }} className={` p-6 text-left w-[275px] h-[350px] rounded-4xl relative`}>
      <div className='text-2xl text-primary mb-3'>{title}</div>
      <div className='text-sm text-primary'>{description}</div>
      <button className="absolute left-4 bottom-4 border border-primary rounded-md p-1.5 bg-transparent text-primary transition-all duration-300 hover:bg-primary hover:text-black group">
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-transparent group-hover:fill-yellow-400 strokeCurrent transition-all duration-300 group-hover:drop-shadow-[0_0_6px_#fef3c7]"
  >
    <path
      d="M12 18V12.75M12 12.75C12.5179 12.75 13.0206 12.6844 13.5 12.561M12 12.75C11.4821 12.75 10.9794 12.6844 10.5 12.561M14.25 20.0394C13.5212 20.1777 12.769 20.25 12 20.25C11.231 20.25 10.4788 20.1777 9.75 20.0394M13.5 22.422C13.007 22.4736 12.5066 22.5 12 22.5C11.4934 22.5 10.993 22.4736 10.5 22.422M14.25 18V17.8083C14.25 16.8254 14.9083 15.985 15.7585 15.4917C17.9955 14.1938 19.5 11.7726 19.5 9C19.5 4.85786 16.1421 1.5 12 1.5C7.85786 1.5 4.5 4.85786 4.5 9C4.5 11.7726 6.00446 14.1938 8.24155 15.4917C9.09173 15.985 9.75 16.8254 9.75 17.8083V18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>



    </div>
  )
}

export default RotatingCard