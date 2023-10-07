"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageInputProps } from "../interfaces/conversations";
import { cn } from "@/lib/utils";

const MessageInput: React.FC<MessageInputProps> = ({
  className,
  onSend,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue("");
    }
  };

  return (
    <form
      onSubmit={handleSendMessage}
      {...props}
      className={cn("flex items-center p-4", className)}
    >
      <Input
        type="text"
        placeholder="Type your message..."
        className="flex-1 p-3 mr-4 rounded-md shadow-md"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="submit" disabled={!inputValue.trim()}>
        Send
      </Button>
    </form>
  );
};

export default MessageInput;
