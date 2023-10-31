import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    // <footer className="bg-background p-3">
    //   <div className="container mx-auto flex justify-between items-center">
    //     {/* Header & Description */}
    //     <div>
    //       <h2 className="text-2xl font-bold">KUwongnai</h2>
    //       <p className="text-sm text-gray-600 mt-1">
    //         This is a restaurant review source within Kasetsart University that
    //         will provide you with convenience.
    //       </p>
    //     </div>

    //     {/* Social Icons */}
    //     <div className="flex space-x-4">
    //       <a
    //         href="https://facebook.com"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Facebook className="w-5 h-5" />
    //       </a>
    //       <a
    //         href="https://twitter.com"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Instagram className="w-5 h-5" />
    //       </a>
    //       <a
    //         href="https://instagram.com"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Twitter className="w-5 h-5" />
    //       </a>
    //     </div>
    //   </div>

    //   <div className="container mx-auto text-center text-sm text-gray-600 mt-6">
    //     <a
    //       rel="license"
    //       href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
    //     >
    //       <Image
    //         src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
    //         alt="Creative Commons Licence"
    //         width={88}
    //         height={31}
    //         className="border-0"
    //       />
    //     </a>
    //     <br />
    //     This work is licensed under a{" "}
    //     <a
    //       rel="license"
    //       href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
    //     >
    //       Creative Commons Attribution-NonCommercial-ShareAlike 4.0
    //       International License
    //     </a>
    //     .
    //     <br />
    //     <p className="text-gray-500 text-sm mt-3">
    //       &copy; 2023 Your Brand Name. All rights reserved.
    //     </p>
    //   </div>
    // </footer>
    <footer className="w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
        <div className="col-span-full hidden lg:col-span-1 lg:block">
          <a
            className="flex-none text-xl font-semibold dark:text-white"
            href="#"
            aria-label="Brand"
          >
            KU Wongnai
          </a>
          <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} KU Wongnai Inc.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-gray-100">
            Product
          </h4>

          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="/"
              >
                Eat
              </a>
            </p>
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="/rider"
              >
                Become a Rider
              </a>
            </p>
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="/business"
              >
                Add Your Restaurant
              </a>
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-gray-100">
            Company
          </h4>

          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="/about"
              >
                About us
              </a>
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-gray-100">
            Resources
          </h4>

          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="https://discord.com"
              >
                Community
              </a>
            </p>
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="/help"
              >
                Help & Support
              </a>
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-gray-100">
            Developers
          </h4>

          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="https://github.com/ku-wongnai"
              >
                Contribute to KU Wongnai
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="pt-5 mt-5 border-t border-gray-200 dark:border-gray-700">
        <div className="sm:flex sm:justify-between sm:items-center">
          <div className="flex items-center gap-x-3">
            <div className="space-x-4 text-sm">
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="/terms"
              >
                Terms
              </a>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="/privacy"
              >
                Privacy
              </a>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="/status"
              >
                Status
              </a>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="mt-3 sm:hidden">
              <a
                className="flex-none text-xl font-semibold dark:text-white"
                href="#"
                aria-label="Brand"
              >
                KU Wongnai
              </a>
              <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} KU Wongnai Inc.
              </p>
            </div>

            <div className="space-x-4">
              <a
                className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                href="https://facebook.com/"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                href="https://instagram.com/"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                href="https://twitter.com/"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
