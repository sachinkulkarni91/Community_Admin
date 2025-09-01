import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-toastify';

type Props = {
  id: string;
  body: string;
  author: string;
  likes: number;
  profilePhoto: string
}

const Comment = ({body, author, likes, profilePhoto} : Props) => {
    const [liked, setLiked] = useState(false);
    const [postLikes, setPostLikes] = useState(likes);

    profilePhoto = profilePhoto === '' ? '/assets/generic1.png' : profilePhoto

    // Function to handle like action
    const handleLike = async () => {
        try {
          setPostLikes((l : number) => {return l + 1})
          setLiked(true)
        } catch (error) {
          const message = axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : 'Something went wrong';
          toast.error(message);
        }    
      }

    // Function to handle unlike action
    const handleUnlike = async () => {
      try {
        setPostLikes((l : number) => {return l - 1})
        setLiked(false)
      } catch (error) {
        const message = axios.isAxiosError(error) && error.response?.data?.error
        ? error.response.data.error
        : 'Something went wrong';
        toast.error(message);
      }
    }
  return (
    <div className='pl-2 md:pl-3 py-2'>
      <div className='flex gap-2 items-center'>
        <div className='flex items-center'>
          <img className='w-[30px] h-[30px] md:w-[30px] md:h-[30px] rounded-full' src={profilePhoto} alt="" />
        </div>
        <div className='text-left flex flex-col justify-center'>
          <div className='font-medium text-[12px] md:text-[13px]'>{author}</div>
          <div className='text-[8px] md:text-[9px] text-gray-500'>Posted 3hrs ago</div>
        </div>
      </div>
      <div className='text-left mt-1.5 ml-8'>
        <div className='text-[10px] md:text-[11px] break-words overflow-hidden'>
          {body}
        </div>
      </div>
      <div className='flex gap-3 mt-2 ml-8'>
        {!liked ? 
        
        <div className='flex gap-1 items-center text-[10px] md:text-[11px] border-1 border-lightText px-1.5 md:px-2 py-1 md:py-1.5 rounded-3xl cursor-pointer' onClick={handleLike}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" className="md:w-3.5 md:h-3.5 bi bi-heart" fill="currentColor" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
          </svg>
          {postLikes}
        </div> 
        : 
        <div className='flex gap-1 items-center text-[10px] md:text-[11px] border-1 border-lightText px-1.5 md:px-2 py-1 md:py-1.5 rounded-3xl cursor-pointer' onClick={handleUnlike}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" className="md:w-3.5 md:h-3.5 bi bi-heart-fill" fill="#c20000" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
          </svg>
          {postLikes}
        </div>
        }
      </div>
    </div>
  )
}

export default Comment