import { useEffect, useState } from 'react'
import { deletePost, getAllPosts } from '../services/posts'
import NewPost from '../CommonComponents/NewPost'
import { useUser } from '../Contexts/UserContext'
import MainFeed from './components/MainFeed'
import postCleaner from '../utils/post.middleware'
import displayError from '../utils/error-toaster'

const FeedPage = () => {
  const [newPostDisplay, setNewPostDisplay] = useState<boolean>(false)
  const [posts, setPosts] = useState<Post[]>([])
  const {user} = useUser()
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts()
        const modifiedPosts = postCleaner(
          allPosts,
            user)
        setPosts(modifiedPosts)

      } catch (error) {
        displayError(error)
      }
    }
    fetchPosts()
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
    <>
      {newPostDisplay && <NewPost exitFunction={setNewPostDisplay} posts={posts} communityID="6888ab016820942a688bbdad"></NewPost>}
      <MainFeed handleDeletePost={handleDeletePost} posts={posts} newPostFunction={setNewPostDisplay}></MainFeed>
    </>
  )
}

export default FeedPage