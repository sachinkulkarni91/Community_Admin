import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { addCommentToPost, getCommentsForPost } from '../services/comment';
import displayError from '../utils/error-toaster';

type Props = {
  postID: string
}

// Stores all the comments and the ability to add new comments for each post
const CommentSection = ({postID} : Props) => {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<RawComment[]>([]);

  // Fetch comments for the post
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const allComments = await getCommentsForPost(postID)
        console.log('allComments', allComments)
        setComments(allComments)  
      } catch (error) {
        displayError(error)
      }      
    }
    handleFetch()
  }, [postID])

  // Handle adding a new comment
  const handleNewComment = async () => {
    if (!newComment.trim()) return;

    try {
      const addedComment = await addCommentToPost(postID, newComment);
      setComments((c) => {
        return [...c, addedComment]
      })

    } catch (error) {
      displayError(error)
    } finally {
      setNewComment('');
    }
  }

  return (
    <div className='flex flex-col gap-2 w-full p-3 relative'>
      <div className='w-full bg-secondary rounded-lg relative'>
        <input className='w-full outline-none px-4 py-3 text-sm' type="text" placeholder="What are your thoughts?" value={newComment} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setNewComment(e.currentTarget.value)}}/>
        <svg className='absolute right-6 top-[30%] text-lightText cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill='currentColor' onClick={handleNewComment}><path d="M120-160v-640l760 320zm80-120 474-200-474-200v140l240 60-240 60zm0 0v-400z"/></svg>
      </div>
      {
        comments.length > 0 ? comments.map(c => <Comment key={c.id} profilePhoto={c.author.profilePhoto}  id={c.id} author={c.author.name} body={c.content} likes={c.likes.length}></Comment>) : null
      }
    </div>
  )
}

export default CommentSection