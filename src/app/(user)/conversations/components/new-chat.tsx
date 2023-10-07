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
import useAuthStore from "@/contexts/auth-store";
import { db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const chatSchema = z.object({
  recipientId: z.coerce.number(),
});

type ChatForm = z.infer<typeof chatSchema>;

const NewChat = () => {
  const form = useForm<ChatForm>({
    resolver: zodResolver(chatSchema),
  });

  const me = useAuthStore((state) => state.user);
  const roomsRef = collection(db, "rooms");

  const handleCreateRoom = async (data: ChatForm) => {
    // Find recipient by unique field (id, email)

    // Check if recipient is not me

    // Check if recipient is not already in a room with me

    await addDoc(roomsRef, {
      users: [me?.id, data.recipientId],
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto">
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
              <Button type="submit">Add</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChat;
