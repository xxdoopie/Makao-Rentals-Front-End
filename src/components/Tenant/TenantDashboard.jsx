import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  AlertTriangle, 
  DollarSign,
  AlertCircle,
  User,
  Phone,
  CheckCircle
} from 'lucide-react';

const TenantDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, John Doe</h1>
          <p className="text-gray-600">Room A101 • Booking ID: BK001</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/tenant/payments')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Pay Rent
          </button>
          <button 
            onClick={() => navigate('/tenant/report')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
          >
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

        <div className="bg-green-50 p-6 rounded-lg cursor-pointer hover:bg-green-100" onClick={() => navigate('/tenant/payments')}>
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
          
          <button 
            onClick={() => navigate('/tenant/report')}
            className="w-full mt-4 text-red-600 hover:text-red-700 font-medium border border-red-200 py-2 rounded-lg hover:bg-red-50"
          >
            Submit New Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;