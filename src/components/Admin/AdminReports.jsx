import React, {useContext, useState} from 'react'
import {AppContext} from '../../context/AppContext';
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
const AdminReports = () => {
  const {mockUnits, mockReports, mockTenants} = useContext(AppContext);

  const [toast, setToast] = useState(null);
  const [reports, setReports] = useState(mockReports);

  const updateReportStatus = (reportId, newStatus) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
    setToast({
      message: `Report status updated to "${newStatus}"`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <h1 className="text-3xl font-bold text-red-600">Reports & Issues</h1>
      <p className="text-gray-600">Manage tenant reports and maintenance requests</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-red-600">1</p>
              <p className="text-red-600 text-sm">Open Reports</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-orange-600">0</p>
              <p className="text-orange-600 text-sm">Urgent</p>
            </div>
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">1</p>
              <p className="text-blue-600 text-sm">In Progress</p>
            </div>
            <AlertCircle className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-green-600 text-sm">Resolved</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        <select className="px-3 py-2 border rounded-lg">
          <option>All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
        <select className="px-3 py-2 border rounded-lg">
          <option>All Categories</option>
          <option>Electrical</option>
          <option>Plumbing</option>
          <option>Noise</option>
          <option>Safety/Violence</option>
          <option>WiFi</option>
          <option>Maintenance</option>
        </select>
      </div>

      <div className="space-y-4">
        {reports.map(report => (
          <div key={report.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold">{report.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    report.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    report.status === 'open' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Tenant: {report.tenant}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Room: {report.room}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reported: {report.date}</p>
                  </div>
                </div>
                
                <p className="text-gray-700">{report.description}</p>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button className="text-blue-600 hover:text-blue-800 flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>
                <select 
                  value={report.status}
                  onChange={(e) => updateReportStatus(report.id, e.target.value)}
                  className="px-2 py-1 border rounded text-sm"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReports
