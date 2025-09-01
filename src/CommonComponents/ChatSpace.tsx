import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import { useUser } from '../Contexts/UserContext'
import socket from '../utils/socket'
type Props = {
  space: RawSpace
}
// The chat space that handles message sending and receiving
const ChatSpace = ({space} : Props) => {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<RawMessage[]>(space.messages);
  const {user} = useUser()

// Join the chat space and set up message handling
 useEffect(() => {
  socket.emit("join-space", space.id);

  const messageHandler = (msg: RawMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  socket.off("new-message", messageHandler); // ensure no duplicate
  socket.on("new-message", messageHandler);

  return () => {
    socket.emit("leave-space", space.id);
    socket.off("new-message", messageHandler);
  };
}, [space]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If new messages are received, scroll to the bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a new message
  const handleSend = () => {
    if (newMessage.trim()) {
      socket.emit("send-message", {
        spaceID: space.id,
        content: newMessage,
        sender: user?.id,
      });
      setNewMessage("");
    }
  };

  return (
    <div className='flex-3/5 h-[95%] bg-primary py-4 px-6 rounded-4xl mr-4 flex flex-col'>
      <div className='font-bold text-3xl mt-4 mb-8 font-condensed flex justify-between text-text'>
        {space.name}

        <svg width="32" height="32" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className='flex flex-col flex-1 overflow-hidden'>
        <div className='flex flex-col overflow-hidden gap-3'>
          {messages.map((m, index) => {return index === messages.length - 1 ?<Message profilePhoto={m.sender.profilePhoto} user={m.sender.name} ref={messagesEndRef} key={m.id} self={m.sender.username === user?.username} content={m.content}></Message> : <Message profilePhoto={m.sender.profilePhoto} user={m.sender.name} key={m.id} self={m.sender.username === user?.username} content={m.content}></Message>})}
        </div>

        <div className='mt-auto mb-6 w-full bg-secondary rounded-lg relative flex overflow-hidden text-text'>
          <input className='w-[90%] outline-none px-6 py-5 ' type="text" placeholder="New Message" value={newMessage} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setNewMessage(e.currentTarget.value)}}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
          <svg className='absolute right-10 top-[25%] text-lightText' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 -960 960 960" fill='currentColor' onClick={handleSend}><path d="M120-160v-640l760 320zm80-120 474-200-474-200v140l240 60-240 60zm0 0v-400z"/></svg>
        </div>
      </div>

      

    </div>

    
  )
}

export default ChatSpace