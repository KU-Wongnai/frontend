"use client";

import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Plus } from "lucide-react";
import { ChatRoom, ChatSideBarProps } from "../interfaces/conversations";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import NewChat from "./new-chat";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuthStore from "@/contexts/auth-store";
import Link from "next/link";
import { findUserBy } from "@/services/user";
import { formatDistance, set } from "date-fns";
import { useParams } from "next/navigation";

const ChatSideBar: React.FC<ChatSideBarProps> = () => {
  const me = useAuthStore((state) => state.user);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<ChatRoom[]>([]);
  const roomsRef = collection(db, "rooms");
  const params = useParams();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const roomsQuery = query(
      roomsRef,
      where("users", "array-contains", me?.id)
    );

    const unsubscribe = onSnapshot(roomsQuery, async (snapshot) => {
      const rooms: ChatRoom[] = [];

      for (const doc of snapshot.docs) {
        const room = doc.data();
        const otherUserId = room.users.find((user: number) => user !== me?.id);
        const otherUser = await findUserBy(otherUserId);
        rooms.push({
          id: doc.id,
          lastMessage: room.lastMessage,
          updatedAt: room.updatedAt,
          to: {
            id: otherUser.id,
            name: otherUser.name,
            avatarUrl: otherUser.user_profile?.avatar,
          },
        });
      }

      setRooms(rooms);
      setFilteredRooms(
        rooms.filter((room) =>
          room.to.name
            .toLowerCase()
            .includes(searchRef.current?.value.toLowerCase() || "")
        )
      );
    });

    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredRooms(
      rooms.filter((room) =>
        room.to.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

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
          <Input
            ref={searchRef}
            placeholder="Search by name"
            className="bg-secondary"
            onChange={handleSearch}
          />
        </div>
      </div>
      <ul className="hidden md:flex md:flex-col">
        {filteredRooms.length > 0 ? (
          <>
            {filteredRooms.map((room) => (
              <li key={room.id}>
                <Link
                  href={`/conversations/${room.id}`}
                  className={cn(
                    "flex items-center p-4 hover:bg-muted border-b",
                    params.roomId === room.id ? "bg-muted" : ""
                  )}
                >
                  <Avatar>
                    <AvatarImage src={room.to.avatarUrl} />
                    <AvatarFallback className="bg-green-300">
                      {room.to.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-bold">{room.to.name}</p>
                    <span className="text-sm text-gray-600">
                      {room.lastMessage}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 ml-auto">
                    {room.updatedAt
                      ? formatDistance(room.updatedAt?.toDate(), new Date())
                      : null}
                  </span>
                </Link>
              </li>
            ))}
          </>
        ) : (
          <div className="text-center py-12 text-sm text-gray-600">No chat</div>
        )}
      </ul>
    </aside>
  );
};

export default ChatSideBar;
