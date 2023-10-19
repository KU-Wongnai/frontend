import React from "react";
import { ChatUser } from "./interfaces/conversations";
import ChatSideBar from "./components/chat-sidebar";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="md:container mx-auto py-0 md:py-12">
      <div className="grid grid-cols-12 h-[600px] rounded-sm border overflow-hidden">
        <ChatSideBar />
        {children}
      </div>
    </main>
  );
};

export default ChatLayout;
