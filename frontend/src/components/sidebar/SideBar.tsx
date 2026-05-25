import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import SidebarItem from "./SideItems";
import { sidebarItems } from "./sidebar.data";

import { useAuthStore } from "../../types/store/auth.store";
import { logoutUser } from "../../service/authService";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logoutState = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logoutUser();

      logoutState();

      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside className="hidden md:flex w-64 bg-zinc-900 border-r border-zinc-800 flex-col justify-between">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold">
            AI Caption
          </h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.path}
              label={item.label}
              path={item.path}
              icon={item.icon}
              isActive={location.pathname === item.path}
            />
          ))}
        </nav>

      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-zinc-800">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all duration-200"
        >
          <LogOut size={20} />

          <span className="font-medium">
            Logout
          </span>
        </button>

      </div>
    </aside>
  );
}

export default Sidebar;