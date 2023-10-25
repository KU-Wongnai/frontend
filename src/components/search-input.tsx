"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";

type FormData = {
  name: string;
};

function SearchInput() {
  const { register, handleSubmit } = useForm<FormData>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    router.push(
      `/search?name=${data.name}&location=${searchParams.get("location") || ""}`
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="search"
        {...register("name")}
        placeholder="Search a restaurant ...."
        className="pl-4 pr-10 rounded-full w-full"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary rounded-full pl-1 flex items-center"
        style={{ width: "30px", height: "30px" }}
      >
        🍳
      </button>
    </form>
  );
}

export default SearchInput;
