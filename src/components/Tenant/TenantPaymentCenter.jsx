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

export default TenantPaymentCenter
