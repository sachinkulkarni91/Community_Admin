import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AnnouncementsPage from './AnnouncementsPage/AnnouncementsPage';
import './App.css'
import { ToastContainer } from 'react-toastify'
import AdminPage from './AdminPage/AdminPage'
import { useTheme } from './Contexts/ThemeContext'
import LoginPage from './LoginPage/LoginPage'
import SignupPage from './SignupPage/SignupPage'
import Layout from './CommonComponents/Layout'
import CommunitiesPage from './CommunitiesPage/CommunitiesPage'
import CommunityPage from './CommunityPage/CommunityPage'
import EventsPage from './EventsPage/EventsPage'

function App() {
  const {theme} = useTheme()
  return (
    <Router>
      <div id="theme-wrapper" className={`${theme} bg-primary w-full h-[100%]`}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path='/admin' element={<AdminPage/>}></Route>
            <Route path='/admin/communities' element={<CommunitiesPage />} />
            <Route path='/admin/events' element={<EventsPage />} />
            <Route path='/admin/community/:name' element={<CommunityPage />} />
            <Route path='/community/:name' element={<CommunityPage />} />
            <Route path='/communities' element={<CommunitiesPage />} />
            <Route path='/admin/announcements' element={<AnnouncementsPage />} />
          </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />
      </div>
    </Router>
  )
}

export default App
