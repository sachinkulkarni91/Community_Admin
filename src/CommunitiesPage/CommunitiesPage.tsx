import { useEffect, useState } from 'react';
import { getAllCommunities } from '../services/communities';
import AllCommunities from '../CommonComponents/AllCommunities';


const CommunitiesPage = () => {
  const [allCommunities, setAllCommunities] = useState<RawCommunity[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCommunities();
      setAllCommunities(data);
    };
    fetchData();
  }, []);

  const handleRefresh = async () => {
    const data = await getAllCommunities();
    setAllCommunities(data);
  }

  return (
    <div className='flex-1 mt-12'>
      <AllCommunities allCommunities={allCommunities} handleRefresh={handleRefresh}></AllCommunities>

    </div>
  )
}

export default CommunitiesPage