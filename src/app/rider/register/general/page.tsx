"use client";

import React from "react";
import Image from "next/image";
import GeneralRider from "@/assets/rider/undraw_delivery_truck_vt6p.svg";
import RiderRegisterForm from "../form";

const RegisterAsGeneral = () => {
  return (
    <div className="my-12 w-full flex flex-col items-center">
      <p className="font-bold mb-3 text-lg">
        <span className="text-primary">KU</span> Wongnai
      </p>
      <h1 className="mb-12 text-3xl font-bold">
        Register as <span className="text-primary">General</span>
      </h1>
      <RiderRegisterForm />
    </div>
  );
};
export default RegisterAsGeneral;
