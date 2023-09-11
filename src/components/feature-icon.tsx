import { Pizza, Utensils } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function FeatureIcon() {
  return (
    <section className="w-full h-[100px] bg-card pt-3 border-b">
      <div className="container mx-auto">
        <div className="flex gap-10">
          {/* icon menu */}
          <Link href="/" className="flex flex-col justify-center items-center">
            <div
              className="bg-lime-400 w-14 h-14 flex items-center justify-center"
              style={{ borderRadius: "40%" }}
            >
              <Utensils />
            </div>
            <p className="text-sm font-bold">restaurant</p>
          </Link>
          <Link href="/" className="flex flex-col justify-center items-center">
            <div
              className="bg-orange-500 w-14 h-14 flex items-center justify-center"
              style={{ borderRadius: "40%" }}
            >
              <Pizza />
            </div>
            <p className="text-sm font-bold">menu</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
