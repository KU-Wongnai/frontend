import Footer from "@/components/footer";
import Navbar, { items } from "@/components/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Bike, Coins, Menu, Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";

const links = [
  {
    label: "Overview",
    href: "#overview",
  },
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

const faqs = [
  {
    id: "q-1",
    question: "How does KU Wongnai work?",
    answer:
      "KU Wongnai is a food delivery platform that makes getting great food from your favorite local restaurants as easy as every other apps.",
  },
  {
    id: "q-2",
    question: "How do I become a KU Wongnai delivery partner?",
    answer:
      "To become a KU Wongnai delivery partner, you’ll need to meet the minimum requirements for your city, have an eligible mode of transportation, and submit required documents, including a valid driver’s license.",
  },
  {
    id: "q-3",
    question: "How do I get paid?",
    answer:
      "You can track your earnings in the Dashboard tab of the KU Wongnai Rider app. Earnings are transferred automatically to your bank account every week.",
  },
  {
    id: "q-4",
    question: "Can I deliver with KU Wongnai as a individual?",
    answer:
      "Absolutely. You can sign up to deliver by using the form at the top of this page, either by filling out the form with the details of your existing account or by tapping Already have an account? Sign in. Then consent to a screening, upload the required documents, submit a photo of yourself, and download the Driver app. After you get a notification that you’re an active delivery driver, you can start getting food delivery requests.",
  },
  {
    id: "q-5",
    question: "How often would I have to deliver?",
    answer:
      "Because it isn’t a traditional food delivery job, your schedule is up to you. With KU Wongnai, you can get paid to deliver when you want and manage your own hours.",
  },
];

const RiderLandingPage = () => {
  return (
    <div>
      {/* <Navbar className="static" /> */}
      <nav className="bg-black">
        <div className="container text-white flex px-3 py-4 justify-between">
          <Link href="/" className="text-2xl">
            <span className="text-primary">KU</span> Wongnai
          </Link>
        </div>
      </nav>
      <nav className="sticky top-0 z-10 bg-white">
        <div className="container flex px-3 py-4 justify-between">
          <Link href="#" className="text-2xl font-semibold">
            Rider
          </Link>
          <ul className="hidden lg:flex items-center gap-5 text-sm text-muted-foreground">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <button className="block lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <section className="bg-black text-white">
        <div className="grid max-w-screen-xl px-4 py-16 mx-auto lg:gap-8 xl:gap-0 lg:py-24 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-semibold tracking-tight leading-none md:text-5xl dark:text-white">
              Deliver when you want,
              <br /> make what you need.
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl">
              Earn on your own schedule.
            </p>
            <Link
              href="/rider/register"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center bg-white text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              href="/auth"
              className="ml-0 lg:ml-6 border-b inline-flex items-center justify-center py-3 text-base font-medium text-center text-white focus:ring-4 focus:ring-gray-100 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-5 flex">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_1116,h_744/v1678294001/assets/b9/f88c56-5a44-46fb-8f62-9428a0f66771/original/Hero-Image---Courier---woman-on-bike.png"
              alt=""
            />
          </div>
        </div>
      </section>

      <main className="px-3 md:px-0">
        <section id="overview" className="bg-white dark:bg-gray-900">
          <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            <img
              className="w-full"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_1116,h_744/v1678294252/assets/54/a75f7c-5622-4b8f-96db-facc369ec284/original/Courier---Man-bags---Small.png"
              alt=""
            />
            <div className="mt-4 md:mt-0">
              <h2 className="mb-4 text-3xl md:text-4xl tracking-tight font-semibold text-gray-900 dark:text-white">
                Become a rider with KU Wongnai
              </h2>
              <p className="mb-6 font-light">
                Becoming a food delivery driver with KU Wongnai is a fantastic
                alternative to traditional part-time delivery driver jobs and
                other part-time employment options. Whether you&apos;re looking
                for a flexible source of income or wish to supplement your
                earnings as an existing KU Wongnai user, discover how delivering
                with us can help you achieve your financial goals.
              </p>
              <p className="mb-6 font-light">
                No matter whether you&apos;re a student, resident, or someone
                looking for part-time employment in the vicinity of Kasetsart
                University, KU Wongnai provides an excellent way to earn,
                offering a variety of delivery options.
              </p>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
        >
          <h2 className="mb-12 text-3xl md:text-4xl tracking-tight font-semibold text-gray-900 dark:text-white">
            Get paid to deliver
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-12">
            <div>
              <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-green-600 before:via-transparent before:to-emerald-600 before:rounded-xl dark:bg-slate-900">
                <Bike className="w-7 h-7 text-green-600 dark:text-green-500" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Your vehicle, your time
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  Grab your car, bike, or scooter and be a delivery driver
                  whenever you want—for an hour, a weekend, or throughout the
                  week.
                </p>
              </div>
            </div>

            <div>
              <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-green-600 before:via-transparent before:to-emerald-600 before:rounded-xl dark:bg-slate-900">
                <Coins className="w-7 h-7 text-green-600 dark:text-green-500" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Get paid quickly
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  When you get paid to deliver using KU Wongnai, your earnings
                  are automatically transferred to your bank account every week
                </p>
              </div>
            </div>

            <div>
              <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-green-600 before:via-transparent before:to-emerald-600 before:rounded-xl dark:bg-slate-900">
                <Wallet className="w-7 h-7 text-green-600 dark:text-green-500" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Track your earnings
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  See how much you earned after each delivery. Know exactly how
                  much you&apos;ll make before you accept the order.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="relative overflow-hidden">
          <div className="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto">
            <div aria-hidden="true" className="flex absolute left-0 -z-[1]">
              <div className="bg-green-200 opacity-20 blur-3xl w-[1036px] h-[300px] dark:bg-green-900 dark:opacity-20"></div>
            </div>

            <div className="lg:grid lg:grid-cols-6 lg:gap-8 lg:items-center">
              <div className="hidden lg:block lg:col-span-2">
                <img
                  className="rounded-xl"
                  src="https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Image Description"
                />
              </div>

              <div className="lg:col-span-4">
                <blockquote>
                  <h2 className="mb-4 font-semibold">
                    <span className="text-primary">KU</span> Wongnai
                  </h2>

                  <p className="text-xl font-medium text-gray-800 lg:text-2xl lg:leading-normal dark:text-gray-200">
                    Working with KU Wongnai has been a game-changer for me. The
                    flexibility allows me to balance my studies and work, and
                    the extra income is a big help.
                  </p>

                  <footer className="mt-6">
                    <div className="flex items-center">
                      <div className="lg:hidden flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full"
                          src="https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                          alt="Image Description"
                        />
                      </div>
                      <div className="ml-4 lg:ml-0">
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          Weerawong Vonggatunyu
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Computer Science Student
                        </p>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
        >
          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-2">
              <div className="max-w-xs">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
                  Frequently
                  <br />
                  asked questions
                </h2>
                <p className="mt-1 hidden md:block text-gray-600 dark:text-gray-400">
                  Answers to the most frequently asked questions.
                </p>
              </div>
            </div>

            <div className="md:col-span-3">
              <Accordion type="single" collapsible>
                {faqs.map((faq) => (
                  <AccordionItem value={faq.id} key={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h2 className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
                Ready to get started?
              </h2>
              <p className="mb-6 font-light text-gray-500 dark:text-gray-400">
                Start delivering with KU Wongnai today.
              </p>
              <Button className="text-base md:text-lg py-6" asChild>
                <Link href="/rider/register">Register now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RiderLandingPage;
