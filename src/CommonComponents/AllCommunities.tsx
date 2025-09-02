import { useEffect, useRef, useState } from "react"
import NewCommunity from "./NewCommunity";
import CommunityDataGrid from "./CommunityDataGrid";
type Props = {
  allCommunities: RawCommunity[];
  handleRefresh: () => Promise<void>;
}

const AllCommunities = ({ allCommunities, handleRefresh }: Props) => {
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState(allCommunities.map((c) => ({
    id: c.id,
    name: { name: c.name, src: c.profilePhoto },
    description: c.description,
    subCommunities: 0,
    members: c.members.length,
    status: 'Active',
    actions: 'Edit/Delete',
  })))

  useEffect(() => {
    setRows(allCommunities.map((c) => ({
      id: c.id,
      name: { name: c.name, src: c.profilePhoto },
      description: c.description,
      subCommunities: 0,
      members: c.members.length,
      status: 'Active',
      actions: 'Edit/Delete',
    })))
  }, [allCommunities])


  const newCommunityRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (newCommunityRef.current && !newCommunityRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }

  }, [open])


  return (
  <div className='w-full h-fit shadow-sm bg-post p-4 lg:p-6 rounded-2xl'>
    {open && <NewCommunity setVisible={setOpen} ref={newCommunityRef}></NewCommunity>}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0'>
        <div className='font-semibold text-xl lg:text-[24px] text-text'>
          All Communities
        </div>
        <div className='flex gap-3 lg:gap-6 items-center w-full sm:w-auto justify-end'>
          <button className="cursor-pointer text-lightText" onClick={handleRefresh}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="lg:w-6 lg:h-6" viewBox="0 -960 960 960"><path fill="currentColor" d="M480-160q-134 0-227-93t-93-227 93-227 227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170 70 170 170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67"/></svg>
          </button>
          <button className='bg-[#00338D] text-white rounded-sm px-2 h-[30px] w-[108px] flex gap-1 items-center justify-center cursor-pointer text-xs' onClick={() => {setOpen(true)}}>
            <svg width="10" height="10" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.61523 10.8333H4.61523V9.16667H9.61523V4.16667H11.2819V9.16667H16.2819V10.8333H11.2819V15.8333H9.61523V10.8333Z" fill="#FEF7FF"/>
            </svg>
            <span className="hidden sm:inline">Create New</span>
            <span className="sm:hidden">New</span>
            </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <CommunityDataGrid rows={rows} setRows={setRows}></CommunityDataGrid>
      </div>

    </div>
  )

}

export default AllCommunities