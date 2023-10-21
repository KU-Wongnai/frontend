"use client";

import React from "react";
import Image from "next/image";
import StudentRider from "@/assets/rider/undraw_on_the_way_re_swjt.svg";
import RiderRegisterForm from "../form";

const RegisterAsStudent = () => {
  return (
    <div className="w-full flex flex-col items-center my-12">
      <p className="font-bold mb-3 text-lg">
        <span className="text-primary">KU</span> Wongnai
      </p>
      <h1 className="mb-12 text-3xl font-bold">
        Register as <span className="text-primary">Student</span>
      </h1>
      <RiderRegisterForm isStudent />
    </div>
  );
};
export default RegisterAsStudent;
