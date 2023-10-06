import { User } from "@/app/interfaces/user";

export interface ChatUser {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface ChatMessage {
  sender: number;
  recipient: number;
  message: string;
  createdAt: string;
}

export interface MessageInputProps {
  onSend: (message: string) => void;
}

export interface ComboboxChatUserProps {
  data: ChatUser[];
  onSelect: (user: ChatUser | null) => void;
}

export interface ChatWindowProps {
  me: User;
  messages: ChatMessage[];
  // selectedUser: number | null;
}

export interface ChatSideBarProps {
  users: ChatUser[];
  selectedUser: number | null;
  // onSelectUser: (id: number | null) => void;
}
