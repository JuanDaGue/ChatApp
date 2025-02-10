import React, { useState, useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatInput from "./ChatInput/ChatInput";
import { io } from "socket.io-client";
const socket = io("/");

const ChatWindow: React.FC = () => {
    const { selectedChat,  setChats } = useChat();
    const [isTyping, setIsTyping] = useState(false);
    const [loading, setLoading] = useState(false);
    //console.log(selectedChat, isTyping, loading);

    useEffect(() => {
        const handleMessage = (data: { text: string; chatId: string }) => {
        setChats(prevChats =>
            prevChats.map(chat =>
            chat.id === data.chatId
                ? { ...chat, messages: [...chat.messages, { text: data.text, sender: "client" }] }
                : chat
            )
        );
        };

        socket.on("message", handleMessage);
        socket.on("typing", () => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
        });

        return () => {
        socket.off("message", handleMessage);
        socket.off("typing");
        };
    }, [setChats]);

    if (!selectedChat) {
        return (
        <div className="flex items-center justify-center h-full text-gray-500 text-lg md:text-xl">
            Select a chat to start messaging
        </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
        <ChatHeader selectedChat={selectedChat} />
        <ChatMessages messages={selectedChat.messages} isLoading={loading} isTyping={isTyping} />
        <ChatInput
            selectedChat={selectedChat}
            setIsTyping={setIsTyping}
            setLoading={setLoading}
        />
        </div>
    );
    };

export default ChatWindow;
