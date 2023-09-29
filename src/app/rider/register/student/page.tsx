"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  RiderRegisterForm,
  riderRegisterSchema,
} from "@/validations/rider-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Image from "next/image";
import StudentRider from "@/assets/rider/student-rider.png"
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

const RegisterAsStudent = () => {
  const form = useForm<RiderRegisterForm>({
    defaultValues: {
      phone_number: "",
      id_card: "",
      // birth_date: ,
      bank_account_number: "",
      avatar: "",
      student_id: "",
      faculty: "",
      major: "",
      // desire_location: "",
    },
    resolver: zodResolver(riderRegisterSchema),
  });

  const { isLoading } = form.formState;

  const onSubmit = async (data: RiderRegisterForm) => {
    console.log("Form submitted", data);
    try {
      // await signUp(data);
      toast.success("Account created successfully");
      window.location.href = "/rider";
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
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen mx-16">
      <div className="grid grid-cols-2 gap-4 mt-5">
        <section className="col-span-1">
          <Image
            src={StudentRider}
            width={1100}
            height={1100}
            alt="Student Rider"
            className="mx-auto left-4 top-4 md:left-8 md:top-8 z-10"
          />
        </section>
        <section className="p-6 col-span-1 rounded-md border bg-card">
          <h1 className="pb-6 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary">
            Register{" "}
            <span className="text-secondary-foreground">as Student Rider</span>
          </h1>
          <div className="max-w-full space-y-8 grid gap-6 justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <FormField
                    name="phone_number"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="phone_number"
                            placeholder="Phone Number"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="id_card"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID Card</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="id_card"
                            placeholder="ID Card"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="birth_date"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Birth Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
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
                              disabled={(date: Date) =>
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
                  <FormField
                    name="bank_account_number"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="bank_account_number"
                            placeholder="Bank Account Number"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="avatar"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            id="avatar"
                            type="file"
                            placeholder="Avatar"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="student_id"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student ID</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            id="student_id"
                            placeholder="Student ID"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="faculty"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Faculty</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            id="faculty"
                            placeholder="Faculty"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="major"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Major</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            id="major"
                            placeholder="Major"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Register
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </div>
    </div>
  );
};
export default RegisterAsStudent;
