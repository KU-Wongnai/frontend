"use client";

import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "zustand";
import useAuthStore from "@/contexts/auth-store";
import toast from "react-hot-toast";
import { updateUserProfile } from "@/services/user";
import { uploadFile } from "@/services/file-upload";
import { hash } from "@/lib/hash";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserProfileForm, userProfileSchema } from "@/validations/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Icons } from "@/components/icons";

const General = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const user = useStore(useAuthStore, (state) => state.user);

  const birthDate = new Date(user?.user_profile?.birth_date || "");

  const form = useForm<UserProfileForm>({
    defaultValues: {
      phone_number: user?.user_profile?.phone_number || null,
      birth_date: birthDate,
      address: user?.user_profile?.address || null,
      student_id: user?.user_profile?.student_id || null,
      faculty: user?.user_profile?.faculty || null,
      major: user?.user_profile?.major || null,
      favorite_food: user?.user_profile?.favorite_food || null,
      allergy_food: user?.user_profile?.allergy_food || null,
    },
    resolver: zodResolver(userProfileSchema),
  });

  const { isLoading } = form.formState;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChangeAvatar = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      const file_name_hash = hash(file.name);
      const file_name = `avatar/${file_name_hash}`;
      console.log(file_name);
      const res = await uploadFile(file, file_name);
      console.log(res);
      if (res?.data) {
        const avatar = res.data.replace(
          "http://host.docker.internal:8093",
          "http://localhost:8093"
        );
        await updateUserProfile({
          phone_number: user?.user_profile?.phone_number,
          birth_date: user?.user_profile?.birth_date,
          avatar: avatar,
        });
        toast.success("Update avatar success");
      }
      return;
    }
    console.log("File selected:", file);
  };

  const onSubmit = async (data: UserProfileForm) => {
    console.log(data);
    const submittedData = {
      ...data,
      birth_date: format(new Date(data.birth_date), "yyyy-M-d"),
    };
    console.log(submittedData);
    try {
      await updateUserProfile(submittedData);
      toast.success("Update profile success");
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
        toast.error("An error occurred. Please try again.");
      }
      console.error("Update profile failed", error);
    }
  };

  return (
    <Form {...form}>
      {isClient ? (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center "
        >
          <Avatar className="w-24 h-24 mb-4 cursor-pointer">
            <AvatarImage
              src={
                user?.user_profile?.avatar || "https://github.com/shadcn.png"
              }
              onClick={onChangeAvatar}
            />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
          <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={onFileChange}
            accept="image/*" // Accept only image files
          />

          <main className="w-full max-w-md ">
            {/* phone_number */}
            <FormField
              name="phone_number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="phone_number"
                      placeholder="phone_number"
                      type="text"
                      disabled={isLoading}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* birth_date */}
            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Birth date
                    <br />
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "yyyy-M-d")
                          ) : (
                            <div>
                              {user?.user_profile?.birth_date ? (
                                format(
                                  new Date(user?.user_profile?.birth_date),
                                  "yyyy-M-d"
                                )
                              ) : (
                                <p>Pick a date</p>
                              )}
                            </div>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* address */}
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="address"
                      placeholder="address"
                      type="text"
                      disabled={isLoading}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* student_id */}
            <FormField
              name="student_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="student_id"
                      placeholder="student_id"
                      type="text"
                      disabled={isLoading}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* faculty */}
            <FormField
              name="faculty"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faculty</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="faculty"
                      placeholder="faculty"
                      type="text"
                      disabled={isLoading}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* major */}
            <FormField
              name="major"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Major</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="major"
                      placeholder="major"
                      type="text"
                      disabled={isLoading}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* favorite_food */}
            <FormField
              name="favorite_food"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite Food</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="favorite_food"
                      placeholder="favorite_food"
                      type="text"
                      disabled={isLoading}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* allergy_food */}
            <FormField
              name="allergy_food"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergy Food</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="allergy_food"
                      placeholder="allergy_food"
                      type="text"
                      disabled={isLoading}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* submit */}
            <Button
              type="submit"
              disabled={isLoading}
              onClick={() => console.log("clicked")}
              className="w-full px-3 py-4 rounded-sm text-white my-6"
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              confirm
            </Button>
          </main>
        </form>
      ) : null}
    </Form>
  );
};

export default General;
