import React from "react";

type ChatMessageProps = {
    text: string;
    sender: "agent" | "client";
};

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender }) => {
    const isAgent = sender === "agent";
    return (
        <div className={`p-2 my-1 rounded ${isAgent ? "bg-blue-200 self-end" : "bg-gray-200 self-start"}`}>
        <p className="text-sm">{text}</p>
        </div>
    );
};

export default ChatMessage;
