import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../context/AuthContext";
import { LogOut, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminLayout() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close mobile drawer when resizing up
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content (shifts right only on md+) */}
      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            {/* Hamburger - mobile only */}
            <button
              className="mr-3 p-2 text-gray-600 hover:text-gray-800 md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600 hidden md:inline">Welcome, Admin</span>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-800 flex items-center"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5 mr-1" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Routed page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
