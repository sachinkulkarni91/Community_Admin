// services/community.ts

import axios from 'axios'
import { getAuthHeaders } from '../utils/auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3016';

// Get all communities
export const getAllCommunities = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/communities`, {
    headers: getAuthHeaders()
  })
  return res.data
}

// Get one community by ID
export const getCommunityById = async (id: string) => {
  const res = await axios.get(`${API_BASE_URL}/api/communities/${id}`, {
    headers: getAuthHeaders()
  })
  return res.data
}

// Get one community by name
export const getCommunityByName = async (name: string) => {
  try {
    // Since backend doesn't support getting by name, we'll get all communities
    // and find the one with matching name
    const allCommunities = await getAllCommunities();
    console.log('All communities:', allCommunities);
    console.log('Looking for community with name:', name);
    
    const community = allCommunities.find((comm: any) => comm.name === name);
    
    if (!community) {
      console.log('Available community names:', allCommunities.map((c: any) => c.name));
      throw new Error(`Community with name "${name}" not found`);
    }
    
    console.log('Found community:', community);
    return community;
  } catch (error) {
    console.error('Error in getCommunityByName:', error);
    throw error;
  }
}

// Create a new community
export const createCommunity = async (
  name: string,
  description: string,
  generic: number = 1
) => {
  const res = await axios.post(`${API_BASE_URL}/api/communities`, {
    name,
    description,
    generic
  }, {
    headers: getAuthHeaders()
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

  const res = await axios.post(`${API_BASE_URL}/api/communities/custom`, {
    name,
    description,
    formData
  }, {
    headers: {
      ...getAuthHeaders(),
      // Don't set Content-Type for FormData, let axios handle it
    }
  })
  return res.data
}

// Edit the community
export const editCommunity = async (
  id: string,
  name: string,
  description: string,
) => {
  const res = await axios.put(`${API_BASE_URL}/api/communities/${id}`, {
    name,
    description,
  }, {
    headers: getAuthHeaders()
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

  const res = await axios.put(`${API_BASE_URL}/api/communities/${id}/photo`, formData, {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data
}

// Change the photo of a community by name
export const editCommunityPhotoByName = async (
  name: string,
  file: File
) => {
  // Get community by name to find its ID
  const community = await getCommunityByName(name);
  
  const formData = new FormData();
  formData.append('image', file);

  const res = await axios.put(`${API_BASE_URL}/api/communities/${community.id}/image`, formData, {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return res.data;
}

// Edit the community by name
export const editCommunityByName = async (
  name: string,
  newName: string,
  description: string,
) => {
  // Get community by name to find its ID
  const community = await getCommunityByName(name);
  
  const res = await axios.put(`${API_BASE_URL}/api/communities/${community.id}`, {
    name: newName,
    description: description,
  }, {
    headers: getAuthHeaders()
  });
  
  return res.data;
}

// Delete a community by name
export const deleteCommunityByName = async (name: string) => {
  // Get community by name to find its ID
  const community = await getCommunityByName(name);
  return deleteCommunity(community.id);
}

// Delete a community
export const deleteCommunity = async (id: string) => {
  const res = await axios.delete(`${API_BASE_URL}/api/communities/${id}`, {
    headers: getAuthHeaders()
  })
  return res.data
}