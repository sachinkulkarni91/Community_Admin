import axios from 'axios'
const baseUrl = '/auth/signup'

const signup = async (username : string, password : string, name : string, email : string,) => {
  const user =  await axios.post(baseUrl, { username, password, name, email, role: "admin" })
  return user.data
}

// Create the initial super admin (one-time only, no auth required)
const signupSuperAdmin = async (username: string, password: string, name: string, email: string) => {
  const user = await axios.post('/auth/signup/super-admin', { username, password, name, email })
  return user.data
}

// Create additional admin accounts (requires existing admin auth)
const signupAdmin = async (username: string, password: string, name: string, email: string) => {
  const user = await axios.post('/auth/signup/admin', { username, password, name, email })
  return user.data
}

export default {signup, signupSuperAdmin, signupAdmin}