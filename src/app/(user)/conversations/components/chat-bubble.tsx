import React from "react";
import { ChatMessage, ChatUser } from "../interfaces/conversations";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ChatBubble = ({
  message,
  fromUser,
  fromMe,
  lastMessage,
}: {
  fromUser: ChatUser | undefined;
  message: ChatMessage;
  fromMe: boolean;
  lastMessage?: boolean;
}) => {
  return (
    <div>
      <div
        className={cn("flex items-end gap-1", fromMe ? "flex-row-reverse" : "")}
      >
        {!fromMe && (
          <Avatar>
            <AvatarImage
              src={fromUser?.avatarUrl}
              alt={fromUser?.name}
            ></AvatarImage>
            <AvatarFallback className="bg-green-300">
              {fromUser?.name[0]}
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={cn(
            "rounded-lg ml-2 max-w-[300px] px-4 py-3 break-words",
            fromMe ? "bg-green-300" : "bg-gray-300"
          )}
        >
          {message.message}
        </div>
        {lastMessage && (
          <div className="text-xs text-secondary-foreground mt-2">
            {formatDistance(
              message.createdAt ? message.createdAt.toDate() : new Date(),
              new Date(),
              {
                includeSeconds: true,
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
