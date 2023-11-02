"use client";
import TagTitle from "@/components/tag-title";
import React, { useState } from "react";
import Image from "next/image";
type Props = {};

const AddMenuPage = (props: Props) => {
  // const [file, setFile] = useState(null);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    const selectedFile = e.target.files && e.target.files[0]; // Get the first selected file

    if (selectedFile) {
      const fileType = selectedFile.type;
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType)) {
        setFile(selectedFile); // Set the selected file
      } else {
        setMessage("Only images are accepted");
      }
    }
  };

  const removeImage = () => {
    setFile(null); // Clear the selected file
  };
  return (
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
              <div className="">
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block text-sm font-medium mb-2 text-green-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="location"
                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light focus:outline-none focus:border-green-600 focus:ring-green-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="menu name"
                />
                <p
                  className="text-xs font-light text-gray-500 mt-2"
                  id="hs-input-helper-text"
                >
                  Enter your menu name
                </p>
              </div>
              <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block text-sm font-medium mb-2 text-green-600"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="location"
                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light focus:outline-none focus:border-green-600 focus:ring-green-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="menu category"
                />
                <p
                  className="text-xs font-light text-gray-500 mt-2"
                  id="hs-input-helper-text"
                >
                  Enter your menu category
                </p>
              </div>
              <div className="">
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block text-sm font-medium mb-2 text-green-600"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="location"
                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light focus:outline-none focus:border-green-600 focus:ring-green-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="menu price"
                />
                <p
                  className="text-xs font-light text-gray-500 mt-2"
                  id="hs-input-helper-text"
                >
                  Enter your menu price
                </p>
              </div>
              <div>
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
              </div>
            </div>
          </div>
          <button className="bg-green-600 text-white px-10 py-2 font-medium rounded-md mt-10 ">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenuPage;
