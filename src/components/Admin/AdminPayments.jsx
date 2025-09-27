import React from 'react'
import { useState } from 'react';
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

const AdminPayments = () => {
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

export default AdminPayments
