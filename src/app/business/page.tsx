import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Arrow } from "@radix-ui/react-popover";
import {
  ArrowRight,
  Landmark,
  LogIn,
  PiggyBank,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

const features = [
  {
    icons: <LogIn />,
    title: "Easy University Sign-Up",
    description:
      "Joining is a breeze! If your restaurant is within Kasetsart University, you can quickly add it to our platform, making onboarding a snap.",
  },
  {
    icons: <UtensilsCrossed />,
    title: "Manage Menus and Orders",
    description:
      "Take control with ease. Manage your menu and orders in real-time through our user-friendly interface, ensuring you never miss a beat.",
  },
  {
    icons: <PiggyBank />,
    title: "Zero Setup Costs",
    description:
      "Experience the future of dining without the setup costs. Our platform brings your restaurant online with no financial burden, recreating the offline dining experience in a digital world.",
  },
  {
    icons: <Landmark />,
    title: "Transparent Earnings and Payouts",
    description:
      "Stay in the know. Track your earnings effortlessly and receive weekly payouts directly to your bank account, guaranteeing a steady stream of income.",
  },
];

const RestaurantLandingPage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center relative min-h-[100dvh]">
        <Image
          src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill={true}
          className="absolute object-cover w-full h-full -z-10 brightness-50"
        />
        <header className="absolute top-0 text-white py-4">
          <div className="container mx-auto">
            <Link href="/" className="text-xl">
              <span className="text-primary font-semibold">KU</span> Wongnai{" "}
              <span className="text-base">for Merchants</span>
            </Link>
          </div>
        </header>
        <section>
          <div className="flex justify-center h-full max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="text-white max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                Grow your business with KU Wongnai
              </h1>
              <p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl">
                KU Wongnai is a platform that helps connect businesses within
                Kasetsart University. We provide a variety of services to help
                you grow your business and make it online.
              </p>
              <Link
                href="/restaurants/create"
                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-white hover:bg-gray-300 focus:ring-4 focus:ring-primary-300"
              >
                Get started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Why should you join us
            </h2>
            <p className="mb-4">
              If you are a business owner in Kasetsart University, you should be
              on KU Wongnai. We provide a variety of services to help you grow
              your business and make it online.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=3077&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="chef 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="chef 2"
            />
          </div>
        </div>
      </section>

      <section className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pt-14 lg:pb-32 mx-auto">
        <h2 className="relative text-center mb-32 font-extrabold text-4xl sm:text-5xl md:text-7xl">
          What the{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-300">
            student
          </span>{" "}
          says
        </h2>
        <div className="md:grid md:grid-cols-2 md:gap-10 lg:gap-16 md:items-center">
          <div className="hidden md:block mb-24 md:mb-0 sm:px-6">
            <div className="relative">
              <img
                className="rounded-xl"
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=500&h=600&q=80"
                alt="Image Description"
              />

              <div className="absolute bottom-0 left-0 -z-[1] translate-y-10 -translate-x-14">
                <svg
                  className="max-w-[10rem] h-auto text-slate-400 dark:text-slate-700"
                  width="696"
                  height="653"
                  viewBox="0 0 696 653"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="72.5" cy="29.5" r="29.5" fill="currentColor" />
                  <circle cx="171.5" cy="29.5" r="29.5" fill="currentColor" />
                  <circle cx="270.5" cy="29.5" r="29.5" fill="currentColor" />
                  <circle cx="369.5" cy="29.5" r="29.5" fill="currentColor" />
                  <circle cx="468.5" cy="29.5" r="29.5" fill="currentColor" />
                  <circle cx="567.5" cy="29.5" r="29.5" fill="currentColor" />
                  <circle cx="666.5" cy="29.5" r="29.5" fill="currentColor" />
                  <circle cx="29.5" cy="128.5" r="29.5" fill="currentColor" />
                  <circle cx="128.5" cy="128.5" r="29.5" fill="currentColor" />
                  <circle cx="227.5" cy="128.5" r="29.5" fill="currentColor" />
                  <circle cx="326.5" cy="128.5" r="29.5" fill="currentColor" />
                  <circle cx="425.5" cy="128.5" r="29.5" fill="currentColor" />
                  <circle cx="524.5" cy="128.5" r="29.5" fill="currentColor" />
                  <circle cx="623.5" cy="128.5" r="29.5" fill="currentColor" />
                  <circle cx="72.5" cy="227.5" r="29.5" fill="currentColor" />
                  <circle cx="171.5" cy="227.5" r="29.5" fill="currentColor" />
                  <circle cx="270.5" cy="227.5" r="29.5" fill="currentColor" />
                  <circle cx="369.5" cy="227.5" r="29.5" fill="currentColor" />
                  <circle cx="468.5" cy="227.5" r="29.5" fill="currentColor" />
                  <circle cx="567.5" cy="227.5" r="29.5" fill="currentColor" />
                  <circle cx="666.5" cy="227.5" r="29.5" fill="currentColor" />
                  <circle cx="29.5" cy="326.5" r="29.5" fill="currentColor" />
                  <circle cx="128.5" cy="326.5" r="29.5" fill="currentColor" />
                  <circle cx="227.5" cy="326.5" r="29.5" fill="currentColor" />
                  <circle cx="326.5" cy="326.5" r="29.5" fill="currentColor" />
                  <circle cx="425.5" cy="326.5" r="29.5" fill="currentColor" />
                  <circle cx="524.5" cy="326.5" r="29.5" fill="currentColor" />
                  <circle cx="623.5" cy="326.5" r="29.5" fill="currentColor" />
                  <circle cx="72.5" cy="425.5" r="29.5" fill="currentColor" />
                  <circle cx="171.5" cy="425.5" r="29.5" fill="currentColor" />
                  <circle cx="270.5" cy="425.5" r="29.5" fill="currentColor" />
                  <circle cx="369.5" cy="425.5" r="29.5" fill="currentColor" />
                  <circle cx="468.5" cy="425.5" r="29.5" fill="currentColor" />
                  <circle cx="567.5" cy="425.5" r="29.5" fill="currentColor" />
                  <circle cx="666.5" cy="425.5" r="29.5" fill="currentColor" />
                  <circle cx="29.5" cy="524.5" r="29.5" fill="currentColor" />
                  <circle cx="128.5" cy="524.5" r="29.5" fill="currentColor" />
                  <circle cx="227.5" cy="524.5" r="29.5" fill="currentColor" />
                  <circle cx="326.5" cy="524.5" r="29.5" fill="currentColor" />
                  <circle cx="425.5" cy="524.5" r="29.5" fill="currentColor" />
                  <circle cx="524.5" cy="524.5" r="29.5" fill="currentColor" />
                  <circle cx="623.5" cy="524.5" r="29.5" fill="currentColor" />
                  <circle cx="72.5" cy="623.5" r="29.5" fill="currentColor" />
                  <circle cx="171.5" cy="623.5" r="29.5" fill="currentColor" />
                  <circle cx="270.5" cy="623.5" r="29.5" fill="currentColor" />
                  <circle cx="369.5" cy="623.5" r="29.5" fill="currentColor" />
                  <circle cx="468.5" cy="623.5" r="29.5" fill="currentColor" />
                  <circle cx="567.5" cy="623.5" r="29.5" fill="currentColor" />
                  <circle cx="666.5" cy="623.5" r="29.5" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <blockquote className="relative">
              <svg
                className="absolute top-0 left-0 transform -translate-x-8 -translate-y-4 h-24 w-24 text-gray-200 dark:text-gray-700"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                  fill="currentColor"
                />
              </svg>

              <div className="relative z-10">
                <p className="text-xs font-semibold text-gray-500 tracking-wide uppercase mb-3 dark:text-gray-200">
                  Featured student
                </p>

                <p className="text-xl font-medium italic text-gray-800 md:text-2xl md:leading-normal xl:text-3xl xl:leading-normal dark:text-gray-200">
                  I love how I can order food from my favorite restaurants
                  without needing to go there.
                </p>
              </div>

              <footer className="mt-6">
                <div className="flex items-center">
                  <div className="md:hidden flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                      alt="Image Description"
                    />
                  </div>
                  <div className="ml-4 md:ml-0">
                    <div className="text-base font-semibold text-gray-800 dark:text-gray-200">
                      Weerawong Vonggatunyu
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Student who loves to eat
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-32">
        <div className="text-center mb-12 md:mb-32">
          <h2 className="pt-32 pb-3 text-transparent font-semibold bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-300">
            Features
          </h2>
          <p className="tracking-ff-tighter font-bold text-4xl sm:text-7xl">
            Unlock Restaurant Power
          </p>
        </div>
        <div className="grid grid-cols-2 w-full mx-auto max-w-6xl gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-700 block h-full w-full py-12 px-4 md:py-12 md:pl-12 md:pr-16 group"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-blue-300 inline-block p-3 rounded-lg mb-3">
                {feature.icons}
              </div>
              <h2 className="font-bold mb-4 text-3xl md:text-4xl">
                {feature.title}
              </h2>
              <p className="mb-11 md:text-lg text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-12 px-6 sm:px-0 py-32 relative text-center bg-gradient-to-br from-emerald-400 to-blue-300">
        <h2 className="text-3xl font-semibold">Ready to get started?</h2>
        <p className="max-w-xl mx-auto text-lg">
          Join us and start your business today. Let&apos;s make KU better
          together.
        </p>
        <Link
          href="/restaurants/create"
          className="font-bold inline-block overflow-hidden max-w-full transition-all focus-visible:outline-4 focus-visible:outline-state-focus focus-visible:outline-offset-[-2px] border-solid border-2 rounded-[30px] focus-visible:outline-none tracking-ff-tight text-body-base leading-none px-[1.75rem] py-[1.1875rem] border-[transparent] text-white bg-black hover:bg-neutral-900"
        >
          Get started
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default RestaurantLandingPage;
