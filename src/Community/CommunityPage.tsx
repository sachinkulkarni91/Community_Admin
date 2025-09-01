import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getCommunityById } from '../services/communities';
import { deletePost, getCommunityPosts} from '../services/posts';
import displayError from '../utils/error-toaster';
import Post from '../CommonComponents/Post';
import postCleaner from '../utils/post.middleware';
import { useUser } from '../Contexts/UserContext';

const CommunityPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [community, setCommunity] = useState<RawCommunity>();
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  if (!id) throw new Error("Community ID not found");

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

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const community = await getCommunityById(id);
        setCommunity(community);
        const rawPosts = await getCommunityPosts(id);
        const modifiedPosts = postCleaner(rawPosts, user);
        setPosts(modifiedPosts);
      } catch (error) {
        displayError(error)  
      }
    }
    handleFetch()

  }, [id, user])

  if (!community) {
    return (
      <div className='flex-1 w-full'>
        <div className='w-full h-[calc(100vh-200px)] flex items-center justify-center'>
          <div className="text-lightText">Loading community...</div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex-1 w-full'>
      <div className='w-full my-3 md:my-5 px-4 md:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-5 md:mb-7'>
          <div className='font-bold text-[20px] md:text-[22px] font-condensed text-text'>{community.name}</div>
        </div>
        <div className='overflow-y-auto h-[calc(100vh-200px)] pb-8 md:pb-11 scrollbar-hide'>
          {posts.map((p: Post) => (
            <Post
              key={p.id}
              id={p.id}
              title={p.title}
              author={p.author}
              likes={p.likes}
              comments={p.comments}
              community={p.community}
              body={p.body}
              handleDeletePost={handleDeletePost}
              likedInitial={p.liked}
              time={p.time}
              profilePhoto={p.profilePhoto}
              communityProfilePhoto={p.communityProfilePhoto}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommunityPage