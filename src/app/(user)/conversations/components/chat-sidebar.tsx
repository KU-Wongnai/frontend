import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import { ComboboxChatUser } from "./combobox-chat-user";
import { ChatSideBarProps } from "../interfaces/conversations";

const ChatSideBar: React.FC<ChatSideBarProps> = ({
  users,
  selectedUser,
  onSelectUser,
}) => {
  return (
    <aside className="w-full md:w-1/4 bg-card rounded-l-md md:pr-5 mb-4 md:mb-0">
      <div className="flex gap-2 border-b">
        <h1 className="pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary">
          Chat Contacts
        </h1>
        <MessageCircle className="text-green-600 w-8 h-8" />
      </div>
      {/* This is the combobox for mobile */}
      <div className="md:hidden mt-4">
        <ComboboxChatUser
          data={users}
          onSelect={(user) => {
            if (user) {
              onSelectUser(user.id);
            } else {
              onSelectUser(null);
            }
          }}
        />
      </div>
      <ul className="hidden md:flex md:flex-col mt-2 gap-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className={`flex items-center p-4 hover:bg-muted rounded-sm ${
              selectedUser === user.id ? "bg-muted" : ""
            }`}
            onClick={() => onSelectUser(user.id)}
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
  );
};

export default ChatSideBar;
