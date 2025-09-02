import axios from 'axios'
// axios defaults configured in `src/main.tsx`
const baseUrl = '/auth/login'

const login = async (username : string, password : string) => {
  const user =  await axios.post(baseUrl, { username, password })
  return user.data
}

const logout = async () => {
  await axios.post(`${baseUrl}/logout`)
  return
}

export default {login, logout} 