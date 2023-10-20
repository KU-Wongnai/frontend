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
import Field from "../components/field";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { httpClient } from "@/lib/http-client";
import PhoneNumberInput from "@/components/phone-number-input";
import { formatPhoneNumber } from "react-phone-number-input";

const General = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const user = useStore(useAuthStore, (state) => state.user);

  let birthDate;
  if (user?.user_profile?.birth_date === null) {
    birthDate = undefined;
  } else {
    // birthDate = user?.user_profile?.birth_date;
    // convert string to Date object
    birthDate = user?.user_profile?.birth_date
      ? new Date(user?.user_profile?.birth_date)
      : undefined;
  }

  const form = useForm<UserProfileForm>({
    defaultValues: {
      phone_number: user?.user_profile?.phone_number,
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

  // const { isLoading } = form.formState;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChangeAvatar = () => {
    console.log("clicked");
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
    setIsLoading(true);
    console.log(data);
    const submittedData = {
      ...data,
      birth_date: data.birth_date
        ? format(new Date(data.birth_date), "yyyy-M-d")
        : null,
    };
    console.log(submittedData);
    try {
      await updateUserProfile(submittedData);
      toast.success("Update profile success");
    } catch (error: any) {
      toast.error("Update profile failed");
      console.error("Update profile failed", error);
    }
    setIsLoading(false);
  };

  const sendVerificationEmail = async () => {
    try {
      await httpClient.post("/user/api/users/v1/email/verify");
      toast.success("Verification email sent! Please check your email.");
    } catch (err) {
      toast.error(
        "There was an error sending the verification email. Please try again."
      );
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      {isClient ? (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-3xl space-y-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <Field
                label={
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user?.user_profile?.avatar} />
                    <AvatarFallback>{user?.name[0]}</AvatarFallback>
                  </Avatar>
                }
                defaultValue={
                  <>
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={onChangeAvatar}
                    >
                      Change avatar
                    </button>
                    <Input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={onFileChange}
                      accept="image/*" // Accept only image files
                    />
                  </>
                }
              />
              <Field label="Name" defaultValue={user?.name} />
              <Field
                label="Email"
                defaultValue={
                  <div>
                    {user?.email}
                    {user?.email_verified_at ? (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Verified
                      </span>
                    ) : (
                      <Button
                        variant="link"
                        type="button"
                        onClick={sendVerificationEmail}
                      >
                        Verify email
                      </Button>
                    )}
                  </div>
                }
              />
              <Field
                label="Phone Number"
                defaultValue={
                  user?.user_profile?.phone_number
                    ? formatPhoneNumber(user?.user_profile?.phone_number)
                    : undefined
                }
                isLoading={isLoading}
                form={
                  <FormField
                    name="phone_number"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PhoneNumberInput
                            id="phone_number"
                            disabled={isLoading}
                            onChange={field.onChange}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                }
                editable
              />
              <Field
                label="Birth Date"
                defaultValue={user?.user_profile?.birth_date}
                isLoading={isLoading}
                form={
                  <FormField
                    control={form.control}
                    name="birth_date"
                    render={({ field }) => (
                      <FormItem>
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
                                  <p>Pick a date</p>
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                }
                editable
              />
              <Field
                label="Address"
                defaultValue={user?.user_profile?.address}
                isLoading={isLoading}
                form={
                  <FormField
                    name="address"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
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
                }
                editable
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Student Profile</CardTitle>
              <CardDescription>
                Update your student profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Field
                label="Stduent ID"
                defaultValue={user?.user_profile?.student_id}
                isLoading={isLoading}
                form={
                  <FormField
                    name="student_id"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
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
                }
                editable
              />
              <Field
                label="Faculty"
                defaultValue={user?.user_profile?.faculty}
                isLoading={isLoading}
                form={
                  <FormField
                    name="faculty"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
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
                }
                editable
              />
              <Field
                label="Major"
                defaultValue={user?.user_profile?.major}
                isLoading={isLoading}
                form={
                  <FormField
                    name="major"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
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
                }
                editable
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Food Profile</CardTitle>
              <CardDescription>
                Improve your food experience by updating your food profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Field
                label="Favorite Food"
                defaultValue={user?.user_profile?.favorite_food}
                isLoading={isLoading}
                form={
                  <FormField
                    name="favorite_food"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
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
                }
                editable
              />
              <Field
                label="Allergy Food"
                defaultValue={user?.user_profile?.allergy_food}
                isLoading={isLoading}
                form={
                  <FormField
                    name="allergy_food"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
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
                }
                editable
              />
            </CardContent>
          </Card>
        </form>
      ) : null}
    </Form>
  );
};

export default General;
