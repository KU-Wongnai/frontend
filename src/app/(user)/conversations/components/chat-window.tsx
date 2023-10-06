import React from "react";
import { ChatWindowProps } from "../interfaces/conversations";
import ChatBubble from "./chat-bubble";

const ChatWindow: React.FC<ChatWindowProps> = ({ me, messages }) => {
  return (
    <div className="flex-1 flex flex-col bg-secondary rounded-md min-h-[500px] max-h-[500px]">
      <div className="p-3 mx-4 font-semibold border-b">
        Conversations with <span className="text-primary">Saccsos</span>
      </div>

      <div className="space-y-4 p-4 overflow-y-scroll">
        {messages.map((message, idx) => (
          <ChatBubble
            key={idx}
            message={message}
            fromMe={message.sender === me?.id}
            lastMessage={idx === messages.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
