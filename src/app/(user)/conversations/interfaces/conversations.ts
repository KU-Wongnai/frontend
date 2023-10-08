import { User } from "@/interfaces/user";
import { Timestamp } from "firebase/firestore";

export interface ChatUser {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface ChatRoom {
  id: string;
  to: ChatUser;
  lastMessage?: string;
  updatedAt?: Timestamp;
}

export interface ChatMessage {
  sender: number;
  recipient: number;
  message: string;
  createdAt: Timestamp;
}

export interface MessageInputProps extends React.HTMLProps<HTMLFormElement> {
  className?: string;
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

}
