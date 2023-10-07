"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Plus } from "lucide-react";
import { ComboboxChatUser } from "./combobox-chat-user";
import { ChatRoom, ChatSideBarProps } from "../interfaces/conversations";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NewChat from "./new-chat";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuthStore from "@/contexts/auth-store";
import Link from "next/link";

const ChatSideBar: React.FC<ChatSideBarProps> = ({
  users,
  selectedUser,
  // onSelectUser,
}) => {
  const me = useAuthStore((state) => state.user);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const roomsRef = collection(db, "rooms");

  useEffect(() => {
    const roomsQuery = query(
      roomsRef,
      where("users", "array-contains", me?.id)
    );

    const unsuscribe = onSnapshot(roomsQuery, (snapshot) => {
      const rooms: ChatRoom[] = [];
      snapshot.forEach((doc) => {
        const room = doc.data();
        const otherUser = room.users.find((user: number) => user !== me?.id);
        rooms.push({
          id: doc.id,
          to: {
            id: otherUser,
            name: "Alice",
            avatarUrl: `https://ui-avatars.com/api/?name=${otherUser}&background=random`,
          },
        });
      });
      setRooms(rooms);
    });

    return () => unsuscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside className="w-full relative md:w-1/3 border-r bg-card mb-4 md:mb-0 overflow-y-scroll">
      <div className="sticky top-0 bg-card z-10 border-b">
        <div className="flex items-center gap-2 p-4">
          <h1 className="text-xl font-semibold tracking-tight transition-colors first:mt-0">
            Messages
          </h1>
          <MessageCircle className="w-4 h-4" />
          <NewChat />
        </div>
        <div className="px-4 pb-4 pt-2">
          <Input placeholder="Search by name" className="bg-secondary" />
        </div>
      </div>
      <ul className="hidden md:flex md:flex-col">
        {rooms.map((room) => (
          <li key={room.id}>
            <Link
              href={`/conversations/${room.id}`}
              className="flex items-center p-4 hover:bg-muted border-b"
            >
              <Avatar>
                <AvatarImage src={room.to.avatarUrl} />
                <AvatarFallback>{room.to.id}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-bold">{room.to.id}</p>
                <span className="text-sm text-gray-600">Hi</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChatSideBar;
