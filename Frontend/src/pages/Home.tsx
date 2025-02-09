import React, { useEffect, useState } from "react";
// import { ChatList } from "../components/ChatList";
import { ChatWindow } from "../components/ChatWindow";
import { ChatProvider, useChat } from "../context/ChatContext";
import { ChatLayout } from "../components/ChatLayout"; // Import ChatLayout component
// import { io } from "socket.io-client";

// const socket = io("/");
const Home: React.FC = () => {
  return (
    <ChatProvider>
      <div>
        {/* <ChatList />
        <ChatWindow /> */}
        <ChatLayout/>
        {/* <ChatSection /> */}
      </div>
    </ChatProvider>
  );
};

const ChatSection: React.FC = () => {
  const { selectedChat, chats, setChats } = useChat();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // For testing
  console.log(chats);
  // socket.emit('message', message);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  //   if (!message.trim() || !selectedChat) return console.log("No message or chat selected");
    
  //   const updatedChats = chats.map((chat) =>
  //     chat.id === selectedChat.id
  //   ? { ...chat, messages: [...chat.messages, { text: message, sender: "agent" as "agent" }] }
  //   : chat
  // );
  
  // console.log(message);
  // setChats(updatedChats);
  // localStorage.setItem("chats", JSON.stringify(updatedChats));
  // setMessage("");
  };

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
      setMessages(...messages, message);
      // const updatedChats = chats.map((chat) =>
      //   chat.id === selectedChat.id
      //     ? { ...chat, messages: [...chat.messages, { text: data, sender: "client" as "client" }] }
      //     : chat
      // );
      // setChats(updatedChats);
    });
  }, []);

  return (
    <div className="flex flex-col w-2/3">
      <ChatWindow />
      <form className="p-4 bg-white border-t flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </form>
      <ul>
        {messages?.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
