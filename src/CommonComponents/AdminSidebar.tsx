import { useNavigate } from "react-router-dom"

type Props  = {
  selected: number,
  setSelected: React.Dispatch<React.SetStateAction<number>>,
  sidebarOpen?: boolean,
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminSidebar = ({selected, setSelected, setSidebarOpen} : Props) => {

  const nonSelectedStyle = 'flex items-center h-[38px] py-2 gap-2 px-4 text-xs rounded-md cursor-pointer transition-colors text-gray-600 hover:bg-gray-100'
  const selectedStyle = 'flex items-center h-[38px] py-2 gap-2 px-4 text-xs rounded-md cursor-pointer transition-colors bg-[#01338D] text-white font-medium'
  const navigate = useNavigate();
  
  const handleNavigation = (route: string, selectedIndex: number) => {
    setSelected(selectedIndex);
    navigate(route);
    setSidebarOpen?.(false);
  };

  return (
    <aside className='w-[64px] lg:w-[240px] h-screen bg-white border-r border-gray-200 sticky top-0 pt-6 px-2 lg:px-4 flex flex-col'>
      
      {/* Navigation Items */}
      <div className='flex flex-col gap-1'>
        <div className={selected == 1 ? selectedStyle : nonSelectedStyle} onClick={() => handleNavigation("/admin", 1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.75 3C3.78 3 3 3.78 3 4.75V6.25C3 7.22 3.78 8 4.75 8H6.25C7.22 8 8 7.22 8 6.25V4.75C8 3.78 7.22 3 6.25 3H4.75ZM4.75 10C3.78 10 3 10.78 3 11.75V13.25C3 14.22 3.78 15 4.75 15H6.25C7.22 15 8 14.22 8 13.25V11.75C8 10.78 7.22 10 6.25 10H4.75ZM4.75 17C3.78 17 3 17.78 3 18.75V20.25C3 21.22 3.78 22 4.75 22H6.25C7.22 22 8 21.22 8 20.25V18.75C8 17.78 7.22 17 6.25 17H4.75ZM11.75 3C10.78 3 10 3.78 10 4.75V6.25C10 7.22 10.78 8 11.75 8H19.25C20.22 8 21 7.22 21 6.25V4.75C21 3.78 20.22 3 19.25 3H11.75ZM11.75 10C10.78 10 10 10.78 10 11.75V13.25C10 14.22 10.78 15 11.75 15H19.25C20.22 15 21 14.22 21 13.25V11.75C21 10.78 20.22 10 19.25 10H11.75ZM11.75 17C10.78 17 10 17.78 10 18.75V20.25C10 21.22 10.78 22 11.75 22H19.25C20.22 22 21 21.22 21 20.25V18.75C21 17.78 20.22 17 19.25 17H11.75Z"/>
          </svg>
          <span className='hidden lg:block'>My Feed</span>
        </div>

        <div className={selected === 2 ? selectedStyle : nonSelectedStyle} onClick={() => handleNavigation("/admin/communities", 2)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4C18.21 4 20 5.79 20 8C20 10.21 18.21 12 16 12C13.79 12 12 10.21 12 8C12 5.79 13.79 4 16 4ZM8 4C10.21 4 12 5.79 12 8C12 10.21 10.21 12 8 12C5.79 12 4 10.21 4 8C4 5.79 5.79 4 8 4ZM8 14C12.42 14 16 16.58 16 20V22H0V20C0 16.58 3.58 14 8 14ZM16 14C19.31 14 22 16.69 22 20V22H18V20C18 17.93 16.84 16.16 15.13 15.2C15.41 15.07 15.7 14.96 16 14.9C16 14.93 16 14.97 16 15C16 15.34 16.04 15.67 16.1 16H16C16 14.9 16 14 16 14Z"/>
          </svg>
          <span className='hidden lg:block'>Communities</span>
        </div>

        <div className={selected === 3 ? selectedStyle : nonSelectedStyle} onClick={() => handleNavigation("/admin", 3)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H9V12H7V10ZM11 10H13V12H11V10ZM15 10H17V12H15V10ZM7 14H9V16H7V14ZM11 14H13V16H11V14ZM15 14H17V16H15V14Z"/>
          </svg>
          <span className='hidden lg:block'>Events</span>
        </div>

        <div className={selected === 4 ? selectedStyle : nonSelectedStyle} onClick={() => handleNavigation("/admin", 4)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2ZM6.55 9.22L12 11.78L17.45 9.22L12 6.66L6.55 9.22ZM2 17L12 22L22 17L20 16L12 20L4 16L2 17Z"/>
          </svg>
          <span className='hidden lg:block'>Announcements</span>
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar