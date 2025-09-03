import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import postCleaner from '../utils/post.middleware';
import { useUser } from '../Contexts/UserContext';
import { getCommunityPosts } from '../services/posts';
import EditButtons from '../AdminPage/components/EditButtons';
import EditCommunity from '../CommonComponents/EditCommunity';
import InviteUser from '../CommonComponents/InviteUser';
import { getCommunityByName } from '../services/communities';
import PostsDisplay from './components/PostsDisplay';

const CommunityPage = () => {
  const {name} = useParams<{name: string}>();
  if (!name) throw new Error('Community name is required');

  const {user} = useUser();

  const [posts, setPosts] = useState<Post[]>([]);
  const [community, setCommunity] = useState<RawCommunity>();
  const [editCommunityDisplay, setEditCommunityDisplay] = useState(false);
  const [inviteUserDisplay, setInviteUserDisplay] = useState(false);
  const [members, setMembers] = useState<number>(0);
  const inviteUserRef = useRef<HTMLDivElement | null>(null);
  const editCommunityRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const decodedName = decodeURIComponent(name);
        const communityData = await getCommunityByName(decodedName);
        
        // Use the id field from the community data
        const communityId = communityData.id;
        
        if (!communityId) {
          throw new Error('Community ID not found');
        }
        
        const allPosts = await getCommunityPosts(communityId);
        const modifiedPosts = postCleaner(allPosts, user);
        
        setPosts(modifiedPosts);
        setCommunity(communityData);
        setMembers(communityData.members?.length || 0);
        
        console.log('communityData', communityData);
      } catch (error) {
        console.error('Error fetching community data:', error);
        // You might want to show an error message to the user here
      }
    }
    handleFetch()
  }, [name, user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editCommunityRef.current && !editCommunityRef.current.contains(event.target as Node)) {
        setEditCommunityDisplay(false)
      }
    }

    if (editCommunityDisplay) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }

  }, [editCommunityDisplay])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inviteUserRef.current && !inviteUserRef.current.contains(event.target as Node)) {
        setInviteUserDisplay(false)
      }
    }

    if (inviteUserDisplay) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }

  }, [inviteUserDisplay])

  if (!community) return <div>Loading...</div>;

  const communityId = community.id;
  const imageSrc = community.profilePhoto || "/assets/generic2.png";

  return (
    <div className='flex-1 mt-6 lg:mt-12 flex flex-col lg:flex-row gap-4 lg:gap-6 px-4 lg:px-0'>
      {editCommunityDisplay && <EditCommunity oldName={community?.name || ''} oldDescription={community?.description || ''} ref={editCommunityRef} setVisible={setEditCommunityDisplay}></EditCommunity>}
      {inviteUserDisplay && <InviteUser ref={inviteUserRef} setVisible={setInviteUserDisplay} id={communityId || ''}></InviteUser>}
      
      {/* Main content area */}
      <div className='w-full lg:w-[638px] flex flex-col gap-4 lg:gap-6 order-2 lg:order-1'>
        {/* Banner image */}
        <img 
          className='w-full h-24 sm:h-28 lg:h-[126px] object-cover rounded-xl' 
          src={imageSrc} 
          alt={`${community.name} banner`}
          onError={(e) => {
            e.currentTarget.src = "/assets/generic2.png";
          }}
        />
        
        {/* Community info card */}
        <div className='w-full min-h-[80px] rounded-lg bg-post flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-3 sm:gap-0'>
          <div className='flex gap-3 items-center w-full sm:w-auto'>
            <img className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[43px] lg:h-[43px] rounded-lg flex-shrink-0" src={imageSrc} alt="" />
            <div className='flex flex-col text-left justify-center min-w-0 flex-1'>
              <span className='text-[16px] font-semibold truncate'>{community.name}</span>
              <span className='text-xs sm:text-sm text-lightText line-clamp-2 sm:line-clamp-1'>{community.description}</span>
            </div>
          </div>
          <div className='flex-shrink-0 self-end sm:self-center'>
            <EditButtons setEditCommunityDisplay={setEditCommunityDisplay} setInviteUserDisplay={setInviteUserDisplay} id={communityId} large/>
          </div>
        </div>
        
        {/* Posts */}
        <PostsDisplay posts={posts} communityID={communityId} setPosts={setPosts}></PostsDisplay>
      </div>

      {/* Sidebar */}
      <div className='w-full lg:w-[344px] flex flex-col gap-4 lg:gap-6 order-1 lg:order-2'>
        {/* Members section */}
        <div className='flex flex-col gap-5 bg-post rounded-xl p-4 w-full'>
          <div className='text-lg text-left font-medium font-condensed'>{members} Total Members</div>
          <div className='flex gap-3 flex-wrap'>
            {community.members?.slice(0, 5).map((member) => <img key={member.id} className='w-[28px] h-[28px] rounded-full' src={member.profilePhoto || "/assets/generic1.png"} alt={member.name} />)}
            {(community.members?.length || 0) > 5 && <span className='text-lightText text-xs self-center'>and {(community.members?.length || 0) - 5} more...</span>}
          </div>
          <div className='flex flex-col sm:flex-row gap-4 text-xs'>
            <button className='bg-KPMG text-white rounded-2xl px-3 py-2 flex gap-2 items-center justify-center cursor-pointer flex-1 sm:flex-none' onClick={() => {setInviteUserDisplay(true)}}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.16699 10.8333H4.16699V9.16666H9.16699V4.16666H10.8337V9.16666H15.8337V10.8333H10.8337V15.8333H9.16699V10.8333Z" fill="#FEF7FF"/>
              </svg>
              Invite Members
            </button>
            <button className='bg-white text-KPMG rounded-2xl px-3 py-2 flex gap-2 items-center justify-center cursor-pointer border-2 font-medium border-KPMG flex-1 sm:flex-none'>
              View All
            </button>
          </div>
        </div>
        
        {/* Community owner section */}
        <div className='flex flex-col gap-5 bg-post rounded-xl p-4 w-full'>
          <div className='text-lg text-left font-medium font-condensed'>Community Owner</div>
          <div className='flex gap-4 items-center'>
            <img className='w-[36px] h-[36px] rounded-full flex-shrink-0' src={community.owner?.profilePhoto || "/assets/generic1.png"} alt={community.owner?.name || 'Owner'} />
            <div className='flex flex-col gap-0 text-left font-condensed min-w-0'>
              <span className='text-text text-base truncate'>{community.owner?.name || 'Unknown'}</span>
              <span className='text-lightText text-xs mt-[-4px]'>Tech CEO</span>
            </div>
          </div>
          <div className='text-left text-xs text-lightText mt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
        </div>
      </div>
    </div>
  )
}

export default CommunityPage