import { useEffect, useState } from 'react'
import { getAllCommunities } from '../services/communities';
import Dashboard from './components/Dashboard'



const AdminPage = () => {
  const [members, setMembers] = useState(0);
  const [communities, setCommunities] = useState(0);
  const [allCommunities, setAllCommunities] = useState<RawCommunity[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCommunities();
      setAllCommunities(data);
      setMembers(data.reduce((acc : number, community : RawCommunity) => acc + community.members.length, 0));
      setCommunities(data.length);
    };
    fetchData();
  }, []);

  const handleRefresh = async () => {
    const data = await getAllCommunities();
    setAllCommunities(data);
    setMembers(data.reduce((acc : number, community : RawCommunity) => acc + community.members.length, 0));
    setCommunities(data.length);
  }
  return (
        <Dashboard members={members} communities={communities} allCommunities={allCommunities} handleRefresh={handleRefresh}></Dashboard>

  )
}

export default AdminPage