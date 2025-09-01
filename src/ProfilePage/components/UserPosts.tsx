import { useEffect, useState } from "react";
import { getUserPosts } from "../../services/user";
import { useUser } from "../../Contexts/UserContext";
import { deletePost } from "../../services/posts";
import Post from "../../CommonComponents/Post";
import postCleaner from "../../utils/post.middleware";
import displayError from "../../utils/error-toaster";

// Tab containing every post the user has made
const UserPosts = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const {user} = useUser()
    useEffect(() => {
    const handleFetch = async () => {
      try {
        const allPosts : RawPost[] = await getUserPosts()
        const modifiedPosts : Post[] = postCleaner(allPosts, user)
        setPosts(modifiedPosts)
        console.log('modifiedPosts', modifiedPosts)
      } catch (error: any) {
        console.error('Error fetching user posts:', error)
        // Don't show error toast for authentication issues, just log them
        if (error?.response?.status !== 401 && error?.response?.status !== 403) {
          displayError(error) 
        }
      }
    }
    
    // Only fetch if user exists
    if (user) {
      handleFetch()
    }
  }, [user])

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
    <div>
      <div className='overflow-scroll h-full pb-12'>
          {posts.map((p: Post) => 
            <Post key={p.id} id={p.id} title={p.title} author={p.author} likes={p.likes} comments={p.comments} community={p.community} body={p.body} handleDeletePost={handleDeletePost} likedInitial={p.liked} time={p.time} profilePhoto={p.profilePhoto} communityProfilePhoto={p.communityProfilePhoto}></Post>)}
      </div>
    </div>
  )
}

export default UserPosts