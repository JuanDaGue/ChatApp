import React from "react";
import { useChat } from "../../context/ChatContext";

const ChatList: React.FC = () => {
    const { chats, setSelectedChat } = useChat();
    return (
        <div>
        <h2 className="text-xl font-bold mb-3 text-gray-100">Chats</h2>
        {chats.length === 0 ? (
            <p className="text-gray-200">No active chats</p>
        ) : (
            chats.map((chat) => (
            <div
                key={chat.id}
                className="flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-200 rounded-lg transition-all"
                onClick={() => setSelectedChat(chat)}
            >
                <img
                src={chat.avatar}
                alt={chat.clientName}
                className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                <p className="font-semibold text-gray-400">{chat.clientName}</p>
                <p className="text-sm text-gray-200 truncate">{chat.lastMessage}</p>
                </div>
                <p className="text-xs text-gray-400">{chat.timestamp}</p>
            </div>
            ))
        )}
        </div>
    );
};

export default ChatList;
