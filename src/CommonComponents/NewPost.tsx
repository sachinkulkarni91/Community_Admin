import React, { useState } from 'react'
import { createPost } from '../services/posts'
import { useUser } from '../Contexts/UserContext'
import displayError from '../utils/error-toaster'
type Props = {
  exitFunction :  React.Dispatch<React.SetStateAction<boolean>>,
  posts: Post[],
  communityID?: string,
  spaceID?:string
}

const findTimeDifference = (createdAt: string) : string => {
  const date = new Date(createdAt);
  const dateDiff = Date.now() - date.getTime()

  if (dateDiff >= 31536000000) return `${Math.round(dateDiff / 31536000000)}y ago`
  if (dateDiff >= 2592000000) return `${Math.round(dateDiff / 2592000000)}m ago`
  if (dateDiff >= 604800000) return `${Math.round(dateDiff / 604800000)}w ago`
  if (dateDiff >= 86400000) return `${Math.round(dateDiff / 86400000)}d ago`
  if (dateDiff >= 3600000) return `${Math.round(dateDiff / 3600000)}hr ago`
  if (dateDiff >= 60000) return `${Math.round(dateDiff / 60000)}min ago`
  return `just now`
}

const NewPost = ({posts, exitFunction, communityID, spaceID} : Props) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const {user} = useUser()

  const handleNewPost = async () => {
    try {
      if (!user) throw console.error("User not defined");
      
      const finishedPost : RawPost = await createPost(title, content, user?.id, spaceID, communityID)
      posts.unshift({
        id: finishedPost.id,
        body: finishedPost.content,
        title: finishedPost.title,
        author: finishedPost.author.name,
        community: finishedPost.community.name,
        time: findTimeDifference(finishedPost.createdAt),
        profilePhoto: finishedPost.author.profilePhoto,
        likes: finishedPost.likes.length,
        liked: finishedPost.likes.some(u => u.username === user?.username),
        comments: 0,
        communityProfilePhoto: finishedPost.community.profilePhoto
      })
    } catch (error) {
      displayError(error)
    }
  }
  return (
    <>
    <div className='fixed w-full h-[100%] top-0 left-0 bg-black opacity-40 z-40' onClick={() => {exitFunction(false)}}>
    </div>
    <div className="fixed top-1/3 left-1/3 w-1/3 h-2/5 bg-post rounded-2xl z-50 p-4 flex flex-col">
      <div className='flex justify-between items-center mb-4'>
        <div className='font-bold text-lg text-left font-condensed text-text'>
          Create a new Post
        </div>
        <button 
          onClick={() => exitFunction(false)}
          className='text-gray-500 hover:text-gray-700 transition-colors'
          aria-label="Close dialog"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div id='title' className='relative w-3/4 font-normal text-sm text-left my-3'>
          <input type="text"  className='w-full h-full outline-none border-1 border-[#C1C1C1] py-3 px-3 rounded-xl text-text text-sm' placeholder="Enter your post's title" value={title} onChange={(e : React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}/>
          <label htmlFor="title"  className='bg-post absolute text-lightText text-xs left-5 top-[-12%] px-2'>Title</label>
      </div>
      <textarea className='h-1/2 my-2 p-2 text-sm outline-none text-text' placeholder="What do you want to talk about?" value={content} onChange={(e : React.ChangeEvent<HTMLTextAreaElement>) => {setContent(e.target.value)}}/>
      <div className='flex justify-center items-center mt-6' onClick={async () => {
        await handleNewPost()
        exitFunction(false)
      }}> 
        <div className='px-3 py-2 bg-[#00338D] text-white text-sm rounded-xl cursor-pointer'>Create Post</div>
      </div>
    </div>
    </>
  )
}

export default NewPost