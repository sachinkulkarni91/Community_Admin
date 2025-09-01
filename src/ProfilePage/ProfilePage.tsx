import { useState } from 'react'
import Topbar from '../CommonComponents/Topbar'
import Banner from '../CommonComponents/Banner'
import EditProfile from './components/EditProfile'
import { Tabs, Tab} from '@mui/material';
import TabPanel from './components/TabPanel';
import UserPosts from './components/UserPosts';
import { useUser } from '../Contexts/UserContext';

// Profile page component
const ProfilePage = () => {
  const [banner, setBanner] = useState<boolean>(true)
  const [value, setValue] = useState<number>(0)
  const {user} = useUser()
  
  if (!user) throw new Error('No user')
  
  // Add error handling for profile photo
  let profilePhoto = user.profilePhoto;
  try {
    profilePhoto = profilePhoto === '' ? '/assets/generic1.png' : profilePhoto
  } catch (error) {
    console.error('Error loading profile photo:', error)
    profilePhoto = '/assets/generic1.png'
  }
  console.log('profilePhoto', profilePhoto)

  const handleChange = (event : React.SyntheticEvent, newValue: number) => {
    if (!event) return;
    setValue(newValue);
  };

  return (
    <div className='w-full h-full bg-secondary relative flex flex-col'>
      <Topbar></Topbar>
      <Banner banner={banner} setBanner={setBanner}></Banner>
      <div className=' rounded-2xl flex-1 w-full flex flex-col gap-8 xl:gap-10 2xl:gap-12 h-full overflow-hidden items-center bg-secondary'> 
        <div className='w-[95%] mt-9 min-h-[144px] bg-gradient-to-r from-[#2A41E3] to-[#00338D] rounded-xl relative'>
          <img 
            className='w-[120px] h-[120px] rounded-full border-white border-2 absolute top-[70%] left-12 bg-white' 
            src={profilePhoto} 
            alt="Profile" 
            onError={(e) => {
              console.error('Image failed to load, using fallback')
              e.currentTarget.src = '/assets/generic1.png'
            }}
          />
          <span className='absolute font-medium text-text text-[28px] top-[115%] left-[200px]'>{user.name}</span>
        </div>
        <div className="flex w-full flex-1 mt-12 px-12 overflow-hidden gap-6">
          <div className="flex-1 text-logo flex flex-col overflow-hidden">
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              sx={{
                width: '100%',
                maxWidth: 320,
                fontFamily: 'Roboto, sans-serif',
                textTransform: "none",
              }}
              slotProps={{
                indicator: {
                  sx: {
                    backgroundColor: '#00338D',
                    borderTopLeftRadius: '2px',
                    borderTopRightRadius: '2px',
                  }
                }
              }}
            >
              <Tab label="Posts" sx={{ flex: 1, textAlign: 'center', textTransform:'none', fontFamily: 'Roboto, sans-serif', fontSize:'14px', mx:'10px' }} />
              <Tab label="Events" sx={{ flex: 1, textAlign: 'center', textTransform:'none', fontFamily: 'Roboto, sans-serif', fontSize:'14px', mx:'10px' }} />
              <Tab label="Communities" sx={{ flex: 1, textAlign: 'center', textTransform:'none', fontFamily: 'Roboto, sans-serif', fontSize:'14px', mx:'10px' }} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <UserPosts></UserPosts>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Events Tab
            </TabPanel>
            <TabPanel value={value} index={2}>
              Communities Tab
            </TabPanel>
          </div>
          <EditProfile></EditProfile>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage