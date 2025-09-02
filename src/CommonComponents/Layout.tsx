import { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import Topbar from './Topbar'
import WelcomeBanner from './WelcomeBanner'
import Breadcrumbs from './Breadcrumbs'
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [selected, setSelected] = useState<number>(1)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  return (
     <div className='w-full h-full bg-secondary relative flex flex-col'>
      <Topbar></Topbar>
      <WelcomeBanner />
      <div className='w-full flex gap-2 lg:gap-4 h-[calc(100vh-115px)] lg:h-[calc(100vh-108px)] overflow-hidden'> 
        <AdminSidebar selected={selected} setSelected={setSelected} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></AdminSidebar>
        <div className='flex-1 min-w-0 h-full overflow-auto px-2 lg:px-6 py-4'>
          <Breadcrumbs />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout