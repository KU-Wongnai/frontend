"use client";

import { useState } from "react";
import MainProfile from "./components/MainProfile";
import SidebarProfile from "./components/SidebarProfile";

export default function Profile() {
  const [active, setActive] = useState(1);
  return (
    <>
      <div className="container px-4 py-6 mx-auto my-4">
        <div className="flex flex-col h-screen m-auto sm:flex-row">
          {/* Sidebar */}
          <aside className="w-full overflow-hidden rounded-lg sm:w-80">
            {/* Sidebar content */}
            <SidebarProfile active={active} setActive={setActive} />
          </aside>

          {/* Main content */}
          <MainProfile active={active} />
        </div>
      </div>
    </>
  );
}
