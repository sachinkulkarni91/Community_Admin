import axios from "axios";

const baseUrl = '/api/redirect'

export const getRedirect = async (code: string) => {
  const response = await axios.get(`${baseUrl}/?t=${code}`);
  return response.data
}