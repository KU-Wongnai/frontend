import { db } from "@/lib/firebase";
import {
  collection,
  query,
  or,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";

export const createRoomIfNotExists = async (
  senderId: number,
  recipientId: number
) => {
  const roomsRef = collection(db, "rooms");
  const roomQuery = query(
    roomsRef,
    or(
      where("users", "in", [[recipientId, senderId]]),
      where("users", "in", [[senderId, recipientId]])
    )
  );
  const roomsSnapshot = await getDocs(roomQuery);
  let roomId: string;

  if (roomsSnapshot.empty) {
    const docRef = await addDoc(roomsRef, {
      users: [recipientId, senderId],
    });
    roomId = docRef.id;
  } else {
    roomId = roomsSnapshot.docs[0].id;
  }

  return roomId;
};

export const sendMessage = async (
  roomId: string,
  senderId: number,
  message: string
) => {
  const roomsRef = collection(db, "rooms");
  await addDoc(collection(roomsRef, roomId, "messages"), {
    sender: senderId,
    message,
    createdAt: serverTimestamp(),
  });

  await setDoc(
    doc(roomsRef, roomId),
    {
      lastMessage: message,
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    }
  );
};
