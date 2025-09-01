import React, { useEffect, useRef, useState } from 'react'
import NewSpace from './NewSpace'
type Props = {
  spaces: RawShortSpace[]
  setSpace: React.Dispatch<React.SetStateAction<string>>
  setSpaces: React.Dispatch<React.SetStateAction<RawShortSpace[]>>
  communityID: string
}

// Displays all the spaces within a community
const SpacesSidebar = ({spaces, setSpace, communityID, setSpaces} : Props) => { 
  const [newSpace, setNewSpace] = useState<boolean>(false);
  const newSpaceRef = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (newSpaceRef.current && !newSpaceRef.current.contains(event.target as Node)) {
          setNewSpace(false)
        }
      }
  
      if (newSpace) {
        document.addEventListener('mousedown', handleClickOutside)
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
  
    }, [newSpace])

  // Render the list of spaces and the option to create a new space
  return (
    <div className='rounded-lg h-19/20 bg-primary w-1/6 py-6 px-4 flex flex-col self-'>
    {spaces.map((s) => <div key={s.id} className='text-sm 2xl:text-md text-lightText py-4 px-6 text-left hover:text-text hover:bg-hov rounded-md whitespace-nowrap overflow-hidden text-ellipsis' onClick={() => {setSpace(s.id)}}>{s.name}</div>)}
    <div className='border-dashed flex border-[#D0D0D0] border-2 px-4 py-2 rounded-lg hover:bg-logo text-text hover:text-primary hover:border-solid hover:border-[#FFFFFF] mt-auto gap-2 justify-center items-center' onClick={() => {setNewSpace(true)}}>
      <span className='hidden lg:inline lg:text-xs xl:text-sm'>Add a new space</span>
      <svg className='' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -960 960 960" fill='currentColor'><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80z"/></svg>
      </div>
      {newSpace && <NewSpace setSpaces={setSpaces} setVisible={setNewSpace} ref={newSpaceRef} communityID={communityID}></NewSpace>}
    </div>
  )
}

export default SpacesSidebar