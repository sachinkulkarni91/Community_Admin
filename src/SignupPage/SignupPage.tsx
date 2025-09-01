import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {getUser} from '../services/user';
import { useUser } from '../Contexts/UserContext';
import displayError from '../utils/error-toaster';
import Input from '../CommonComponents/Input';
import { signup } from '../services/signup';


// Signup page component

const SignupPage = () => {
  // Handle return URL for community invite
  const params = new URLSearchParams(location.search);
  const returnTo = params.get("return_to")

  const navigate = useNavigate();
  const {setUser} = useUser();

  // Handle user signup and set user context
  const handleSignup = async ()  => {
    try {
      await signup(username, password, name, email);
      const userInfo = await getUser();
      setUser({
        name: userInfo.name,
        username: userInfo.username,
        email: userInfo.email,
        role: 'user',
        id: userInfo.id,
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
          <div className='text-4xl text-left text-text mb-4'> <b>Welcome to Knitspace</b></div>
          <div className='text-lg text-left mb-6'>Create a new account</div>
          <Input label="Email" type="text" id="Email" placeholder="Enter your email" value={email} setValue={setEmail} />
          <Input label="Name" type="text" id="Name" placeholder="Enter your Name" value={name} setValue={setName} />
          <Input label="Username" type="text" id="Username" placeholder="Enter a username" value={username} setValue={setUsername} />
          <Input label="Password" type="password" id="Password" placeholder="Enter your new password" value={password} setValue={setPassword} />

          <div className='flex items-center h-[48px] gap-16'>
            <div className='flex-2/3 text-left text-md'></div>
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
      
      
      <div className='w-2/5 h-3/4 overflow-hidden rounded-4xl flex items-center my-auto'><img className='w-full h-full object-cover object-[75%_85%]' src="./assets/generic2.jpg" alt="" /></div></div>
  )
}

export default SignupPage