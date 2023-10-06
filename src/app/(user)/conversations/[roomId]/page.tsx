"use client";

import React, { useEffect, useState } from "react";
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

  const messagesRef = collection(roomsRef, "messages");

  const handleSendMessage = async (message: string) => {
    await addDoc(messagesRef, {
      sender: me?.id,
      message,
      createdAt: serverTimestamp(),
      // recipient: selectedUser || 0,
    });
  };

  useEffect(() => {
    const queryMessage = query(
      messagesRef,
      // where("recipient", "==", me?.id),
      orderBy("createdAt")
    );
    onSnapshot(queryMessage, (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        messages.push(doc.data() as ChatMessage);
      });
      setmessages(messages);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-background rounded-md">
      <ChatWindow me={me!} messages={messages} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default Room;
