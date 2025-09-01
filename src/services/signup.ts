import axios from 'axios'
const baseUrl = '/auth/login/temp'

export const signup = async (username : string, password : string, name : string, email : string,) => {
  const user =  await axios.post(baseUrl, { email, password, username, name})
  return user.data
}
