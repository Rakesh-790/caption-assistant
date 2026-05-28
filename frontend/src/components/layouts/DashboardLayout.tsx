import { Outlet } from "react-router-dom";
import { useState } from "react";

import { Menu } from "lucide-react";
import Sidebar from "../sidebar/SideBar";
import MobileSidebar from "./MobileSideBar";


function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  return (
      <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">

        {/* Mobile Header */}
        <div className="md:hidden h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4">

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
          >
            <Menu size={24} />
          </button>

        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

export default DashboardLayout;