import React from "react";
import { useChat } from "../../context/ChatContext";

const ChatList: React.FC = () => {
    const { chats, setSelectedChat } = useChat();
    return (
        <div className="p-2 sm:p-3" style={{ backgroundColor: '#242424' }}>
            <div className="sticky top-0 z-10 p-2 sm:p-3 border-b bg-[#242424]">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gray-100">Chats</h2>
            </div>
            {chats.length === 0 ? (
                <p className="text-sm sm:text-base text-gray-200">No active chats</p>
            ) : (
                chats.map((chat) => (
                    <div
                        key={chat.id}
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-b cursor-pointer hover:bg-gray-200 rounded-lg transition-all"
                        onClick={() => setSelectedChat(chat)}
                    >
                        <img
                            src={chat.avatar}
                            alt={chat.clientName}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <p className="font-semibold text-sm sm:text-base text-gray-400">{chat.clientName}</p>
                            <p className="max-w-xs sm:max-w-sm text-xs sm:text-sm text-gray-400">{chat.timestamp}</p>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400">{chat.timestamp}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ChatList;
