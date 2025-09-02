import { useState } from 'react'
import { Link } from 'react-router-dom';
import signupService from '../services/signup'
import { useNavigate } from 'react-router-dom';
import {getUser} from '../services/user';
import { useUser } from '../Contexts/UserContext';
import displayError from '../utils/error-toaster';
import Input from '../CommonComponents/Input';


// Signup page component
const SignupPage = () => {
  // Handle return URL for community invite
  const params = new URLSearchParams(location.search);
  const returnTo = params.get("return_to")

  const navigate = useNavigate();
  const {setUser} = useUser();
  const [isSuperAdmin, setIsSuperAdmin] = useState(true); // Default to super admin for first setup

  // Handle user signup and set user context
  const handleSignup = async ()  => {
    try {
      // Try super admin first, fall back to regular admin if super admin already exists
      if (isSuperAdmin) {
        console.log('Attempting super admin signup...');
        await signupService.signupSuperAdmin(username, password, name, email);
      } else {
        console.log('Attempting regular admin signup...');
        await signupService.signupAdmin(username, password, name, email);
      }
      
      // Wait a moment for the authentication to be set
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userInfo = await getUser();
      setUser({
        name: userInfo.name,
        username: userInfo.username,
        email: userInfo.email,
        role: userInfo.role,
        id: userInfo.id,
        communities: userInfo.joinedCommunities,
        profilePhoto: userInfo.profilePhoto
      })
      navigate('/admin')

    } catch (error) {
      console.error('Signup error:', error);
      
      // If super admin creation fails, try regular admin signup
      if (isSuperAdmin) {
        try {
          console.log('Super admin failed, trying regular admin...');
          await signupService.signupAdmin(username, password, name, email);
          
          // Wait a moment for the authentication to be set
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const userInfo = await getUser();
          setUser({
            name: userInfo.name,
            username: userInfo.username,
            email: userInfo.email,
            role: userInfo.role,
            id: userInfo.id,
            communities: userInfo.joinedCommunities,
            profilePhoto: userInfo.profilePhoto
          })
          navigate('/admin')
        } catch (adminError) {
          console.error('Admin signup also failed:', adminError);
          displayError(adminError)
        }
      } else {
        displayError(error)
      }

    } finally {
      setEmail("")
      setUsername("")
      setPassword("")
      setName("")
    }
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className='flex justify-center items-center aspect-[16/9] w-full gap-10'>
      <div className='h-3/4 w-1/2 bg-primary rounded-4xl flex justify-center'>
        <div className='w-3/4 max-w-[550px] bg-primary rounded-4xl flex flex-col text-lightText'> 
          <div className='text-4xl text-left text-text mb-4'> <b>Welcome to the Admin Dashboard</b></div>
          <div className='text-lg text-left mb-6'>Create a new admin account</div>
          
          {/* Admin Type Toggle */}
          <div className='mb-4 flex items-center gap-4'>
            <label className='flex items-center gap-2 text-sm'>
              <input 
                type="checkbox" 
                checked={isSuperAdmin} 
                onChange={(e) => setIsSuperAdmin(e.target.checked)}
                className='w-4 h-4'
              />
              Create Super Admin (First Time Setup)
            </label>
          </div>
          
          <Input label="Email" type="text" id="Email" placeholder="Enter your email" value={email} setValue={setEmail} />
          <Input label="Name" type="text" id="Name" placeholder="Enter your Name" value={name} setValue={setName} />
          <Input label="Username" type="text" id="Username" placeholder="Enter your username" value={username} setValue={setUsername} />
          <Input label="Password" type="password" id="Password" placeholder="Enter your password" value={password} setValue={setPassword} />

          <div className='text-sm text-left mb-6'>Or continue with</div>
          <div className='bg-KPMG w-full mx-auto py-3 my-2 border-1 border-KPMG text-white rounded-lg mb-6' >
            SSO Login
          </div>

          <div className='flex items-center h-[48px] gap-16'>
            <div className='flex-2/3 text-left text-md'>Already have an account? <Link to={returnTo ? `/login?return_to=${returnTo}` : '/login'} className='text-[#009FDA]'>Login</Link></div>
            <button className="flex-1/3 max-w-[100px] text-sm text-white bg-KPMG py-2 px-2 rounded-3xl w-full flex justify-center items-center gap-1 transition-all duration-300 hover:bg-white hover:text-KPMG border-2 border-KPMG my-8" onClick={() => {handleSignup()}}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-arrow-right-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 
              .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
            />
          </svg>
            Signup
          </button>
          </div>
          
        </div>

      </div>
      
      
      <div className='w-2/5 h-3/4 overflow-hidden rounded-4xl flex items-center my-auto'><img className='w-full h-full object-cover object-[75%_85%]' src="/assets/generic.jpg" alt="" /></div></div>
  )
}

export default SignupPage