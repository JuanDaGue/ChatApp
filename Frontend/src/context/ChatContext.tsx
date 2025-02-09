import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Chat = {
  id: string;
  clientName: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  messages: { text: string; sender: "agent" | "client" }[];
};

const defaultChats: Chat[] = [
  {
    id: "1",
    clientName: "Alice Johnson",
    lastMessage: "Thank you!",
    timestamp: "10:30 AM",
    avatar: "../../public/user1.png",
    messages: [
      { text: "Hello, I need help with my order.", sender: "client" },
      { text: "Sure! What seems to be the issue?", sender: "agent" },
      { text: "The tracking number isn’t working.", sender: "client" },
      { text: "I’ll check that for you.", sender: "agent" },
      { text: "Thank you!", sender: "client" },
    ],
  },
  {
    id: "2",
    clientName: "Michael Smith",
    lastMessage: "I’ll try that. Thanks!",
    timestamp: "9:15 AM",
    avatar: "../../public/user2.png",
    messages: [
      { text: "Hey, my account is locked.", sender: "client" },
      { text: "Try resetting your password.", sender: "agent" },
      { text: "I’ll try that. Thanks!", sender: "client" },
    ],
  },
];

type ChatContextType = {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  selectedChat: Chat | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
};

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
