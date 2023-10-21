import Image from "next/image";
import React from "react";
import GeneralRider from "@/assets/rider/undraw_delivery_truck_vt6p.svg";
import StudentRider from "@/assets/rider/undraw_on_the_way_re_swjt.svg";
import Link from "next/link";
import RiderRegisterForm from "./form";

const SelectRegister = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-28 items-center justify-center min-h-screen bg-background">
      <Link href="/rider/register/general">
        <div className="flex flex-col w-72 md:w-96 h-72 md:h-96 bg-card rounded-md border shadow-md hover:scale-105 transition-all duration-300 p-4 items-center justify-between text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-primary mb-4">
            Register as{" "}
            <span className="text-secondary-foreground">General</span>
          </h1>
          <div className=" md:h-72 flex">
            <Image
              src={GeneralRider}
              width={300}
              height={300}
              alt="General Rider"
            />
          </div>
        </div>
      </Link>
      <Link href="/rider/register/student">
        <div className="flex flex-col w-72 md:w-96 h-72 md:h-96 bg-card rounded-md border shadow-md hover:scale-105 transition-all duration-300 p-4 items-center justify-between text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-primary mb-4">
            Register as{" "}
            <span className="text-secondary-foreground">Student</span>
          </h1>
          <div className=" md:h-72 flex">
            <Image
              src={StudentRider}
              width={300}
              height={300}
              alt="Student Rider"
            />
          </div>
        </div>
      </Link>
      <RiderRegisterForm />
    </div>
  );
};

export default SelectRegister;
