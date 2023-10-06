import React from "react";
import { ChatMessage } from "../interfaces/conversations";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ChatBubble = ({
  message,
  fromMe,
  lastMessage,
}: {
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
            <AvatarImage src="" alt=""></AvatarImage>
            <AvatarFallback className="bg-pink-300">SC</AvatarFallback>
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
