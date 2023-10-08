"use client";

import { Icons } from "@/components/icons";
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
import { createRoomIfNotExists, sendMessage } from "@/services/chat";
import { findUserByEmail } from "@/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const chatSchema = z.object({
  email: z.string().email(),
  message: z.string().optional(),
});

type ChatForm = z.infer<typeof chatSchema>;

const NewChat = () => {
  const form = useForm<ChatForm>({
    resolver: zodResolver(chatSchema),
  });

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const me = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleCreateRoom = async (data: ChatForm) => {
    // Find recipient by unique field (id, email)
    setLoading(true);
    let user;
    try {
      user = await findUserByEmail(data.email);
    } catch (error: any) {
      if (error.response.status === 422)
        // Loop over the errors object and set errors return from user-service
        for (const key in error.response.data.errors) {
          if (error.response.data.errors.hasOwnProperty(key)) {
            form.setError(key as any, {
              message: error.response.data.errors[key][0], // Use the first error message
            });
          }
        }
      else {
        form.setError("email", { message: "An error occurred" });
      }
      setLoading(false);
      return;
    }

    // Check if recipient is not me
    if (user.id === me?.id) {
      form.setError("email", { message: "Recipient can't be you" });
      setLoading(false);
      return;
    }

    // Check if recipient is not already in a room with me
    const roomId = await createRoomIfNotExists(me!.id, user.id);

    // If user provide a message, send it to the room.
    if (data.message) {
      await sendMessage(roomId, me!.id, data.message);
    }

    setDialogOpen(false);
    setLoading(false);
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
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient&apos;s Email</FormLabel>
                    <FormControl>
                      <Input placeholder="someone@example.com" {...field} />
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
              <Button type="submit" disabled={loading}>
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChat;
