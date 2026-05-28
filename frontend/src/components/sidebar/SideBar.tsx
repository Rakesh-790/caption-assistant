import { LogIn, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import SidebarItem from "./SideItems";
import { sidebarItems } from "./sidebar.data";

import { useAuthStore } from "../../types/store/auth.store";
import { logoutUser } from "../../service/authService";
import ThemeToggle from "../common/ToggleTheme";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logoutState = useAuthStore((state) => state.logout);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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
    <aside
      className="hidden md:flex w-64 flex-col justify-between bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800
      transition-colors duration-300"
    >
      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="h-16 flex items-center justify-center px-4 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-xl font-bold flex items-center gap-1 text-zinc-900 dark:text-white">
            Caption Assistant
          </h1>
          
            <ThemeToggle />
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
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">

        {
          isLoading ? null : isAuthenticated ? (

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-600 dark:text-zinc-400 
              hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all 
              duration-200"
            >
              <LogOut size={20} />

              <span className="font-medium">
                Logout
              </span>
            </button>

          ) : (

            <button
              onClick={() => navigate("/login")}
              className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-600 dark:text-zinc-400 
              hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all 
              duration-200"
            >
              <LogIn size={20} />

              <span className="font-medium">
                Login
              </span>
            </button>

          )
        }

      </div>
    </aside>
  );
}

export default Sidebar;