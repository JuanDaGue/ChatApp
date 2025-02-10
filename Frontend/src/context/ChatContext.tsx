import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Chat, ChatContextType } from "../types/types";
import { defaultChats } from "./defaultChats"; 

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [chats, setChats] = useState<Chat[]>(() => {
    const savedChats = localStorage.getItem("chats");
    return savedChats ? JSON.parse(savedChats) : defaultChats;
  });
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  return (
    <ChatContext.Provider value={{ chats, setChats, selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};
