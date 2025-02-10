import React from 'react';
import { ChatMessagesProps } from "../../../types/types";

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading, isTyping }) => (
    <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-4">
        {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}>
                <p className={`px-2 md:px-4 py-1 md:py-2 rounded-lg max-w-xs md:max-w-md ${msg.sender === "agent" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"}`}>
                    {msg.text}
                </p>
            </div>
        ))}

        {isLoading && <p className="text-gray-500">Thinking...</p>}
        {isTyping && (
            <div className="flex justify-start">
                <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg bg-gray-300 text-gray-900 italic flex items-center">
                    <span>Client is typing</span>
                    <span className="animate-pulse ml-1">...</span>
                </div>
            </div>
        )}
    </div>
);

export default ChatMessages;
