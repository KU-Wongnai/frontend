import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background p-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Header & Description */}
        <div>
          <h2 className="text-2xl font-bold">KUwongnai</h2>
          <p className="text-sm text-gray-600 mt-1">
            This is a restaurant review source within Kasetsart University that
            will provide you with convenience.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="container mx-auto text-center text-sm text-gray-600 mt-6">
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          <Image
            src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
            alt="Creative Commons Licence"
            width={88}
            height={31}
            className="border-0"
          />
        </a>
        <br />
        This work is licensed under a{" "}
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          Creative Commons Attribution-NonCommercial-ShareAlike 4.0
          International License
        </a>
        .
        <br />
        <p className="text-gray-500 text-sm mt-3">
          &copy; 2023 Your Brand Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
