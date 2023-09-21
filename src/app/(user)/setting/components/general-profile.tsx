import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface GeneralProps {}

interface IFormInput {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  password: string;
}

const General: React.FC<GeneralProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {};

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Image
        className="w-24 h-24 mb-4 rounded-full"
        src="https://github.com/shadcn.png"
        alt=""
        width={100}
        height={100}
      />

      <main className="w-full max-w-md">
        <div className="flex flex-wrap mb-6">
          <label className="block text-gray-700">name</label>
          <Input
            {...register("firstName", { required: true })}
            type="text"
            className="w-full  mt-1   "
          />
          {errors.firstName && (
            <p className="text-xs italic text-red-500">name is required</p>
          )}
        </div>
        <div className="flex flex-wrap mb-6">
          <label className="block text-gray-700">phone</label>
          <Input
            {...register("phone", { required: true })}
            type="text"
            className="w-full  mt-1   "
          />
          {errors.phone && (
            <p className="text-xs italic text-red-500">phone is required</p>
          )}
        </div>

        <div className="flex flex-wrap mb-6">
          <label className="block text-gray-700">bank account number</label>
          <Input
            {...register("address", { required: true })}
            type="text"
            className="w-full  mt-1   "
          />
          {errors.address && (
            <p className="text-xs italic text-red-500">required</p>
          )}
        </div>
        <div className="flex flex-wrap mb-6">
          <Button
            type="submit"
            className="w-full px-3 py-4 rounded-sm text-white"
          >
            confirm
          </Button>
        </div>
      </main>
    </form>
  );
};

export default General;
