"use client";

import PhoneNumberInput from "@/components/phone-number-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import banks from "@/data/banks.json";
import ku from "@/data/ku.json";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, CheckIcon, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { isValidPhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";
import Dropzone from "@/components/dropzone";
import Previews from "@/components/preview";
import { hash } from "@/lib/hash";
import { uploadFile } from "@/services/file-upload";
import { riderUpdateProfile } from "@/services/rider";
import { useRouter } from "next/navigation";

const RiderRegisterSchema = z
  .object({
    phone_number: z.string(),
    // birth_date: z.string().nullable(),
    id_card: z.string().length(13, "ID card must be 13 digits"),
    id_card_photo: z.string().min(1, "ID card photo required"),
    bank_account_number: z
      .string()
      .length(10, "Bank account number must be 10 digits"),
    bank_account_name: z
      .string()
      .min(1, "Bank account name must be at least 1 character"),
    bank_account_code: z.string().min(1, "Bank account code required"),
    book_bank_photo: z.string().min(1, "Book bank photo required"),
    // avatar: z.string().nullable(),
    student_id: z.string().nullable(),
    faculty: z.string().nullable(),
    major: z.string().nullable(),
    desire_location: z.string().nullable(),
  })
  .refine((data) => isValidPhoneNumber(data.phone_number), {
    message: "Invalid phone number",
    path: ["phone_number"],
  });

type RiderRegister = z.infer<typeof RiderRegisterSchema>;

const RiderRegisterForm = () => {
  const [idCardPhoto, setIdCardPhoto] = React.useState<File[]>([]);
  const [bookBankPhoto, setBookBankPhoto] = React.useState<File[]>([]);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(RiderRegisterSchema),
    defaultValues: {
      phone_number: "",
      birth_date: "",
      id_card: "",
      id_card_photo: "",
      bank_account_number: "",
      bank_account_name: "",
      bank_account_code: "",
      book_bank_photo: "",
      avatar: "",
      student_id: "",
      faculty: "",
      major: "",
      desire_location: "",
    },
  });

  const onDropIdCard = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);

    setIdCardPhoto(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    form.setValue("id_card_photo", URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const onDropBookBank = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);

    setBookBankPhoto(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );

    form.setValue("book_bank_photo", URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const onSubmit = async (data: RiderRegister) => {
    console.log(data);

    if (idCardPhoto.length > 0) {
      const file_name_hash = hash(idCardPhoto[0].name);
      const file_name = `rider/${file_name_hash}`;
      console.log(file_name);
      const res = await uploadFile(idCardPhoto[0], file_name);
      console.log(res);
      if (res?.data) {
        const idCardPhoto = res.data.replace(
          "http://host.docker.internal:8093",
          "http://localhost:8093"
        );
        console.log(idCardPhoto);
        form.setValue("id_card_photo", idCardPhoto);
      }
    }
    if (bookBankPhoto.length > 0) {
      const file_name_hash = hash(bookBankPhoto[0].name);
      const file_name = `rider/${file_name_hash}`;
      console.log(file_name);
      const res = await uploadFile(bookBankPhoto[0], file_name);
      console.log(res);
      if (res?.data) {
        const bookBankPhoto = res.data.replace(
          "http://host.docker.internal:8093",
          "http://localhost:8093"
        );
        console.log(bookBankPhoto);
        form.setValue("book_bank_photo", bookBankPhoto);
      }
    }

    try {
      await riderUpdateProfile(data);
      toast.success("Account created successfully");
      router.push("/rider/register/success");
    } catch (error: any) {
      toast.error("An error occurred. Please try again.");
      console.error("Registration failed", error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Phone Number</h2>

          {/* Contact */}
          <FormField
            name="phone_number"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneNumberInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Identity Verifiaction</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Provide a ID Card, Driving License, or Passport. So we can
              identify your identity.
            </p>
          </div>

          {/* Personal identity */}
          <FormField
            name="id_card"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Card</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="id_card_photo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Card Photo</FormLabel>
                <FormDescription>
                  Should match with your ID Card number
                </FormDescription>
                <Dropzone
                  options={{
                    onDrop: onDropIdCard,
                    maxFiles: 1,
                  }}
                  preview={<Previews files={idCardPhoto} />}
                  className="my-3"
                />
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Bank Account Information</h2>
          {/* Bank informations */}
          <FormField
            control={form.control}
            name="bank_account_code"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Bank Provider</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? Object.keys(banks.th).find(
                              (bank) => bank === field.value
                            )
                          : "Select your bank"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search for bank" />
                      <CommandEmpty>Bank not found</CommandEmpty>
                      <CommandGroup className="max-h-[200px] overflow-auto">
                        {Object.keys(banks.th).map((bank) => (
                          <CommandItem
                            value={bank}
                            key={bank}
                            onSelect={() => {
                              form.setValue("bank_account_code", bank);
                            }}
                            className="cursor-pointer"
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                bank === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <div
                              className="p-2 rounded-lg mr-3"
                              style={{
                                backgroundColor: (banks.th as any)[bank].color,
                              }}
                            >
                              <Image
                                src={`/banks/th/${bank}.svg`}
                                alt={bank}
                                width="20"
                                height="20"
                              />
                            </div>
                            {(banks.th as any)[bank].nice_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="bank_account_name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Account Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="book_bank_photo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Bank Photo</FormLabel>
                <FormDescription>
                  Should match with your bank account name
                </FormDescription>
                <Dropzone
                  options={{
                    onDrop: onDropBookBank,
                    maxFiles: 1,
                  }}
                  preview={<Previews files={bookBankPhoto} />}
                  className="my-3"
                />
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Student Information</h2>

          {/* For Student */}
          <FormField
            name="student_id"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Faculty</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? ku.faculties.find(
                              (faculty) => faculty.name === field.value
                            )?.name
                          : "Select your faculty"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search faculty..." />
                      <CommandEmpty>No faculty found.</CommandEmpty>
                      <CommandGroup className="max-h-[200px] overflow-auto">
                        {ku.faculties.map((faculty) => (
                          <CommandItem
                            value={faculty.name}
                            key={faculty.name}
                            onSelect={() => {
                              form.setValue("faculty", faculty.name);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                faculty.name === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {faculty.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Department</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={!form.watch("faculty")}
                      >
                        {field.value
                          ? ku.faculties
                              .find(
                                (faculty) =>
                                  faculty.name === form.watch("faculty")
                              )
                              ?.departments.find((d) => d === field.value)
                          : !form.watch("faculty")
                          ? "Please select faculty first"
                          : "Select your department"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search department..." />
                      <CommandEmpty>No departments found.</CommandEmpty>
                      <CommandGroup className="max-h-[200px] overflow-auto">
                        {ku.faculties
                          .find((f) => f.name === form.watch("faculty"))
                          ?.departments.map((d) => (
                            <CommandItem
                              value={d}
                              key={d}
                              onSelect={() => {
                                form.setValue("major", d);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  d === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {d}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Desire Location</h2>

          <FormField
            name="desire_location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where do you want to work?</FormLabel>
                <FormDescription>
                  Give us the location you want to work with. We will show the
                  orders based on your given location.
                </FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <Button>Register</Button>
      </form>
    </Form>
  );
};

export default RiderRegisterForm;
