import React, { useState, useEffect } from 'react';
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

// Mock data for development
const mockTenants = [
  { id: 1, name: 'John Doe', email: 'john@email.com', room: 'A101', phone: '+254712345678', status: 'active', rentStatus: 'paid', bookingId: 'BK001' },
  { id: 2, name: 'Jane Smith', email: 'jane@email.com', room: 'B205', phone: '+254723456789', status: 'active', rentStatus: 'due', bookingId: 'BK002' },
  { id: 3, name: 'Mike Johnson', email: 'mike@email.com', room: 'C301', phone: '+254734567890', status: 'pending', rentStatus: 'overdue', bookingId: 'BK003' }
];

const mockReports = [
  { id: 1, title: 'Power Outlet Not Working', tenant: 'John Doe', room: 'A101', category: 'Electrical', priority: 'high', status: 'open', date: '15/03/2024', description: 'Main power outlet not working' },
  { id: 2, title: 'Leaky Faucet', tenant: 'Jane Smith', room: 'B205', category: 'Plumbing', priority: 'medium', status: 'in-progress', date: '10/03/2024', description: 'Kitchen faucet leaking' }
];

const mockUnits = [
  { id: 1, unitNumber: 'A101', type: '1BR', rent: 25000, isOccupied: true, tenant: 'John Doe' },
  { id: 2, unitNumber: 'B205', type: '2BR', rent: 35000, isOccupied: true, tenant: 'Jane Smith' },
  { id: 3, unitNumber: 'C301', type: 'Studio', rent: 20000, isOccupied: false, tenant: null }
];

// Toast Notification Component
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}>
      <div className="flex items-center">
        {type === 'success' ? <CheckCircle className="w-5 h-5 mr-2" /> : <XCircle className="w-5 h-5 mr-2" />}
        {message}
      </div>
    </div>
  );
};

// Email Form Modal Component
const EmailFormModal = ({ isOpen, onClose, tenants }) => {
  const [emailData, setEmailData] = useState({
    recipients: 'all',
    selectedTenants: [],
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      recipients: emailData.recipients,
      selectedTenants: emailData.recipients === 'specific' ? emailData.selectedTenants : null,
      subject: emailData.subject,
      message: emailData.message
    };

    try {
      // Prepare for Django API integration
      // const response = await fetch('/api/v1/communications/send-email/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(payload)
      // });
      
      console.log('Email payload ready for backend:', payload);
      alert('Email sent successfully!');
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };

  const handleTenantSelection = (tenantId) => {
    setEmailData(prev => ({
      ...prev,
      selectedTenants: prev.selectedTenants.includes(tenantId)
        ? prev.selectedTenants.filter(id => id !== tenantId)
        : [...prev.selectedTenants, tenantId]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Send Email to Tenants</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="recipients"
                  value="all"
                  checked={emailData.recipients === 'all'}
                  onChange={(e) => setEmailData(prev => ({ ...prev, recipients: e.target.value }))}
                  className="mr-2"
                />
                All Tenants
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="recipients"
                  value="specific"
                  checked={emailData.recipients === 'specific'}
                  onChange={(e) => setEmailData(prev => ({ ...prev, recipients: e.target.value }))}
                  className="mr-2"
                />
                Specific Tenants
              </label>
            </div>
          </div>

          {emailData.recipients === 'specific' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Tenants</label>
              <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
                {tenants.map(tenant => (
                  <label key={tenant.id} className="flex items-center py-2">
                    <input
                      type="checkbox"
                      checked={emailData.selectedTenants.includes(tenant.id)}
                      onChange={() => handleTenantSelection(tenant.id)}
                      className="mr-2"
                    />
                    <span>{tenant.name} ({tenant.room})</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              required
              value={emailData.subject}
              onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Email subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              required
              rows={6}
              value={emailData.message}
              onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center"
            >
              <Send className="w-5 h-5 mr-2" />
              Send Email
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Admin Components
const AdminSidebar = ({ activeView, setActiveView, isMobile, isOpen, onClose }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'organisation', label: 'Organisation', icon: Building },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'tenants', label: 'Tenants', icon: Users },
    { id: 'reports', label: 'Reports & Issues', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle }
  ];

  const sidebarClass = isMobile 
    ? `fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`
    : 'w-64 bg-gray-900 h-screen fixed left-0 top-0';

  return (
    <div className={sidebarClass}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">TenantHub</h1>
          {isMobile && (
            <button onClick={onClose} className="text-white">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
      <nav className="mt-8">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                if (isMobile) onClose();
              }}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-800 ${
                activeView === item.id ? 'bg-blue-600 text-white' : 'text-gray-300'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

const AdminDashboard = ({ onEmailClick }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your property and tenants</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onEmailClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Mail className="w-5 h-5 mr-2" />
            Send Email
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Tenant
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Tenants</p>
              <p className="text-3xl font-bold text-blue-900">2</p>
              <p className="text-blue-600 text-sm">2 active</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Monthly Revenue</p>
              <p className="text-3xl font-bold text-green-900">KSh 55,000</p>
              <p className="text-green-600 text-sm">Expected monthly</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Rent Due</p>
              <p className="text-3xl font-bold text-orange-900">KSh 5,000</p>
              <p className="text-orange-600 text-sm">Outstanding payments</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Open Reports</p>
              <p className="text-3xl font-bold text-red-900">1</p>
              <p className="text-red-600 text-sm">Require attention</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Tenants</h3>
          <div className="space-y-3">
            {mockTenants.slice(0, 2).map(tenant => (
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
          <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium">
            View All Tenants
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {mockReports.slice(0, 2).map(report => (
              <div key={report.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{report.title}</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    report.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{report.tenant} - Room {report.room}</p>
                <p className="text-sm text-gray-500">{report.category}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium">
            View All Reports
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">KSh 9,500,000</p>
          <p className="text-sm text-green-600">+15.3% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">New Customers</h3>
          <p className="text-3xl font-bold text-gray-900">850</p>
          <p className="text-sm text-green-600">+12.5% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Accounts</h3>
          <p className="text-3xl font-bold text-gray-900">3,245</p>
          <p className="text-sm text-green-600">+8.2% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Growth Rate</h3>
          <p className="text-3xl font-bold text-gray-900">12.4%</p>
          <p className="text-sm text-green-600">+3.1% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Revenue over time</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Mark Talamson</p>
                <p className="text-sm text-gray-600">2023-07-20</p>
              </div>
              <span className="text-green-600 font-medium">+KSh 35,000</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Jeremy Shiroya</p>
                <p className="text-sm text-gray-600">2023-07-19</p>
              </div>
              <span className="text-red-600 font-medium">-KSh 12,050</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminOrganisation = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Organisation</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Members</p>
              <p className="text-3xl font-bold text-gray-900">61</p>
              <p className="text-gray-600 text-sm">+4 from last month</p>
            </div>
            <Users className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Departments</p>
              <p className="text-3xl font-bold text-gray-900">5</p>
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
                <span className="text-gray-600">Employees:</span>
                <span>61</span>
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

const AdminPayments = () => {
  const [editingUnit, setEditingUnit] = useState(null);
  const [units, setUnits] = useState(mockUnits);

  const handlePriceUpdate = (unitId, newPrice) => {
    setUnits(units.map(unit => 
      unit.id === unitId ? { ...unit, rent: parseFloat(newPrice) } : unit
    ));
    setEditingUnit(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Payments</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">All Payments</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Payment ID</th>
                <th className="text-left py-3 px-4">Client</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Method</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">PAY-001</td>
                <td className="py-3 px-4">John Doe</td>
                <td className="py-3 px-4">KSh 25,000</td>
                <td className="py-3 px-4">2024-03-15</td>
                <td className="py-3 px-4">M-Pesa</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">PAY-002</td>
                <td className="py-3 px-4">Jane Smith</td>
                <td className="py-3 px-4">KSh 35,000</td>
                <td className="py-3 px-4">2024-03-10</td>
                <td className="py-3 px-4">Bank Transfer</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Processing</span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Unit Rental Prices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {units.map(unit => (
            <div key={unit.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Unit {unit.unitNumber}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  unit.isOccupied ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {unit.isOccupied ? 'Occupied' : 'Vacant'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Type: {unit.type}</p>
              {unit.tenant && <p className="text-sm text-gray-600 mb-2">Tenant: {unit.tenant}</p>}
              
              <div className="flex items-center justify-between">
                {editingUnit === unit.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      defaultValue={unit.rent}
                      className="w-24 p-1 border rounded"
                      onBlur={(e) => handlePriceUpdate(unit.id, e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handlePriceUpdate(unit.id, e.target.value);
                        }
                      }}
                      autoFocus
                    />
                    <button
                      onClick={() => setEditingUnit(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">KSh {unit.rent.toLocaleString()}</span>
                    <button
                      onClick={() => setEditingUnit(unit.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminTenants = ({ onEmailClick }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-600">Manage all tenant accounts and information</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onEmailClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Mail className="w-5 h-5 mr-2" />
            Send Email
          </button>
          <button 
            onClick={() => window.open('/tenant-signup', '_blank')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Tenant
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tenants..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">2</p>
            <p className="text-sm text-gray-600">Total Tenants</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">2</p>
            <p className="text-sm text-gray-600">Active Tenants</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">All Tenants</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Tenant</th>
                  <th className="text-left py-3 px-4">Room</th>
                  <th className="text-left py-3 px-4">Contact</th>
                  <th className="text-left py-3 px-4">Rent Status</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockTenants.map(tenant => (
                  <tr key={tenant.id} className="border-b">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{tenant.name}</p>
                        <p className="text-sm text-gray-600">{tenant.email}</p>
                        <p className="text-sm text-gray-600">ID: {tenant.bookingId}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{tenant.room}</p>
                        <p className="text-sm text-gray-600">Booking: {tenant.bookingId}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="flex items-center"><Phone className="w-4 h-4 mr-1" /> {tenant.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">KSh 25,000</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          tenant.rentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          tenant.rentStatus === 'due' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tenant.rentStatus === 'paid' ? 'Paid' : 
                           tenant.rentStatus === 'due' ? 'Due: KSh 5,000' : 'Overdue'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <select 
                        defaultValue={tenant.status}
                        className="px-2 py-1 border rounded text-sm"
                        onChange={(e) => {
                          // Handle status change - prepare for API integration
                          console.log(`Updating tenant ${tenant.id} status to ${e.target.value}`);
                        }}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminReports = () => {
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

const AdminHelp = () => {
  const faqs = [
    {
      question: "How do I add a new tenant?",
      answer: "Click on 'Add New Tenant' in the Tenants section. This will open the tenant registration form where you can input all necessary details."
    },
    {
      question: "How do I update rental prices?",
      answer: "Go to the Payments section and click on 'Unit Rental Prices'. You can edit the rent amount for each unit by clicking the edit icon next to the price."
    },
    {
      question: "How do I handle maintenance requests?",
      answer: "All maintenance requests appear in the 'Reports & Issues' section. You can update the status of each request and tenants will be notified automatically."
    },
    {
      question: "How do I send emails to tenants?",
      answer: "Use the 'Send Email' button available in multiple sections. You can choose to email all tenants or select specific tenants."
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
      <p className="text-gray-600">Frequently asked questions and support resources</p>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Mail className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-medium">Email Support</h3>
              <p className="text-sm text-gray-600">support@makaorentals.com</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Phone className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-medium">Phone Support</h3>
              <p className="text-sm text-gray-600">+254 712 345 678</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <HelpCircle className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-medium">Documentation</h3>
              <p className="text-sm text-gray-600">View user guides</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tenant Components
const TenantDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, John Doe</h1>
          <p className="text-gray-600">Room A101 • Booking ID: BK001</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Pay Rent
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Report Issue
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Room Details</p>
              <p className="text-2xl font-bold text-blue-900">A101</p>
              <p className="text-blue-600 text-sm">Booking: BK001</p>
            </div>
            <Home className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Monthly Rent</p>
              <p className="text-2xl font-bold text-green-900">KSh 25,000</p>
              <p className="text-green-600 text-sm">Due: KSh 5,000</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">KPLC Number</p>
              <p className="text-2xl font-bold text-purple-900">KE001234567</p>
              <p className="text-purple-600 text-sm">Electricity meter</p>
            </div>
            <AlertCircle className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Payment Status</h2>
        <p className="text-gray-600 mb-4">Your current rent payment status</p>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Rent Paid</span>
            <span className="font-medium">KSh 20,000 / KSh 25,000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-green-600 h-3 rounded-full" style={{width: '80%'}}></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">KSh 5,000 remaining</span>
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Due</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <p className="text-gray-600 mb-4">Your registered details</p>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-gray-400" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">+254712345678</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-gray-400" />
              <div>
                <p className="font-medium">Emergency Contact</p>
                <p className="text-gray-600">+254798765432</p>
              </div>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 mr-3 text-gray-400" />
              <div>
                <p className="font-medium">Government ID</p>
                <p className="text-gray-600">12345678</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">My Reports</h3>
          <p className="text-gray-600 mb-4">Your recent maintenance requests</p>
          
          <div className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium">Power Outlet Not Working</p>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">open</span>
              </div>
              <p className="text-sm text-gray-600">electrical</p>
            </div>
          </div>
          
          <button className="w-full mt-4 text-red-600 hover:text-red-700 font-medium">
            Submit New Report
          </button>
        </div>
      </div>
    </div>
  );
};

const TenantPaymentCenter = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-600">Payment Center</h1>
      <p className="text-gray-600">Manage your rent payments</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CreditCard className="w-6 h-6 mr-2 text-green-600" />
            Mpesa Payment
          </h2>
          <p className="text-gray-600 mb-4">Pay your rent using Mpesa mobile money</p>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-green-700 font-medium">Outstanding Balance</span>
              <span className="text-green-900 font-bold text-lg">KSh 5,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-700 font-medium">Monthly Rent</span>
              <span className="text-green-900 font-bold">KSh 25,000</span>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Amount (KSh)</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mpesa Phone Number</label>
              <input
                type="tel"
                defaultValue="+254712345678"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="mpesa-terms" />
              <label htmlFor="mpesa-terms" className="text-sm text-gray-600">
                You will receive an Mpesa prompt on your phone to complete the payment.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Pay with Mpesa
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          <p className="text-gray-600 mb-4">Your recent payment transactions</p>

          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">KSh 20,000</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">completed</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>01/03/2024</span>
                <span>Mpesa</span>
              </div>
              <p className="text-xs text-gray-500">ID: MP240315001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TenantReportIssue = () => {
  const [formData, setFormData] = useState({
    category: '',
    priority: '',
    title: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare WhatsApp message
    const whatsappMessage = `*New Maintenance Request*\n\nTenant: John Doe\nRoom: A101\nCategory: ${formData.category}\nPriority: ${formData.priority}\nTitle: ${formData.title}\nDescription: ${formData.description}`;
    
    // WhatsApp API integration (replace with actual admin number)
    const adminPhoneNumber = '+254712345678';
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Also prepare for backend API
    const payload = {
      tenant_id: 1, // Current tenant ID
      category: formData.category,
      priority: formData.priority,
      title: formData.title,
      description: formData.description
    };
    
    try {
      // Backend API integration ready
      // const response = await fetch('/api/v1/maintenance/reports/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(payload)
      // });
      
      console.log('Report payload ready for backend:', payload);
      alert('Report submitted successfully! Admin has been notified via WhatsApp.');
      
      // Reset form
      setFormData({
        category: '',
        priority: '',
        title: '',
        description: ''
      });
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Report an Issue</h1>
        <p className="text-gray-600">Submit a maintenance request or report a problem</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Issue Details</h2>
        <p className="text-gray-600 mb-6">Please provide detailed information about the issue you're experiencing</p>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-blue-600 font-medium">Tenant:</span>
              <p className="text-blue-900">John Doe</p>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Room:</span>
              <p className="text-blue-900">A101</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Issue Category</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select issue category</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="noise">Noise</option>
              <option value="safety">Safety/Violence</option>
              <option value="wifi">WiFi</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
            <select
              required
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select priority level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Brief description of the issue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Please provide as much detail as possible about the issue, including when it started, what you've tried, and how it affects you."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

const TenantSettings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="john@email.com"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+254712345678"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
            <input
              type="tel"
              defaultValue="+254798765432"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Update Information
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="space-y-4">
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
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Change Password
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="mr-3" />
            <span>Email notifications for rent reminders</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="mr-3" />
            <span>SMS notifications for maintenance updates</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="mr-3" />
            <span>Email notifications for announcements</span>
          </label>
        </div>
      </div>
    </div>
  );
};

// Mobile Navigation for Tenant
const TenantMobileNav = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'report', label: 'Report', icon: AlertTriangle }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center py-2 px-3 ${
                activeView === item.id ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Login Component
const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [userType, setUserType] = useState('admin');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare for Django authentication
    const payload = {
      email: credentials.email,
      password: credentials.password
    };

    try {
      // Backend authentication ready
      // const response = await fetch('/api/v1/auth/login/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      // const data = await response.json();
      // localStorage.setItem('token', data.access_token);
      // localStorage.setItem('refresh_token', data.refresh_token);
      
      console.log('Login payload ready for backend:', payload);
      onLogin(userType);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const demoLogin = (type) => {
    setUserType(type);
    onLogin(type);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-blue-600">TenantHub</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-6">Enter your credentials to access your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-gray-700 mb-3">Demo Credentials:</p>
            <div className="space-y-2">
              <div>
                <button 
                  onClick={() => demoLogin('admin')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  <strong>Admin:</strong> admin@property.com / admin123
                </button>
              </div>
              <div>
                <button 
                  onClick={() => demoLogin('tenant')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  <strong>Tenant:</strong> john@email.com / tenant123
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('admin');
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogin = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
    setActiveView(type === 'admin' ? 'dashboard' : 'dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('admin');
    setActiveView('dashboard');
    // localStorage.removeItem('token');
    // localStorage.removeItem('refresh_token');
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (userType === 'tenant') {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white shadow-sm border-b px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Building className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-blue-600">TenantHub</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, John Doe</span>
            {isMobile ? (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <Menu className="w-6 h-6" />
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-800">
                  <Settings className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
          {activeView === 'dashboard' && <TenantDashboard />}
          {activeView === 'payment' && <TenantPaymentCenter />}
          {activeView === 'report' && <TenantReportIssue />}
          {activeView === 'settings' && <TenantSettings />}
        </div>

        {/* Mobile Settings Sidebar */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <button
                  onClick={() => {
                    setActiveView('settings');
                    setSidebarOpen(false);
                  }}
                  className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded"
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded text-red-600"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        <TenantMobileNav activeView={activeView} setActiveView={setActiveView} />
      </div>
    );
  }

  // Admin Layout
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar 
        activeView={activeView}
        setActiveView={setActiveView}
        isMobile={isMobile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className={`flex-1 ${isMobile ? 'ml-0' : 'ml-64'} overflow-auto`}>
        <div className="bg-white shadow-sm border-b px-4 py-3 flex justify-between items-center">
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          <div className="flex-1" />
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Property Manager</span>
            <button className="text-gray-600 hover:text-gray-800">
              <Bell className="w-6 h-6" />
            </button>
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeView === 'dashboard' && <AdminDashboard onEmailClick={() => setEmailModalOpen(true)} />}
          {activeView === 'analytics' && <AdminAnalytics />}
          {activeView === 'organisation' && <AdminOrganisation />}
          {activeView === 'payments' && <AdminPayments />}
          {activeView === 'tenants' && <AdminTenants onEmailClick={() => setEmailModalOpen(true)} />}
          {activeView === 'reports' && <AdminReports />}
          {activeView === 'settings' && <AdminSettings />}
          {activeView === 'help' && <AdminHelp />}
        </div>
      </div>

      <EmailFormModal 
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        tenants={mockTenants}
      />
    </div>
  );
};

export default App;