import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
      <div className="min-h-screen text-white bg-black">
  
        <header className="p-4 border-b border-gray-700">
          Navbar
        </header>
  
        <main className="p-6">
          <Outlet />
        </main>
  
      </div>
    );
  }

export default DashboardLayout;