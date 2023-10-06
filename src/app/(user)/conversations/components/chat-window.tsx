import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatWindowProps } from "../interfaces/conversations";

const ChatWindow: React.FC<ChatWindowProps> = ({ me, messages }) => {
  return (
    <div className="flex-1 flex flex-col bg-secondary rounded-md min-h-[500px] max-h-[500px]">
      {/* <div className="p-3 mx-4 font-semibold border-b">
        Conversations with{" "}
        <span className="text-primary">
          {messages.
            ? users.find((u) => u.id === selectedUser)?.name
            : "Select user"}
        </span>
      </div> */}

      <div className="flex-1 overflow-y-scroll">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`m-4 p-3 flex items-start ${
              message.sender === 0 ? "justify-end" : "flex-row justify-start"
            }`}
          >
            <div className={`${message.sender === me.id ? "ml-auto" : ""}`}>
              {/* <Avatar
                className={`self-start ${message.sender === 0 ? "ml-4" : "mr-4"}`}
              >
                <AvatarImage
                  src={users.find((u) => u.id === message.sender)?.avatarUrl}
                />
                <AvatarFallback>
                  {users.find((u) => u.id === message.sender)?.name.charAt(0)}
                </AvatarFallback>
              </Avatar> */}
              <div
                className={`flex-initial rounded-sm shadow-sm p-2 border ${
                  message.sender === me.id ? "bg-primary" : "bg-card"
                }`}
              >
                {message.message}
                <div className="text-xs text-secondary-foreground mt-2">
                  {new Date(message.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
