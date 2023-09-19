"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ChatUser = {
  id: number;
  name: string;
  avatarUrl: string;
};

type ChatMessage = {
  sender: number;
  message: string;
  timestamp: string;
};

const Conversations: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [timeString, setTimeString] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const [chatLogs, setChatLogs] = useState<ChatMessage[]>([
    {
      sender: 1,
      message: "Hey, how's it going?",
      timestamp: new Date().toISOString(),
    },
    {
      sender: 2,
      message: "I'm good, thanks! How about you?",
      timestamp: new Date().toISOString(),
    },
    {
      sender: 1,
      message: "Not too bad. Working on some React stuff.",
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: ChatMessage = {
        sender: 0, // 0 represents you, the user
        message: inputValue,
        timestamp: new Date().toISOString(),
      };
      setChatLogs([...chatLogs, newMessage]);
      setInputValue("");
    }
  };

  return (
    <main className="container mx-auto py-3 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="flex rounded-2xl h-screen">
        {/* Side-bar */}
        <aside className="w-1/4 bg-card rounded-l-2xl">
          <div className="p-4 text-white">Chat Contacts</div>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className={`flex items-center p-4 hover:bg-muted ${
                  selectedUser === user.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedUser(user.id)}
              >
                <Avatar>
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>alt={user.name}</AvatarFallback>
                </Avatar>
                <div className="ml-3">{user.name}</div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat section */}
        <div className="flex-1 flex flex-col bg-background rounded-r-2xl">
          <div className="p-4 bg-card">
            Conversations with{" "}
            {selectedUser
              ? users.find((u) => u.id === selectedUser)?.name
              : "Select user"}
          </div>

          <div className="flex-1 overflow-y-scroll">
            {chatLogs.map((log, idx) => (
              <div
                key={idx}
                className={`m-4 p-3 rounded-md shadow-md flex items-start ${
                  log.sender === 0
                    ? " justify-end"
                    : "flex-row justify-start"
                }`}
              >
                <div
                  className={`flex ${log.sender === 0 ? "flex-row-reverse" : ""}`}
                >
                  <Avatar
                    className={`self-start ${
                      log.sender === 0 ? "ml-4" : "mr-4"
                    }`}
                  >
                    <AvatarImage
                      src={
                        log.sender === 0
                          ? "YourAvatarURLHere"
                          : users.find((u) => u.id === log.sender)?.avatarUrl
                      }
                    />
                    <AvatarFallback>
                      {users.find((u) => u.id === log.sender)?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`flex-initial rounded-md shadow-md p-2 ${
                      log.sender === 0 ? "bg-primary" : "bg-muted"
                    }`}
                    style={{ maxWidth: "max-content", width: "max-content" }}
                  >
                    {log.message}
                    <div className="text-xs mt-2">
                      {isMounted &&
                        new Date(log.timestamp).toLocaleTimeString("en-US", {
                          hour12: false,
                        })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-card">
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-3 mr-4 rounded-md shadow-md"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Conversations;
