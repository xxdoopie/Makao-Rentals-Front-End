import React from 'react'
import { 
  Home, 
  BarChart3, 
  Building, 
  CreditCard, 
  Users, 
  AlertTriangle, 
  Settings, 
  HelpCircle, 
  Menu, 
  X, 
  Plus, 
  Search, 
  Filter,
  Bell,
  User,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Download,
  Upload,
  LogOut,
  Shield,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Security Settings</h1>
      <p className="text-gray-600">Manage your account's security settings</p>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <label className="text-sm text-gray-700">Enable Two-Factor Authentication</label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Security Settings
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Login History</h3>
          <p className="text-gray-600 mb-4">Recent login activities on your account</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">2023-07-20 14:30 UTC</p>
                <p className="text-sm text-gray-600">192.168.1.1</p>
              </div>
              <span className="text-sm text-gray-500">New York, USA</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">2023-07-19 09:15 UTC</p>
                <p className="text-sm text-gray-600">10.0.0.1</p>
              </div>
              <span className="text-sm text-gray-500">London, UK</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">2023-07-18 22:45 UTC</p>
                <p className="text-sm text-gray-600">172.16.0.1</p>
              </div>
              <span className="text-sm text-gray-500">Tokyo, Japan</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
          <p className="text-gray-600 mb-4">Currently active sessions on your account</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <div className="flex items-center">
                <Monitor className="w-5 h-5 mr-2 text-gray-600" />
                <div>
                  <p className="font-medium">Laptop</p>
                  <p className="text-sm text-gray-600">Chrome</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">Windows 10</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <div className="flex items-center">
                <Smartphone className="w-5 h-5 mr-2 text-gray-600" />
                <div>
                  <p className="font-medium">Smartphone</p>
                  <p className="text-sm text-gray-600">Safari</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">iOS 15</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center">
                <Tablet className="w-5 h-5 mr-2 text-gray-600" />
                <div>
                  <p className="font-medium">Tablet</p>
                  <p className="text-sm text-gray-600">Firefox</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">Android 12</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
            Log Out All Other Sessions
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings
