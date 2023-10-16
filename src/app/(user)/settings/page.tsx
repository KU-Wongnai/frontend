"use client";

import { useState } from "react";
import MainProfile from "./components/main-profile";
import SidebarProfile from "./components/sidebar-profile";

export default function Profile() {
  const [active, setActive] = useState(1);
  return (
    <>
      <div className="container px-4 pb-6 mx-auto">
        <div className="flex flex-col m-auto sm:flex-row">
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
