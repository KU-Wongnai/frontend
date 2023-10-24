import Image from "next/image";
import React from "react";
import Link from "next/link";
import RiderRegisterForm from "./form";
import { ArrowRight } from "lucide-react";

const SelectRegister = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Link
        href="/rider/register/individual"
        className="group relative w-full h-full flex flex-col justify-center items-center overflow-hidden bg-black"
      >
        <Image
          src="https://images.unsplash.com/photo-1664575599618-8f6bd76fc670?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill={true}
          className="group-hover:scale-105 opacity-75 group-hover:opacity-60 duration-300 min-w-full min-h-full flex-shrink-0 object-cover object-center"
        />
        <div className="absolute">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-4 border-b group-hover:border-b-2 pb-4 border-b-white ">
            Register as <span className="text-white">Individual</span>{" "}
            <ArrowRight className="inline-block w-12 h-12" />
          </h1>
        </div>
      </Link>
      <Link
        href="/rider/register/student"
        className="group relative w-full h-full flex flex-col justify-center items-center overflow-hidden bg-black"
      >
        <Image
          src="https://images.unsplash.com/photo-1530099486328-e021101a494a?auto=format&fit=crop&q=80&w=3047&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill={true}
          className="group-hover:scale-105 opacity-75 group-hover:opacity-60 duration-300 min-w-full min-h-full flex-shrink-0 object-cover object-center"
        />
        <div className="absolute">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-4 border-b group-hover:border-b-2 pb-4 border-b-white">
            Register as <span className="text-white">Student</span>
            <ArrowRight className="inline-block w-12 h-12" />
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default SelectRegister;
