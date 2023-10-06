import React from "react";
import { ChatUser } from "./interfaces/conversations";
import ChatSideBar from "./components/chat-sidebar";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const users: ChatUser[] = [
    {
      id: 1,
      name: "Alice",
      avatarUrl: "https://ui-avatars.com/api/?name=Alice&background=random",
    },
    {
      id: 2,
      name: "Bob",
      avatarUrl: "https://ui-avatars.com/api/?name=Bob&background=random",
    },
    {
      id: 3,
      name: "Charlie",
      avatarUrl: "https://ui-avatars.com/api/?name=Charlie&background=random",
    },
  ];

  return (
    <main className="container mx-auto py-3 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row rounded-md border bg-card h-full md:h-[600px] md:mt-6 p-5">
        <ChatSideBar users={users} selectedUser={0} />
        {children}
      </div>
    </main>
  );
};

export default ChatLayout;
