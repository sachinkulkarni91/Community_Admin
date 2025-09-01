import {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import login from '../services/login';
import { useUser } from '../Contexts/UserContext';
import {getUser} from '../services/user';
import displayError from '../utils/error-toaster';
import Input from '../CommonComponents/Input';

// Login page component
const LoginPage = () => {
  // Handle return URL for community invite
  const params = new URLSearchParams(location.search);
  const returnTo = params.get("return_to")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {setUser} = useUser()

  const handleLogin = async ()  => {
    // try to login and then set user context
    try {
      await login.login(username, password);
      const userInfo = await getUser();
      if (userInfo.firstLogin) {
        navigate(returnTo ? `/signup?return_to=${returnTo}` : '/signup');
        return;
      }
      setUser({
        name: userInfo.name,
        username: userInfo.username,
        email: userInfo.email,
        id: userInfo.id,
        role: userInfo.role,
        communities: userInfo.joinedCommunities,
        profilePhoto: userInfo.profilePhoto
      })
      if (returnTo) {
        window.location.href = returnTo;
      } else {
        navigate('/feed')
      }

    } catch (error) {
      displayError(error)

    } finally {
      setUsername("")
      setPassword("")
    }
  }

  return (
    <div className='flex justify-center items-center aspect-[16/9] w-full  gap-10'>
      <div className='h-3/4 w-1/2 bg-primary rounded-4xl flex justify-center'>
        <div className='w-3/4 max-w-[550px] bg-primary rounded-4xl flex flex-col text-lightText'> 
          <div className='text-4xl text-left text-text mb-4 font-condensed'> <b>Welcome to Knitspace</b></div>
          <div className='text-lg text-left mb-8'>Sign in to your account</div>
          <Input label="Username or Email" type="text" id="Email" placeholder="Enter your Username or Email" value={username} setValue={setUsername} />
          <Input label="Password" type="password" id="Password" placeholder="Enter your password" value={password} setValue={setPassword} />

        <div className='flex items-center gap-16'>
          <div className='flex-2/3 text-left text-sm'> <Link to='/forgot-password' className='text-[#009FDA]'>Forgot Password?</Link></div>
          <button className="flex-1/3 max-w-[100px] text-sm text-white bg-KPMG py-2 px-2 rounded-3xl w-full flex justify-center items-center gap-1 transition-all duration-300 hover:bg-white hover:text-KPMG border-2 border-KPMG my-8" onClick={() => {handleLogin()}}>
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
          Login
        </button>
        </div>
       
        </div>
      </div>
      
    
      <div className='w-2/5 h-3/4 overflow-hidden rounded-4xl'><img className='w-full h-full object-cover object-[75%_85%]' src="./assets/generic2.jpg" alt="" /></div></div>
  )
}

export default LoginPage