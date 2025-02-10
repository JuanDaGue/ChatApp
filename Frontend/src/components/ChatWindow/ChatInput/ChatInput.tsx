import React, { useState } from 'react';
import { io } from "socket.io-client";
import { fetchAIResponse } from "../../ChatIA/api";
import { ChatInputProps } from "../../../types/types";
import { useChat } from "../../../context/ChatContext";

const socket = io("/");

const ChatInput: React.FC<ChatInputProps> = ({ selectedChat, setIsTyping, setLoading }) => {
    const { setChats } = useChat();
    const [message, setMessage] = useState("");

    const sendMessage = async () => {
        if (message.trim() === "") return;

        if (selectedChat.isAIChat) {
            // Handle AI-based chat
            socket.emit("message", { text: message, chatId: selectedChat.id });
            setChats(prevChats =>
                prevChats.map(chat =>
                    chat.id === selectedChat.id
                        ? { ...chat, messages: [...chat.messages, { text: message, sender: "client" }] }
                        : chat
                )
            );
            setMessage("");
            try {
                setLoading(true);
                const botReply = await fetchAIResponse(message);
                setChats(prevChats =>
                    prevChats.map(chat =>
                        chat.id === selectedChat.id
                            ? { ...chat, messages: [...chat.messages, { text: botReply, sender: "agent" }] }
                            : chat
                    )
                );
                setLoading(false);
            } catch (error) {
                console.error("Error fetching AI response:", error);
                setLoading(false);
            }
            setIsTyping(false);
        } else {
            // Handle regular chat
            socket.emit("message", { text: message, chatId: selectedChat.id });
            setChats(prevChats =>
                prevChats.map(chat =>
                    chat.id === selectedChat.id
                        ? { ...chat, messages: [...chat.messages, { text: message, sender: "agent" }] }
                        : chat
                )
            );
            setMessage("");
            setIsTyping(false);
        }
    };

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
        if (e.target.value.length > 0) {
            socket.emit("typing");
        }
    };

    return (
        <div className="p-4 border-t flex">
            <input
                type="text"
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type a message..."
                value={message}
                onChange={handleTyping}
                onKeyDown={(e) => e.key ==="Enter" && sendMessage()}
            />
            <button
                onClick={sendMessage}
                className="ml-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;
