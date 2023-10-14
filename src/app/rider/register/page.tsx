import Image from "next/image";
import React from "react";
import GeneralRider from "@/assets/rider/undraw_delivery_truck_vt6p.svg";
import StudentRider from "@/assets/rider/undraw_on_the_way_re_swjt.svg";
import Link from "next/link";

const SelectRegister = () => {
  return (
    <div className="flex flex-row gap-x-28 items-center justify-center min-h-screen bg-background">
      <Link
        href="/rider/register/general"
        className="w-96 h-96 bg-card rounded-md border shadow-md hover:scale-105 transition-all duration-300"
      >
        <h1 className="text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary p-4">
          Register as <span className="text-secondary-foreground">General</span>
        </h1>
        <div className="flex align-middle h-72">
          <Image
            src={GeneralRider}
            width={300}
            height={300}
            alt="General Rider"
            className="mx-auto my-auto"
          />
        </div>
      </Link>
      <Link
        href="/rider/register/student"
        // smooth scale on hover
        className="w-96 h-96 bg-card rounded-md border shadow-md hover:scale-105 transition-all duration-300"
      >
        <h1 className="text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary p-4">
          Register as <span className="text-secondary-foreground">Student</span>
        </h1>
        <div className="flex align-middle h-72">
          <Image
            src={StudentRider}
            width={300}
            height={300}
            alt="General Rider"
            className="mx-auto left-4 top-4 md:left-8 md:top-8 z-10"
          />
        </div>
      </Link>
    </div>
  );
};

export default SelectRegister;
