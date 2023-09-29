"use client";

import React, { useState } from "react";
import ChatSideBar from "./components/chat-sidebar";
import ChatWindow from "./components/chat-window";
import MessageInput from "./components/message-input";
import { ChatUser, ChatMessage } from "./interfaces/conversations";

const Conversations: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [chatLogs, setChatLogs] = useState<ChatMessage[]>([
    {
      sender: 1,
      recipient: 0,
      message: "Hey, how's it going?",
      timestamp: new Date().toISOString(),
    },
    {
      sender: 2,
      recipient: 0,
      message: "I'm good, thanks! How about you?",
      timestamp: new Date().toISOString(),
    },
    {
      sender: 1,
      recipient: 0,
      message: "Not too bad. Working on some React stuff.",
      timestamp: new Date().toISOString(),
    },
  ]);

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

  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      sender: 0, // 0 represents the user
      message: message,
      timestamp: new Date().toISOString(),
      recipient: selectedUser || 0,
    };
    setChatLogs([...chatLogs, newMessage]);
  };

  return (
    <main className="container mx-auto py-3 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row rounded-md border bg-card h-full md:h-[600px] md:mt-6 p-5">
        <ChatSideBar
          users={users}
          onSelectUser={setSelectedUser}
          selectedUser={selectedUser}
        />
        <div className="flex-1 flex flex-col bg-background rounded-md">
          <ChatWindow
            users={users}
            selectedUser={selectedUser}
            chatLogs={chatLogs}
          />
          <MessageInput onSend={handleSendMessage} />
        </div>
      </div>
    </main>
  );
};

export default Conversations;
