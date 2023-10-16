import React, { useState } from "react";

interface SidebarProfileProps {
  setActive: (active: number) => void;
  active: number;
}

export default function SidebarProfile({
  setActive,
  active,
}: SidebarProfileProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="md:p-6 mr-4 font-bold">
      <h2 className="mb-4 text-4xl hidden md:block">Settings</h2>
      <div className="sm:hidden grid place-content-center">
        <button
          className="flex justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
      <nav className={`sm:block mt-2 md:mt-0 ${menuOpen ? "block" : "hidden"}`}>
        <ul className="space-y-2 text-lg">
          <li>
            <div
              className={`flex items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-primary  hover:text-primary-foreground ${
                active === 1 ? "bg-card" : "text-gray-500"
              }`}
              onClick={() => setActive(1)}
            >
              Profile
            </div>
          </li>
          <li>
            <div
              className={`flex items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-primary  hover:text-primary-foreground ${
                active === 2 ? "bg-card" : "text-gray-500"
              }`}
              onClick={() => setActive(2)}
            >
              Order
            </div>
          </li>
          <li>
            <div
              className={`flex items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-primary  hover:text-primary-foreground ${
                active === 3 ? "bg-card" : "text-gray-500"
              }`}
              onClick={() => setActive(3)}
            >
              History
            </div>
          </li>
          {/* <li>
            <div
              className={`flex items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-primary  hover:text-primary-foreground ${
                active === 4 ? "bg-card" : "text-gray-500"
              }`}
              onClick={() => setActive(4)}
            >
              Change Password
            </div>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}
