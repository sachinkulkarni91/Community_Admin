import { io } from "socket.io-client";
const baseURL = import.meta.env.VITE_API_BASE_URL;

// Handle socket connections with socket.io
const socket = io(baseURL, { 
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;