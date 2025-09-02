import axios from 'axios'
// axios defaults (baseURL + withCredentials) are configured centrally in `src/main.tsx`
const baseUrl = '/api/me'

// Fetch the current user
export const getUser = async () => {
  const user =  await axios.get(baseUrl)
  return user.data
}

// Upload a new profile photo
export const uploadProfilePhoto = async (file: File) : Promise<User> => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await axios.post(`${baseUrl}/photo`, formData);
  return data;
};

// Edit user information
export const editUser = async (email: string, password: string) => {
  if (!email && !password) return;
  const newUser = await axios.post(baseUrl, {email, password});

  return newUser.data;
}
