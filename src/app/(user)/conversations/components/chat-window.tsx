import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatWindowProps } from "../interfaces/conversations";

const ChatWindow: React.FC<ChatWindowProps> = ({
  users,
  chatLogs,
  selectedUser,
}) => {

  return (
    <div className="flex-1 flex flex-col bg-background rounded-md min-h-[500px] max-h-[500px]">
      <div className="p-3 mx-4 font-semibold border-b">
        Conversations with{" "}
        <span className="text-primary">
          {selectedUser
            ? users.find((u) => u.id === selectedUser)?.name
            : "Select user"}
        </span>
      </div>

      <div className="flex-1 overflow-y-scroll">
        {chatLogs
          .filter(
            (log) =>
              (log.sender === selectedUser && log.recipient === 0) ||
              (log.sender === 0 && log.recipient === selectedUser)
          )
          .map((log, idx) => (
            <div
              key={idx}
              className={`m-4 p-3 flex items-start ${
                log.sender === 0 ? "justify-end" : "flex-row justify-start"
              }`}
            >
              <div
                className={`flex ${log.sender === 0 ? "flex-row-reverse" : ""}`}
              >
                <Avatar
                  className={`self-start ${log.sender === 0 ? "ml-4" : "mr-4"}`}
                >
                  <AvatarImage
                    src={users.find((u) => u.id === log.sender)?.avatarUrl}
                  />
                  <AvatarFallback>
                    {users.find((u) => u.id === log.sender)?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex-initial rounded-sm shadow-sm p-2 ${
                    log.sender === 0 ? "bg-primary" : "bg-muted"
                  }`}
                >
                  {log.message}
                  <div className="text-xs text-secondary-foreground mt-2">
                    {new Date(log.timestamp).toLocaleString("en-US", {
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
