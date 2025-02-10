import React, { useState, useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import { io } from "socket.io-client";

const socket = io("/");

const ChatWindow: React.FC = () => {
    const { selectedChat, setChats, chats } = useChat();
    const [message, setMessage] = useState("");
    console.log(JSON.parse(localStorage.getItem("messages") || "[]"));
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", sender: "agent" },
        { text: "Hi! I need help with my account.", sender: "client" },
        { text: "Of course! What issue are you experiencing?", sender: "agent" }
    ]);

    useEffect(() => {
        // Listen for messages
        
        const handleMessage = (data: string) => {
            setMessages(prevMessages => [...prevMessages, { text: data, sender: "client" }]);
        };

        socket.on("message", handleMessage);

        // Cleanup event listener
        return () => {
            socket.off("message", handleMessage);
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() === "") return;

        // Emit message to server
        socket.emit("message", message);

        // Update UI state
        setMessages(prevMessages => [...prevMessages, { text: message, sender: "agent" }]);

        // Update chat state
        const updatedChats = chats.map((chat) =>
            chat.id === selectedChat?.id
                ? { ...chat, messages: [...chat.messages, { text: message, sender: "agent" }] }
                : chat
        );
        setChats(updatedChats);
        setMessage("");
    };

    if (!selectedChat) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500 text-xl">
                Select a chat to start messaging
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center gap-3">
                <img
                    src={selectedChat.avatar}
                    alt={selectedChat.clientName}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <h2 className="text-xl font-semibold">{selectedChat.clientName}</h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}>
                        <p className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === "agent" ? "bg-gray-800  text-white" : "bg-gray-200 text-gray-900"}`}>
                            {msg.text}
                        </p>
                    </div>
                ))}
            </div>

            {/* Input Field */}
            <div className="p-4 border-t flex">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
