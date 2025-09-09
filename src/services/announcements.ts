// Announcement service for API calls
import axios from 'axios';
import { getAuthHeaders } from '../utils/auth';

export interface Announcement {
  id?: number;
  header: string;
  subcontent?: string;
}

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/announcements`;

export const getAnnouncements = async (): Promise<Announcement[]> => {
  const res = await axios.get(API_URL, {
    headers: getAuthHeaders()
  });
  return res.data as Announcement[];
}

export const createAnnouncement = async (header: string, subcontent: string): Promise<Announcement> => {
  // Backend now expects { header, subcontent }
  const res = await axios.post(API_URL, { header, subcontent }, {
    headers: getAuthHeaders()
  });
  return res.data as Announcement;
};

export const deleteAnnouncement = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeaders()
  });
};

