"use client";
import TagTitle from "@/components/tag-title";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { createRestaurantMenu } from "@/services/restaurant";
import toast from "react-hot-toast";
import categoryData from "@/mock/category";
import { Input } from "@/components/ui/input";
import { uploadFile } from "@/services/file-upload";
import { hash } from "@/lib/hash";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RestaurantMenuForm,
  restaurantMenuSchema,
} from "@/validations/restaurant-schema";
type Props = {};

const AddMenuPage = (props: Props) => {
  const form = useForm<RestaurantMenuForm>({
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      description: "",
      image: ""
    },
    resolver: zodResolver(restaurantMenuSchema),
  });

  const router = useRouter();
  const params = useParams();
  // const restaurantId = parseInt(id, 10);

  const { isLoading } = form.formState;

  const [image, setImage] = useState<string>("");
  
  const onSubmit = async (data: RestaurantMenuForm) => {
    console.log("Form submitted", data);
    try {
      data.image = image!;
      await createRestaurantMenu(data, Number(params.restaurant_id));
      toast.success("Menu created successfully");
      router.push("/");
    } catch (error: any) {
      if (error.response.status === 422)
        // Loop over the errors object and set errors return from restaurant-service
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

      console.error("Menu creation failed", error);
    }
  };

  const onFileChange = async (file: File | null) => {
    console.log(file);
    if (file) {
      const file_name_hash = hash(file.name);
      const file_name = `menu/${file_name_hash}`;
      console.log("file name ->" + file_name);
      const res = await uploadFile(file, file_name);
      console.log(res);
      if (res?.data) {
        const menuImage = res.data.replace(
          "http://host.docker.internal:8093",
          "http://localhost:8093"
        );
        toast.success("Add menu image success");
        setImage(menuImage);
        return menuImage;
      }
    }
    console.log("File selected:", file);
  };
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    const selectedFile = e.target.files && e.target.files[0]; // Get the first selected file

    if (selectedFile) {
      const fileType = selectedFile.type;
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType)) {
        console.log("valid");
        console.log(selectedFile);
        
        setFile(selectedFile); // Set the selected file
        onFileChange(selectedFile);
      } else {
        setMessage("Only images are accepted");
      }
    }
  };

  const removeImage = () => {
    setFile(null); // Clear the selected file
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="container md:px-40px] md:py-[40px] lg:px-40 lg:py-[40px] sm:p-0 ">
            <div className="lg:bg-white rounded-[12px] md:shadow-md lg:shadow-md py-12 px-14 sm:bg-transparent sm:shadow-none md:bg-white">
              {/* Tag Topic (Menu) */}
              <div className="flex mb-10">
                <TagTitle />
                <div className="flex flex-col">
                  <p className="font-bold text-2xl py-2">Add menu</p>
                  <p className="font-light text-md text-gray-500">
                    restaurant new menu
                  </p>
                </div>
              </div>
              {/* information */}
              <div className="flex flex-col  justify-center items-center">
                <div className="flex flex-col px-20 space-x-5">
                  <div className="flex flex-col">
                    <p className="block text-sm font-medium mb-5 text-green-600">
                      Menu Image
                    </p>

                    <div className="p-3 w-auto bg-gray-100 rounded-md">
                      <div className="flex flex-col justify-center items-center">
                        {!file && (
                          <>
                            <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
                              {message}
                            </span>
                            <div className="h-[200px] w-[300px] relative border-2 items-center rounded-md cursor-pointer bg-gray-300 border-gray-400 border-dotted">
                              <input
                                type="file"
                                onChange={handleFile}
                                className="h-full w-full bg-green-200 opacity-0 z-10 absolute"
                                name="file"
                              />
                              <div className="h-full w-full bg-gray-200 z-1 flex justify-center items-center">
                                <div className="flex flex-col justify-center items-center">
                                  {/* <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i> */}
                                  <Image
                                    src="https://cdn.icon-icons.com/icons2/2570/PNG/512/image_icon_153794.png"
                                    height="50"
                                    width="50"
                                    alt="upload-image"
                                  />
                                  <span className="text-medium mt-2">{`Drag and Drop a file`}</span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {file && (
                        <div className="overflow-hidden flex flex-col p-5">
                          <Image
                            // className="h-[250px] w-[300px] rounded-md"
                            src={URL.createObjectURL(file)}
                            alt="Selected Image"
                            height="250"
                            width="300"
                            // onChange={onFileChange}
                          />
                          <button
                            onClick={removeImage}
                            // className="bg-green-200 px-2 py-2 font-medium rounded-lg mt-5 "
                            className="mt-5 text-green-600 underline"
                          >
                            Change
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-10 mt-5">
                
                    <div>
                    <FormField
                          name="name"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="w-full md:pr-2">
                              <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                                Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light  dark:text-gray-400"
                                  {...field}
                                  id="name"
                                  placeholder="Name of new menu"
                                  disabled={isLoading}
                                  value={field.value}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                    
                    <div>
                      <FormField
                        name="category"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full md:pr-2">
                            <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                              Category
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <div className="text-sm font-light  dark:text-gray-400">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Food Category..." />
                                  </SelectTrigger>
                                </div>
                              </FormControl>
                              <SelectContent>
                                {categoryData.map((category) => (
                                  <SelectItem
                                    key={category.value}
                                    value={category.value}
                                  >
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                    <FormField
                          name="price"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="w-full md:pr-2">
                              <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                                Price
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light  dark:text-gray-400"
                                  {...field}
                                  id="price"
                                  placeholder="Price of new menu"
                                  disabled={isLoading}
                                  value={field.value}
                                  type="number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                    <div>
                      <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full md:pr-2">
                            <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                              Description
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light  dark:text-gray-400"
                                {...field}
                                id="description"
                                placeholder="Describe your menu"
                                disabled={isLoading}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block text-sm font-medium mb-2 text-green-600"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="location"
                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light focus:outline-none focus:border-green-600 focus:ring-green-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="menu description"
                />
                <p
                  className="text-xs font-light text-gray-500 mt-2"
                  id="hs-input-helper-text"
                >
                  Enter your menu description
                </p>
              </div> */}
                  </div>
                </div>
                <button type="submit" className="bg-green-600 text-white px-10 py-2 font-medium rounded-md mt-10 ">
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </Form>
      
    </>
  );
};

export default AddMenuPage;
