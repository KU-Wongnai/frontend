"use client";

import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Plus } from "lucide-react";
import { ChatRoom, ChatSideBarProps } from "../interfaces/conversations";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import NewChat from "./new-chat";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuthStore from "@/contexts/auth-store";
import Link from "next/link";
import { findUserBy } from "@/services/user";
import { formatDistance, set } from "date-fns";
import { useParams } from "next/navigation";
import ChatListSkeleton from "./chat-list-skeleton";

const ChatSideBar: React.FC<ChatSideBarProps> = () => {
  const me = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<ChatRoom[]>([]);
  const roomsRef = collection(db, "rooms");
  const params = useParams();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const roomsQuery = query(
      roomsRef,
      where("users", "array-contains", me?.id),
      orderBy("updatedAt", "desc")
    );

    const unsubscribe = onSnapshot(roomsQuery, async (snapshot) => {
      const rooms: ChatRoom[] = [];

      for (const doc of snapshot.docs) {
        const room = doc.data();
        const otherUserId = room.users.find((user: number) => user !== me?.id);
        let otherUser;

        try {
          otherUser = await findUserBy(otherUserId);
        } catch (err) {
          continue; // skip if user not found
        }

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
      setLoading(false);
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
    <aside
      className={cn(
        "w-full relative border-r bg-card overflow-y-scroll",
        params.roomId
          ? "hidden md:block md:col-span-3"
          : "col-span-12 md:col-span-3"
      )}
    >
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
      <ul className="flex flex-col">
        {loading ? (
          <ChatListSkeleton />
        ) : filteredRooms.length > 0 ? (
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
                    <AvatarFallback className="bg-green-300 dark:bg-green-600">
                      {room.to.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-bold">{room.to.name}</p>
                    <span className="text-sm text-gray-600 dark:text-gray-300 overflow-hidden whitespace-nowrap max-w-[16ch] inline-block">
                      {room.lastMessage}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-300 ml-auto">
                    {room.updatedAt
                      ? formatDistance(room.updatedAt?.toDate(), new Date())
                      : null}
                  </span>
                </Link>
              </li>
            ))}
          </>
        ) : (
          <div className="text-center py-12 text-sm text-gray-600 dark:text-gray-300">
            No chat
          </div>
        )}
      </ul>
    </aside>
  );
};

export default ChatSideBar;
