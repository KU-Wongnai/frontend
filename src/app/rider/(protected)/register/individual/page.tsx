"use client";

import React from "react";
import RiderRegisterForm from "../form";

const RegisterAsIndividual = () => {
  return (
    <div className="my-12 w-full flex flex-col items-center">
      <p className="font-bold mb-3 text-lg">
        <span className="text-primary">KU</span> Wongnai
      </p>
      <h1 className="mb-12 text-3xl font-bold">
        Register as <span className="text-primary">Individual</span>
      </h1>
      <RiderRegisterForm />
    </div>
  );
};
export default RegisterAsIndividual;
