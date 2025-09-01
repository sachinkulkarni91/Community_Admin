

type Props = {
  name: string,
  title: string,
  review: string,
  stars: number,
  icon: string
}

const ReviewCard = ({name, title, review, icon} : Props) => {
  return (
    <div className='w-[400px] h-[175px] bg-[#F3F7FF] rounded-xl relative p-4 justify-center items-center'>
      <div className='flex mb-3'>
        <img className='rounded-4xl w-[40px] h-[40px] mr-5' src={`/assets/icons/${icon}`} alt="" />
        <div className='flex flex-col justify-center items-left text-left'>
          <div className='text-md'><b>{name}</b></div><div className='text-md'>{title}</div>
        </div>
      </div>
      <div className=' justify-center h-[1px] w-8/12 bg-[#009FDA] my-2'></div>
      <div className='text-sm text-left'>{review}</div>
      <div className='flex gap-1 absolute right-3 top-3'>
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 -960 960 960">
        <path fill="currentColor" d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97zM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149zm247-350" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 -960 960 960">
        <path fill="currentColor" d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97zM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149zm247-350" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 -960 960 960">
        <path fill="currentColor" d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97zM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149zm247-350" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 -960 960 960">
        <path fill="currentColor" d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97zM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149zm247-350" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 -960 960 960">
        <path fill="currentColor" d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97zM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149zm247-350" />
      </svg>
      </div>

    </div>
  )
}

export default ReviewCard