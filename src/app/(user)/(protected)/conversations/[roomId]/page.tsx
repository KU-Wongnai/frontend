"use client";

import React, { useEffect, useRef, useState } from "react";
import MessageInput from "../components/message-input";
import useAuthStore from "@/contexts/auth-store";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { ChatMessage, ChatRoom } from "../interfaces/conversations";
import { notFound, useParams } from "next/navigation";
import ChatBubble from "../components/chat-bubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { findUserBy } from "@/services/user";
import { sendMessage } from "@/services/chat";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Room = () => {
  const me = useAuthStore((state) => state.user);
  const params = useParams();
  const [messages, setmessages] = useState<ChatMessage[]>([]);
  const [room, setRoom] = useState<ChatRoom>();
  const [found, setFound] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const roomsRef = doc(collection(db, "rooms"), params.roomId as string);

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesRef = collection(roomsRef, "messages");

  const handleSendMessage = async (message: string) => {
    await sendMessage(params.roomId as string, me!.id, message);
  };

  useEffect(() => {
    getDoc(roomsRef).then(async (doc) => {
      if (!doc.exists()) {
        setFound(false);
        return;
      }
      const room = doc.data();
      const otherUserId = room?.users.find((user: number) => user !== me?.id);
      const otherUser = await findUserBy(otherUserId);
      setRoom({
        id: doc.id,
        to: {
          id: otherUser.id,
          name: otherUser.name,
          avatarUrl: otherUser.user_profile?.avatar,
        },
      });
      setLoading(false);
    });

    const queryMessage = query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        messages.push(doc.data() as ChatMessage);
      });
      setmessages(messages);
    });

    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Scroll to bottom of a chat window
    chatRef.current?.scroll({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      {found ? (
        <div
          ref={chatRef}
          className="relative col-span-12 md:col-span-9 flex flex-col bg-secondary overflow-y-scroll w-full"
        >
          <div className="flex-1 flex flex-col">
            <header className="sticky top-0 w-full p-3 border-b bg-card z-10 flex items-center gap-6">
              <Link href="/conversations" className="block md:hidden">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Avatar className="h-14 w-14">
                <AvatarImage src={room?.to.avatarUrl} alt={room?.to.name} />
                <AvatarFallback className="bg-green-300 dark:bg-green-600">
                  {room?.to.name[0]}
                </AvatarFallback>
              </Avatar>
              {loading ? (
                <div className="h-2.5 bg-gray-300 animate-pulse rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              ) : (
                <span className="text-lg font-bold">{room?.to.name}</span>
              )}
            </header>

            <div className="space-y-4 p-4">
              {messages.map((message, idx) => (
                <ChatBubble
                  key={idx}
                  message={message}
                  fromUser={room?.to}
                  fromMe={message.sender === me?.id}
                  lastMessage={idx === messages.length - 1}
                />
              ))}
            </div>
          </div>
          <MessageInput
            onSend={handleSendMessage}
            className="mt-auto sticky bottom-0 backdrop-blur-lg"
          />
        </div>
      ) : (
        <div className="flex col-span-12 md:col-span-9 justify-center items-center w-full h-full">
          Chat message not found.
        </div>
      )}
    </>
  );
};

export default Room;
