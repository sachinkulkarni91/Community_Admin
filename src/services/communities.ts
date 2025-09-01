// services/community.ts

import axios from 'axios'

// Get all communities
export const getAllCommunities = async () => {
  const res = await axios.get('/api/communities')
  return res.data
}

// Get one community by ID
export const getCommunityById = async (id: string) => {
  const res = await axios.get(`/api/communities/${id}`)
  return res.data
}

// Create a new community
export const createCommunity = async (
  name: string,
  description: string,
  generic: number = 1
) => {
  const res = await axios.post('/api/communities', {
    name,
    description,
    generic
  })
  return res.data
}

// Create a new community
export const createCommunityCustom = async (
  name: string,
  description: string,
  file: File,
) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await axios.post('/api/communities/custom', {
    name,
    description,
    formData
  })
  return res.data
}

// Join a community
export const requestJoinCommunity = async (communityID: string, userID: string) => {
  const response = await axios.post(`/api/communities/${communityID}/request-join`, {
    userId: userID
  });
  return response.data;
};


// Leave a community
export const leaveCommunity = async (communityId: string, userId: string) => {
  const res = await axios.put(`/api/communities/${communityId}/leave`, {
    userId
  })
  return res.data
}

// Get all invites
export const fetchAdminInvites = async (): Promise<CommunityInvite[]> => {
  try {
    const response = await axios.get('/api/me/admin-requests');
    return response.data; // Should be an array of communities with joinRequests
  } catch (error) {
    console.error('Failed to fetch admin invites:', error);
    throw error;
  }
};

// Edit the community
export const editCommunity = async (
  id: string,
  name: string,
  description: string,
) => {
  const res = await axios.put(`/api/communities/${id}`, {
    name,
    description,
  })
  return res.data
}

// Change the photo of a community
export const editCommunityPhoto = async (
  id: string,
  file: File
) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await axios.put(`/api/communities/${id}/photo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data
}

// Delete a community
export const deleteCommunity = async (id: string) => {
  const res = await axios.delete(`/api/communities/${id}`)
  return res.data
}

export const approveJoinRequest = async (communityID: string, userID: string) => {
  const response = await axios.post(`/api/communities/${communityID}/approve-request`, {
    userId: userID
  });
  return response.data;
};

export const rejectJoinRequest = async (communityID: string, userID: string) => {
  const response = await axios.post(`/api/communities/${communityID}/reject-request`, {
    userId: userID
  });
  return response.data;
};

export const getCommunityIDWithInvite = async (return_to: string) => {
  console.log('return_to', return_to)
  const response = await axios.get(`${return_to}`);
  return response.data;
}

export const joinCommunity = async (communityID: string) => {
  const response = await axios.put(`/api/communities/${communityID}/join`);
  return response.data;
};