import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../context/AuthContext";
import { LogOut, Menu, Bell, X, AlertTriangle, Clock, User, Eye } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNotifications } from "../../context/NotificationContext";
import { NavLink } from "react-router-dom";

export default function AdminLayout() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const { notifications, markReportsAsViewed } = useNotifications();
  const dropdownRef = useRef(null);

  // Mock notification data - replace with real data from your context
  const mockNotifications = [
    {
      id: 1,
      type: 'report',
      title: 'New Report: Power Outlet Not Working',
      message: 'John Doe reported an electrical issue in Room A101',
      timestamp: new Date(Date.now() - 10 * 60000), // 10 minutes ago
      isRead: false,
      priority: 'high',
      tenant: 'John Doe',
      room: 'A101'
    },
    {
      id: 2,
      type: 'report',
      title: 'Report Update: Leaky Faucet',
      message: 'Maintenance team started working on the plumbing issue',
      timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
      isRead: false,
      priority: 'medium',
      tenant: 'Jane Smith',
      room: 'B205'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Overdue',
      message: 'Mike Johnson has an overdue payment of KSh 35,000',
      timestamp: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
      isRead: true,
      priority: 'high',
      tenant: 'Mike Johnson',
      room: 'C301'
    },
    {
      id: 4,
      type: 'tenant',
      title: 'New Tenant Application',
      message: 'Sarah Wilson submitted an application for Room A102',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60000), // 3 days ago
      isRead: true,
      priority: 'low',
      tenant: 'Sarah Wilson',
      room: 'A102'
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleNotificationClick = () => {
    setNotificationDropdownOpen(!notificationDropdownOpen);
    if (!notificationDropdownOpen) {
      // Mark notifications as viewed when opening dropdown
      markReportsAsViewed();
    }
  };

  const getNotificationIcon = (type, priority) => {
    switch (type) {
      case 'report':
        return <AlertTriangle className={`w-4 h-4 ${priority === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />;
      case 'payment':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'tenant':
        return <User className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

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
            {/* Notification Bell with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleNotificationClick}
                className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                aria-label="Notifications"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notificationDropdownOpen && (
                <div className="absolute right-[-40px] sm:right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    <button
                      onClick={() => setNotificationDropdownOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-80 overflow-y-auto">
                    {mockNotifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-gray-500">
                        <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {mockNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                              !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                {getNotificationIcon(notification.type, notification.priority)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className={`text-sm font-medium text-gray-900 truncate ${
                                    !notification.isRead ? 'font-semibold' : ''
                                  }`}>
                                    {notification.title}
                                  </p>
                                  <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                {notification.tenant && (
                                  <div className="flex items-center mt-2 text-xs text-gray-500">
                                    <span>{notification.tenant}</span>
                                    {notification.room && (
                                      <>
                                        <span className="mx-1">•</span>
                                        <span>Room {notification.room}</span>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Action buttons for reports */}
                            {notification.type === 'report' && (
                              <div className="mt-2 ml-7">
                                <NavLink
                                  to="/admin/reports"
                                  onClick={() => setNotificationDropdownOpen(false)}
                                  className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  View Report
                                </NavLink>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {mockNotifications.length > 0 && (
                    <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                          Mark all as read
                        </button>
                        <NavLink
                          to="/admin/reports"
                          onClick={() => setNotificationDropdownOpen(false)}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View all reports →
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

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