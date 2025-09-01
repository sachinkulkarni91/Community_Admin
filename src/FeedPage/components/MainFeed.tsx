import React from 'react'
import Post from '../../CommonComponents/Post'

type Props = {
  handleDeletePost: (id: string) => void;
  posts: Post[]
  newPostFunction :  React.Dispatch<React.SetStateAction<boolean>>
}

const MainFeed = ({handleDeletePost, posts, newPostFunction} : Props) => {
  return (
    <div className='flex-1 w-full'>
      <div className='w-full my-3 md:my-5 px-4 md:px-6 lg:px-8'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 md:mb-7 gap-4 sm:gap-0'>
          <div className='font-bold text-[20px] md:text-[22px] font-condensed text-text'>My Feed</div>
          <div className='bg-[#00338D] text-white flex py-1.5 px-3 gap-1 rounded-4xl items-center justify-center cursor-pointer font-medium text-[11px] md:text-[12px] self-start sm:self-auto' onClick={() => {newPostFunction(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="md:w-[18px] md:h-[18px]" viewBox="0 -960 960 960" fill='currentColor'><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80z"/></svg>
            New Post
          </div>
        </div>
        <div className='overflow-y-auto h-[calc(100vh-200px)] pb-8 md:pb-11 scrollbar-hide'>
          {posts.map((p: Post) => 
            <Post key={p.id} id={p.id} title={p.title} author={p.author} likes={p.likes} comments={p.comments} community={p.community} body={p.body} handleDeletePost={handleDeletePost} likedInitial={p.liked} time={p.time} profilePhoto={p.profilePhoto} communityProfilePhoto={p.communityProfilePhoto}></Post>)}
        </div>
      </div>
    </div>
  )
}

export default MainFeed