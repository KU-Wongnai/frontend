"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageInputProps } from "../interfaces/conversations";

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="pt-4 bg-card rounded-br-md">
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
  );
};

export default MessageInput;
