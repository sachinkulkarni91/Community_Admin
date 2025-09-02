import { useState } from "react"
import NewPost from "../../CommonComponents/NewPost";
import Post from "../../CommonComponents/Post";
import { deletePost } from "../../services/posts";
import displayError from "../../utils/error-toaster";

type Props = {
  posts: Post[];
  communityID: string;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostsDisplay = ({posts, communityID, setPosts} : Props) => {
  const [newPost, setNewPost] = useState<boolean>(false)

    const handleDeletePost = async (id:string) => {
      try {
        await deletePost(id);
        setPosts((oldPosts) => {
          return oldPosts.filter((p) => p.id !== id)
        })
      } catch (error) {
        displayError(error)
      }    
    }

  return (
    <>
      {newPost && <NewPost exitFunction={setNewPost} posts={posts} communityID={communityID}></NewPost>}
      <div className='h-full pr-2'>
          <div className='flex justify-between items-center mb-8'>
            <div className='font-bold text-[20px] lg:text-[22px] font-condensed text-text'>All Posts</div>
            <div className='bg-[#00338D] text-white flex py-2 px-3 rounded-4xl items-center justify-center font-medium text-[12px] cursor-pointer' onClick={() => {setNewPost(true)}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -960 960 960" fill='currentColor'><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80z"/></svg>
              New Post
            </div>
          </div>
          <div className='overflow-scroll h-full pb-24'>
          {posts.map((p: Post) => 
            <Post key={p.id} id={p.id} title={p.title} author={p.author} likes={p.likes} comments={p.comments} community={p.community} body={p.body} handleDeletePost={handleDeletePost} likedInitial={p.liked} time={p.time} profilePhoto={p.profilePhoto} communityProfilePhoto={p.communityProfilePhoto}></Post>)}
          </div>
        </div>
    </>
  )
}

export default PostsDisplay