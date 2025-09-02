import axios from "axios";

const baseURL = '/api/invites'

export const getInvite = async (inviteId: string) => {
  const response = await axios.get(`${baseURL}/${inviteId}`);
  return response.data;
}

export const createInvite = async (communityId: string) => {
  const response = await axios.post(`${baseURL}`, { communityId });
  return response.data;
}

export const sendInvite = async (communityId: string, email: string) => {
  const response = await axios.post(`${baseURL}/send`, { communityId, email  });
  return response.data;
}
