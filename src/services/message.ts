import axios from 'axios';

export const sendMessageToSpace = async (
  spaceId: string,
  content: string
): Promise<RawMessage> => {
  const response = await axios.post<RawMessage>(
    `/api/communities/spaces/${spaceId}/messages`,
    { content },
    { withCredentials: true }
  );
  return response.data;
};