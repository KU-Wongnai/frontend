"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAuthStore from "@/contexts/auth-store";
import { db } from "@/lib/firebase";
import { createRoomIfNotExists, sendMessage } from "@/services/chat";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  or,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const chatSchema = z.object({
  recipientId: z.coerce.number(),
  message: z.string().optional(),
});

type ChatForm = z.infer<typeof chatSchema>;

const NewChat = () => {
  const form = useForm<ChatForm>({
    resolver: zodResolver(chatSchema),
  });

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const me = useAuthStore((state) => state.user);
  const roomsRef = collection(db, "rooms");
  const router = useRouter();

  const handleCreateRoom = async (data: ChatForm) => {
    // Find recipient by unique field (id, email)

    // Check if recipient is not me
    if (data.recipientId === me?.id) {
      form.setError("recipientId", { message: "Recipient can't be you" });
      return;
    }

    // Check if recipient is not already in a room with me
    const roomId = await createRoomIfNotExists(me!.id, data.recipientId);

    // If user provide a message, send it to the room.
    if (data.message) {
      await sendMessage(roomId, me!.id, data.message);
    }

    setDialogOpen(false);
    form.reset();
    router.push(`/conversations/${roomId}`);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto" onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription>
            Add a new message to start a conversation
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateRoom)}
              className="space-y-4"
            >
              <FormField
                name="recipientId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Id</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="User id to sent a message to"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="message"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Type your message..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChat;
