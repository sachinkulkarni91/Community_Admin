import { useParams } from 'react-router-dom'
import Topbar from '../CommonComponents/Topbar'
import { useUser } from '../Contexts/UserContext'
import CommunitySidebar from './components/CommunitySidebar'
import Space from './components/Space'
import SpacesSidebar from './components/SpacesSidebar'
import { getCommunityById } from '../services/communities'
import { useEffect, useState } from 'react'
import Banner from '../CommonComponents/Banner'
import displayError from '../utils/error-toaster'

// Community page component
const CommunityPage = () => {
  const [banner, setBanner] = useState(true)
  const [community, setCommunity] = useState<RawCommunity>()
  const [spaces, setSpaces] = useState<RawShortSpace[]>([])
  const [currentSpace, setCurrentSpace] = useState<string>('')

  const {user} = useUser();
  if (!user) throw console.error("user not defined");
  const [allCommunities, setAllCommunities] = useState(
    user?.communities.map((c, index) => ({ name: c.name, id: c.id, src: `/assets/${index % 3 + 1}.png` })) || []
  );
  const { id } = useParams();
  if (!id) throw console.error("user not defined");

  useEffect(() => {
    const handleInitialFetch = async () => {
      try {
        const communityInfo : RawCommunity = await getCommunityById(id);
        setCommunity(communityInfo)
        setSpaces(communityInfo.spaces)
        setCurrentSpace(communityInfo.spaces[0].id)
      } catch (error) {
        displayError(error)
      }
    }
    handleInitialFetch()
  }, [id])

  if (!community) {
  return <div className="p-8 text-center text-lightText">Loading community...</div>;
  }


  return (
    <div className='w-full h-full bg-secondary relative flex flex-col'>
    <Topbar></Topbar>
    <Banner banner={banner} setBanner={setBanner}></Banner>
    <div className='rounded-2xl flex-1 w-full flex gap-6 2xl:gap-10 h-full overflow-hidden items-center'> 
      <CommunitySidebar communities={allCommunities} onCommunitiesClick={() => {
        if (!user) return;
        setAllCommunities(
          user.communities.map((c) => ({ name: c.name, id: c.id, src: c.profilePhoto}))
        );
      }} ></CommunitySidebar>
      <SpacesSidebar communityID={id} spaces={spaces} setSpace={setCurrentSpace} setSpaces={setSpaces}></SpacesSidebar>
      <Space spaceID={currentSpace} communityID={community.id}></Space>
    </div>
  </div>
  )
}

export default CommunityPage