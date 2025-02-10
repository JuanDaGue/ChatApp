import React from 'react';
import { Chat } from "../../types";

interface ChatHeaderProps {
  selectedChat: Chat;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedChat }) => (
    <div className="sticky top-0 z-10 p-4 border-b flex items-center gap-3" style={{ backgroundColor: '#242424' }}>
        <img
            src={selectedChat.avatar}
            alt={selectedChat.clientName}
            className="w-12 h-12 rounded-full object-cover"
        />
        <h2 className="text-xl font-semibold text-white">{selectedChat.clientName}</h2>
    </div>
);

export default ChatHeader;
