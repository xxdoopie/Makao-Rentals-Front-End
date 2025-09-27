import React, {useContext} from 'react'
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
import {AppContext} from '../../context/AppContext';
const AdminOrganisation = () => {

  const {mockReports, mockTenants} = useContext(AppContext);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">About Makao Rentals</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Tenants</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-gray-600 text-sm">+4 from last month</p>
            </div>
            <Users className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Apartment Blocks</p>
              <p className="text-3xl font-bold text-gray-900">1</p>
              <p className="text-gray-600 text-sm">No change from last month</p>
            </div>
            <Building className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Documents</p>
              <p className="text-3xl font-bold text-gray-900">128</p>
              <p className="text-gray-600 text-sm">+12 from last month</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Settings</p>
              <p className="text-3xl font-bold text-gray-900">7</p>
              <p className="text-gray-600 text-sm">Pending approvals</p>
            </div>
            <Settings className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Organisation Overview</h2>
        <p className="text-gray-600 mb-6">Makao Rentals is a leading property management company in Kenya, providing innovative rental solutions.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Company Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Founded:</span>
                <span>2018</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Headquarters:</span>
                <span>Nairobi, Kenya</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Industry:</span>
                <span>Property Management</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span>info@makaorentals.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span>+254 712 345 678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Address:</span>
                <span>Westlands, Nairobi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Website:</span>
                <span>www.makaorentals.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {mockReports.map(report => (
              <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{report.title}</p>
                  <p className="text-sm text-gray-600">{report.tenant} - Room {report.room}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  report.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {report.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Tenants</h3>
          <div className="space-y-3">
            {mockTenants.map(tenant => (
              <div key={tenant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{tenant.name}</p>
                  <p className="text-sm text-gray-600">Room {tenant.room}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {tenant.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminOrganisation;
