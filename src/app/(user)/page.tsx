import React from "react";
import Image from "next/image";
import FeatureIcon from "@/components/feature-icon";

export default function MainHome() {
  return (
    <>
      <div className="relative w-screen h-[300px]">
        <Image
          src="https://images.unsplash.com/photo-1628294895950-9805252327bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="KU Wongnai"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <FeatureIcon />
      <main className="container mx-auto py-6">
        {/* food category */}
        <section className="w-full bg-white pt-3 border-b rounded-2xl p-5">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            food category
          </h1>
          <div className="flex gap-10 relative">
            <Image
              src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80"
              alt="KU Wongnai"
              width={100}
              height={100}
              className="rounded-xl  filter brightness-75 w-48 h-32"
            />
            {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}
            <span className="absolute bottom-0 left-0 p-2 scroll-m-20 text-xl font-bold tracking-tight text-white">
              Japanese
            </span>
          </div>
        </section>

      </main>
    </>
  );
}
