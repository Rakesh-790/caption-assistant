import { X, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../types/store/auth.store";
import { sidebarItems } from "../sidebar/sidebar.data";
import SidebarItem from "../sidebar/SideItems";


type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

function MobileSidebar({
  isOpen,
  onClose,
}: MobileSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();

    navigate("/login");

    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden
          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Sidebar Drawer */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 z-50
          transform transition-transform duration-300 md:hidden
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex flex-col justify-between h-full">

          {/* Top Section */}
          <div>

            {/* Header */}
            <div className="h-16 px-4 border-b border-zinc-800 flex items-center justify-between">

              <h1 className="text-xl font-bold">
                AI Caption
              </h1>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-zinc-800 transition-all duration-200"
              >
                <X size={20} />
              </button>

            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">

              {sidebarItems.map((item) => (
                <div
                  key={item.path}
                  onClick={onClose}
                >
                  <SidebarItem
                    label={item.label}
                    path={item.path}
                    icon={item.icon}
                    isActive={
                      location.pathname === item.path
                    }
                  />
                </div>
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

        </div>
      </aside>
    </>
  );
}

export default MobileSidebar;