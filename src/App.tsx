import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import FeedPage from './FeedPage/FeedPage';
import CommunityPage from './Community/CommunityPage';
import { useTheme } from './Contexts/ThemeContext';
import ProfilePage from './ProfilePage/ProfilePage';
import JoinCommunity from './CommonComponents/JoinCommunity';
import ForgotPassword from './ForgotPasswordPage/ForgotPassword';
import RedirectPage from './CommonComponents/RedirectPage';
import Layout from './CommonComponents/Layout';
import CommunitiesPage from './CommunitiesPage/CommunitiesPage';

function App() {
  const {theme} = useTheme()
  return (
    <Router >
      <div id="theme-wrapper" className={`${theme} bg-primary w-full h-[100%]`}>
        <Routes>
         
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/community/redirect" element={<RedirectPage />} />
          <Route path="/community/redirect/:token" element={<RedirectPage />} />
          <Route path="/community/join/:id" element={<JoinCommunity />} />
           <Route element={<Layout></Layout>}> 
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/community/:id" element={<CommunityPage />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/me" element={<ProfilePage/>}></Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />
      </div>
    </Router>
  );
}


export default App
