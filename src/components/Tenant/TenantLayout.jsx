import { Outlet } from "react-router-dom";
import TenantMobileNav from "./TenantMobileNav";
import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

export default function TenantLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white shadow-sm border-b px-4 py-3 flex justify-between items-center">
        <span className="text-gray-600">Welcome, Tenant</span>
        <button
          onClick={logout}
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <LogOut className="w-5 h-5 mr-1" /> Logout
        </button>
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-auto p-6">
        <Outlet />
      </div>

      {/* Bottom mobile nav (part of flex column, not fixed) */}
      <TenantMobileNav />
    </div>
  );
}
