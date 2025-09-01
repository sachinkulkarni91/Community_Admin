import { useUser } from "../Contexts/UserContext";
import CommunityCard from "./components/CommunityCard"

const CommunitiesPage = () => {
  const { user } = useUser();
  const userCommunities = user?.communities || [];
  return (
    <div className='flex-1 my-6 flex flex-col gap-6'>
      <div className='font-bold text-[24px] font-condensed text-text text-left'>My Communities</div>
      <div className="flex flex-wrap gap-6">
        {userCommunities.map((community) => (
          <CommunityCard
            id={community.id}
            key={community.id}
            src={community.profilePhoto}
            title={community.name}
            members={community.members.length}
            description={community.description}
          />
        ))}
      </div>
    </div>
  )
}

export default CommunitiesPage