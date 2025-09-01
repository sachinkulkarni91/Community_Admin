import React, { useEffect, useState } from 'react'
import { approveJoinRequest, fetchAdminInvites, rejectJoinRequest } from '../services/communities'
import { getUser } from '../services/user'
import { useUser } from '../Contexts/UserContext'
import displayError from '../utils/error-toaster'

type Props = {
  ref: React.RefObject<HTMLDivElement | null>
}

// Notifications component to display all admin notifications
const Notifications = ({ref} : Props) => {
  const [Notifications, setNotifications] = useState<CommunityInvite[]>([])
  const { setUser } = useUser();

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const allInvites = await fetchAdminInvites()
        setNotifications(allInvites)
      } catch (error) {
        displayError(error)
      }
    }

    handleFetch()
  }, [])

  const handleDecision = async (
    communityID: string,
    userID: string,
    approve: boolean
  ) => {
    try {
      if (approve) {
        await approveJoinRequest(communityID, userID);
        // Refetch user data and update context so communities update immediately
        const updatedUser = await getUser();
        setUser(updatedUser); // Fully replace user object for reactivity
      } else {
        await rejectJoinRequest(communityID, userID)
      }

      // Update local state to remove the handled user
      setNotifications((prev) =>
        prev.map((comm) =>
          comm.id === communityID
            ? {
                ...comm,
                joinRequests: comm.joinRequests.filter((u) => u.id !== userID)
              }
            : comm
        )
      )
    } catch (error) {
      console.error('Failed to update request status:', error)
    }
  }

  const totalRequests = Notifications.reduce(
    (sum, comm) => sum + (comm.joinRequests?.length || 0),
    0
  );

  if (totalRequests === 0) {
    return (
      <div ref={ref} className='w-[300px] h-[200px] px-2 py-2 rounded-2xl flex flex-col gap-2 absolute z-30 top-[110%] right-[10%] justify-center bg-profile shadow-lg shadow-[rgba(0,0,0,0.1)]'>
        <div className='text-lg opacity-80 text-text'>You have no notifications</div>
      </div>
    );
  }

  return (
    <div ref={ref} className='w-[300px] min-h-[100px] max-h-[240px] overflow-auto px-4 rounded-2xl flex flex-col py-4 absolute z-30 top-[110%] right-[10%] bg-profile shadow-lg shadow-[rgba(0,0,0,0.1)]'>
      {Notifications.map((community, index) => (
        <div key={community.id || index}>
          {community.joinRequests.map((user) => (
            <div
              key={user.id}
              className='w-full h-[95px] rounded-2xl bg-profile flex flex-col justify-between my-'
            >
              <div className='text-md  text-left text-text'><span className='font-bold font-condensed'>{user.name}</span>{` has requested to join `}<span className='font-bold font-condensed text-text'>{community.name}</span></div>
              <div className='flex mt-2 justify-between'>
                <button
                  onClick={() => handleDecision(community.id, user.id, true)}
                  className='bg-[#00338D] text-white px-3 py-1 rounded-lg text-[12px] font-condensed cursor-pointer'
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecision(community.id, user.id, false)}
                  className='bg-[#00338D] text-white px-3 py-1 rounded-lg text-[12px] font-condensed cursor-pointer'
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Notifications
