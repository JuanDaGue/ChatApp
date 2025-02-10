import React from "react";
import { ChatList } from "../ChatList";
import { ChatWindow } from "../ChatWindow";

const ChatLayout: React.FC = () => {
    return (
        <div className="flex flex-col h-screen w-full md:flex-row">
            {/* Sidebar for Chat List */}
            <aside className="w-full md:w-1/4 border-r p-3 overflow-y-auto h-full">
                <ChatList />
            </aside>
            {/* Chat Window covering the remaining width */}
            <main className="w-full md:w-3/4 p-4 flex flex-col overflow-y-auto h-full">
                <div className="flex-1 flex justify-center items-center">
                    <ChatWindow />
                </div>
            </main>
        </div>
    );
};

export default ChatLayout;
