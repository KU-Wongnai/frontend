"use client";

import React, { useEffect, useRef, useState } from "react";
import ChatWindow from "../components/chat-window";
import MessageInput from "../components/message-input";
import useAuthStore from "@/contexts/auth-store";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import { ChatMessage, ChatUser } from "../interfaces/conversations";
import { useParams } from "next/navigation";
import ChatBubble from "../components/chat-bubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Room = () => {
  const me = useAuthStore((state) => state.user);
  const params = useParams();
  const [messages, setmessages] = useState<ChatMessage[]>([]);

  const roomsRef = doc(collection(db, "rooms"), params.roomId as string);
  setDoc(
    roomsRef,
    {
      users: [me?.id, 3],
    },
    {
      merge: true,
    }
  );

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesRef = collection(roomsRef, "messages");

  const handleSendMessage = async (message: string) => {
    await addDoc(messagesRef, {
      sender: me?.id,
      message,
      createdAt: serverTimestamp(),
    });
  };

  useEffect(() => {
    const queryMessage = query(messagesRef, orderBy("createdAt"));
    const unsuscribe = onSnapshot(queryMessage, (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        messages.push(doc.data() as ChatMessage);
      });
      setmessages(messages);
    });

    return () => unsuscribe();

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
    <div className="flex-1 flex flex-col bg-background rounded-md">
      <div className="flex-1 flex flex-col bg-secondary rounded-md min-h-[500px] max-h-[500px]">
        <div className="p-3 mx-4 border-b flex items-center gap-6">
          <Avatar className="h-14 w-14">
            <AvatarImage src="" alt="" />
            <AvatarFallback className="bg-pink-300">SC</AvatarFallback>
          </Avatar>
          <span className="text-lg font-bold">Saccsos</span>
        </div>

        <div ref={chatRef} className="space-y-4 p-4 overflow-y-scroll">
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
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default Room;
