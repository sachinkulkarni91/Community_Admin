import axios from 'axios'
axios.defaults.withCredentials = true; 
const baseUrl = '/api/me'

// Add request interceptor to handle authentication
axios.interceptors.request.use((config) => {
  // Add any required headers here if needed
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to handle authentication errors
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401 || error.response?.status === 403) {
    console.warn('Authentication required for API call:', error.config?.url);
  }
  return Promise.reject(error);
});

// Fetch the current user
export const getUser = async () => {
  const user =  await axios.get(baseUrl)
  return user.data
}

// Fetch all posts made by the current user
export const getUserPosts  = async () : Promise<RawPost[]> => {
  const posts = await axios.get(`${baseUrl}/posts`)
  return posts.data
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
