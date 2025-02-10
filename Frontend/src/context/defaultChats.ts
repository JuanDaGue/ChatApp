import { Chat } from "../types/types";

export const defaultChats: Chat[] = [
  {
    id: "1",
    clientName: "Alice Johnson",
    lastMessage: "Thank you!",
    timestamp: "10:30 AM",
    avatar: "/user1.png",
    messages: [
      { text: "Hello, I need help with my order.", sender: "client" },
      { text: "Sure! What seems to be the issue?", sender: "agent" },
      { text: "The tracking number isn’t working.", sender: "client" },
      { text: "I’ll check that for you.", sender: "agent" },
      { text: "Thank you!", sender: "client" },
    ],
    isAIChat: false,
  },
  {
    id: "2",
    clientName: "Michael Smith",
    lastMessage: "I’ll try that. Thanks!",
    timestamp: "9:15 AM",
    avatar: "/user2.png",
    messages: [
      { text: "Hey, my account is locked.", sender: "client" },
      { text: "Try resetting your password.", sender: "agent" },
      { text: "I’ll try that. Thanks!", sender: "client" },
    ],
    isAIChat: false,
  },
  {
    id: "3",
    clientName: "AI Assistant",
    lastMessage: "Hello! How can I assist you today?",
    timestamp: "9:00 AM",
    avatar: "/Captura.PNG",
    messages: [
      { text: "Hello! How can I assist you today?", sender: "agent" },
    ],
    isAIChat: true, // This chat is AI-based
  },
];
