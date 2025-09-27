import { NavLink } from "react-router-dom";
import {
  Home, BarChart3, Building, CreditCard, Users,
  AlertTriangle, Settings, HelpCircle, X
} from "lucide-react";

const AdminSidebar = ({ isOpen = false, onClose = () => {} }) => {
  const sidebarItems = [
    { path: "/admin", label: "Dashboard", icon: Home },
    { path: "/admin/organisation", label: "Makao Rentals", icon: Building },
    { path: "/admin/payments", label: "Payments", icon: CreditCard },
    { path: "/admin/tenants", label: "Tenants", icon: Users },
    { path: "/admin/reports", label: "Reports & Issues", icon: AlertTriangle },
    { path: "/admin/settings", label: "Settings", icon: Settings },
    { path: "/admin/help", label: "Help", icon: HelpCircle }
  ];

  return (
    <>
      {/* Backdrop (mobile only) */}
      <div
        className={`${isOpen ? "fixed inset-0 z-40 md:hidden bg-black bg-opacity-50" : "hidden"}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-auto md:h-screen
        `}
        aria-hidden={!isOpen && true}
      >
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">TenantHub</h1>

          {/* Close button - mobile only */}
          <button
            className="md:hidden text-white"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `w-full flex items-center px-6 py-3 text-left hover:bg-gray-800 ${
                    isActive ? "bg-blue-600 text-white" : "text-gray-300"
                  }`
                }
                // close drawer on mobile when clicking a link
                onClick={() => {
                  if (typeof onClose === "function") onClose();
                }}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
