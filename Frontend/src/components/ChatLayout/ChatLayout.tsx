import React from "react";
import {ChatList} from "../ChatList";
import {ChatWindow} from "../ChatWindow";

const ChatLayout: React.FC = () => {
    return (
        <div className="flex h-screen w-full">
            {/* Sidebar for Chat List */}
            <aside className="w-1/4 border-r shadow-md p-3">
                <ChatList />
            </aside>
            {/* Chat Window covering the remaining width */}
            <main className="w-3/4 p-4 flex flex-col">
                <div className="flex-1 flex justify-center items-center">
                    <ChatWindow />
                </div>
            </main>
        </div>
    );
};

export default ChatLayout;
