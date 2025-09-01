import {useState } from 'react';
import EnterEmail from './components/EnterEmail';
import EnterCode from './components/EnterCode';
import displayError from '../utils/error-toaster';
import password from '../services/password';
import NewPassword from './components/NewPassword';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [pageState, setPageState] = useState<"email" | "code" | "password">("email");
  const [code, setCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      await password.forgotPassword(email);
      setPageState("code");
    } catch (error) {
      displayError(error)
    }
  }

  const handleEnterCode = async () => {
    try {
      await password.sendOTP(email, code);
      setPageState("password");
    } catch (error) {
      displayError(error);
    }
  }

  const handleEnterPassword = async () => {
    try {
      if (confirm !== newPassword) throw new Error("Passwords do not match");
      if (newPassword.length < 3) throw new Error("Password must be at least 3 characters long");
      await password.resetPassword(email, newPassword);
      navigate('/login');
    } catch (error) {
      displayError(error);
    }
  }

  if (pageState === "email") return (
   <div className='flex justify-center items-center aspect-[16/9] w-full  gap-10'>
      <div className='h-3/4 w-1/2 bg-primary rounded-4xl flex justify-center'>
      <EnterEmail email={email} setEmail={setEmail} handleForgotPassword={handleForgotPassword}></EnterEmail>
      </div>
      
    
      <div className='w-2/5 h-3/4 overflow-hidden rounded-4xl'><img className='w-full h-full object-cover object-[75%_85%]' src="./assets/generic2.jpg" alt="" /></div></div>
  )
  if (pageState === "code") return (
    <div className='flex justify-center items-center aspect-[16/9] w-full  gap-10'>
      <div className='h-3/4 w-1/2 bg-primary rounded-4xl flex justify-center'>
      <EnterCode code={code} setCode={setCode} handleEnterCode={handleEnterCode}></EnterCode>
      </div>
      
    
      <div className='w-2/5 h-3/4 overflow-hidden rounded-4xl'><img className='w-full h-full object-cover object-[75%_85%]' src="./assets/generic2.jpg" alt="" /></div></div>
  )
  if (pageState === "password") return (
    <div className='flex justify-center items-center aspect-[16/9] w-full  gap-10'>
      <div className='h-3/4 w-1/2 bg-primary rounded-4xl flex justify-center'>
      <NewPassword password={newPassword} setPassword={setNewPassword} confirm={confirm} setConfirm={setConfirm} handleEnterPassword={handleEnterPassword} />
      </div>
      
    
      <div className='w-2/5 h-3/4 overflow-hidden rounded-4xl'><img className='w-full h-full object-cover object-[75%_85%]' src="./assets/generic2.jpg" alt="" /></div></div>
  )
}

export default ForgotPassword