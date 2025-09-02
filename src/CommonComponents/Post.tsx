import { useState } from 'react'
import { likePost, unlikePost } from '../services/posts';
import CommentSection from './CommentSection';
import displayError from '../utils/error-toaster';

type Props = {
  id: string;
  title: string;
  body: string;
  author: string;
  community: string;
  communityProfilePhoto: string;
  likes: number;
  comments: number;
  likedInitial: boolean;
  profilePhoto: string;
  time: string;
  handleDeletePost: (id: string) => void;
}

// Post component
const Post = ({id, title, body, author, community, likes, comments, handleDeletePost, likedInitial, time, profilePhoto, communityProfilePhoto}: Props) => {
  const [liked, setLiked] = useState(likedInitial);
  const [postLikes, setPostLikes] = useState(likes);
  const [showComments, setShowComments] = useState(false)
  profilePhoto = profilePhoto === '' ? '/assets/generic1.png' : profilePhoto

  // Handle liking a post
  const handleLike = async () => {
    try {
      await likePost(id)
      setPostLikes((l) => {return l + 1})
      setLiked(true)
    } catch (error) {
      displayError(error)
    }    
  }

  // Handle unliking a post
  const handleUnlike = async () => {
    try {
      await unlikePost(id)
      setPostLikes((l) => {return l - 1})
      setLiked(false)
    } catch (error) {
      displayError(error)
    }
  }
  
  return (
    <div className='bg-post rounded-2xl mb-6 h-fit text-text'>
    <div className='flex flex-col gap-4 w-full min-h-[292px] p-4  pb-16 relative'>
      <div className='flex justify-between'>
        <div className='flex gap-2 items-center'>
          <img className='w-[20px] h-[20px] rounded-md' src={communityProfilePhoto} alt="Community Profile Photo" />
          <div className='font-bold font-stretch-50% text-text flex items-center text-[13px] lg:text-[14px] font-condensed'>{community}</div>
        </div>
        <div className='flex gap-6 align-middle mr-4'>
          <div className='cursor-pointer w-[14px] h-[14px]' onClick={() => {handleDeletePost(id)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill='currentColor'><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120zm400-600H280v520h400zM360-280h80v-360h-80zm160 0h80v-360h-80zM280-720v520z"/></svg>
          </div>
          <div className='cursor-pointer w-[14px] h-[14px]'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
            <path d="M3  9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
            </svg>
          </div>
        </div>
      </div>
      <div className='flex gap-4 items-center'>
        <div className='flex items-center'>
          <img className='w-[36px] h-[36px] rounded-3xl' src={profilePhoto} alt="" />
        </div>
        <div className='text-left'>
          <div className='font-medium text-[14px] lg:text-[15px]'>{author}</div>
          <div className='text-[10px] lg:text-[11px] text-lightText'>{`Posted ${time}`}</div>
        </div>
      </div>
      <div className='text-left'>
        <div className='font-medium text-[14px] lg:text-[15px] mb-1'>
          {title}
        </div>
        <div className='text-xs tracking-tight break-words overflow-hidden'>
          {body}
        </div>
      </div>
      <div className='absolute bottom-3 flex gap-5 mt-4'>
        {!liked ? 
        
        <div className='flex gap-2 items-center text-[11px] lg:text-[12px] 2xl:text-[14px] border-1 border-lightText px-3 py-1 rounded-3xl cursor-pointer ' onClick={handleLike}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
          </svg>
          {postLikes}
        </div> 
        : 
        <div className='flex gap-2 items-center text-[11px] lg:text-[12px] 2xl:text-[14px]  border-1 border-lightText px-3 py-1 rounded-3xl cursor-pointer' onClick={handleUnlike}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#c20000" className="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
          </svg>
          {postLikes}
        </div>
        }
        <div className=' flex gap-2 items-center text-[11px] lg:text-[12px] 2xl:text-[14px]  border-1 border-lightText px-3 py-1 rounded-3xl cursor-pointer' onClick={() => {setShowComments((old) => {return !old})}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 -960 960 960" fill='currentColor'><path d="M240-400h480v-80H240zm0-120h480v-80H240zm0-120h480v-80H240zM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800zM160-320h594l46 45v-525H160zm0 0v-480z"/></svg>
          {comments}
        </div>
      </div>
    </div>
      {showComments && <CommentSection postID={id}></CommentSection>}
    </div>

  )
}

export default Post