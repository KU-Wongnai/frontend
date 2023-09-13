import React from "react";

interface SidebarProfileProps {
  setActive: (active: number) => void;
  active: number;
}

export default function SidebarProfile({
  setActive,
  active,
}: SidebarProfileProps) {
  return (
    <div className="p-6 font-bold">
      <h2 className="mb-4 text-4xl ">Setting</h2>
      <nav>
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
          <li>
            <div
              className={`flex items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-primary  hover:text-primary-foreground ${
                active === 4 ? "bg-card" : "text-gray-500"
              }`}
              onClick={() => setActive(4)}
            >
              Change Password
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
