import React, {useContext, useState} from 'react'
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
  Tablet,
  Bed,
  Key
} from 'lucide-react';
import {AppContext} from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { NavLink } from "react-router-dom";

const AdminOrganisation = () => {
  const {mockReports, mockTenants} = useContext(AppContext);
  const { showToast } = useToast();
  
  // Add this state for managing room availability
  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomNumber: "A101",
      type: "Studio",
      rent: 25000,
      size: "30 sqm",
      status: "available",
      isAvailable: true
    },
    {
      id: 2,
      roomNumber: "A205",
      type: "1 Bedroom",
      rent: 35000,
      size: "45 sqm",
      status: "available",
      isAvailable: true
    },
    {
      id: 3,
      roomNumber: "A312",
      type: "2 Bedroom",
      rent: 50000,
      size: "65 sqm",
      status: "occupied",
      isAvailable: false
    },
    {
      id: 4,
      roomNumber: "B104",
      type: "Studio",
      rent: 28000,
      size: "32 sqm",
      status: "maintenance",
      isAvailable: false
    },
    {
      id: 5,
      roomNumber: "B201",
      type: "1 Bedroom",
      rent: 38000,
      size: "48 sqm",
      status: "available",
      isAvailable: true
    }
  ]);

  // Add this toggle function
  const toggleRoomAvailability = (roomId) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        const newAvailability = !room.isAvailable;
        const newStatus = newAvailability ? 'available' : 'occupied';
        
        showToast(
          `Room ${room.roomNumber} marked as ${newStatus}`,
          'success',
          3000
        );
        
        return {
          ...room,
          isAvailable: newAvailability,
          status: newStatus
        };
      }
      return room;
    }));
  };
  // Mock data for rental images
  const rentalImages = [
    {
      id: 1,
      name: "Makao Heights Block A",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      rooms: 24,
      occupied: 18
    },
    {
      id: 2,
      name: "Building Exterior View",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop",
      rooms: 12,
      occupied: 10
    },
    {
      id: 3,
      name: "Common Area",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      description: "Shared recreational space"
    }
  ];

  // Mock data for available rooms
  const availableRooms = [
    {
      id: 1,
      roomNumber: "A101",
      type: "Studio",
      rent: 25000,
      size: "30 sqm",
      status: "available"
    },
    {
      id: 2,
      roomNumber: "A205",
      type: "1 Bedroom",
      rent: 35000,
      size: "45 sqm",
      status: "available"
    },
    {
      id: 3,
      roomNumber: "A312",
      type: "2 Bedroom",
      rent: 50000,
      size: "65 sqm",
      status: "available"
    },
    {
      id: 4,
      roomNumber: "B104",
      type: "Studio",
      rent: 28000,
      size: "32 sqm",
      status: "pending"
    },
    {
      id: 5,
      roomNumber: "B201",
      type: "1 Bedroom",
      rent: 38000,
      size: "48 sqm",
      status: "available"
    }
  ];
  
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
              <p className="text-3xl font-bold text-gray-900">28</p>
              <p className="text-gray-600 text-sm">+4 from last month</p>
            </div>
            <Users className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Rooms</p>
              <p className="text-3xl font-bold text-gray-900">36</p>
              <p className="text-gray-600 text-sm">Across all blocks</p>
            </div>
            <Bed className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Available Rooms</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
              <p className="text-gray-600 text-sm">Ready for new tenants</p>
            </div>
            <Key className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900">KSh 980K</p>
              <p className="text-gray-600 text-sm">+8% from last month</p>
            </div>
            <DollarSign className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Rental Images Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Property Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentalImages.map(rental => (
            <div key={rental.id} className="bg-gray-50 rounded-lg overflow-hidden">
              <img 
                src={rental.image} 
                alt={rental.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">{rental.name}</h3>
                {rental.rooms && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Rooms: {rental.rooms}</span>
                    <span>Occupied: {rental.occupied}</span>
                  </div>
                )}
                {rental.description && (
                  <p className="text-sm text-gray-600">{rental.description}</p>
                )}
              </div>
            </div>
          ))}
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
              <div className="flex justify-between">
                <span className="text-gray-600">Occupancy Rate:</span>
                <span>78% (28/36 rooms)</span>
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

    {/* Available Rooms Section */}
<div className="bg-white p-6 rounded-lg shadow">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold">Room Management</h2>
    <div className="text-sm text-gray-500">
      Available: {rooms.filter(room => room.isAvailable).length} | 
      Total: {rooms.length}
    </div>
  </div>
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3 px-4">Room</th>
          <th className="text-left py-3 px-4">Type</th>
          <th className="text-left py-3 px-4">Size</th>
          <th className="text-left py-3 px-4">Rent (KSh)</th>
          <th className="text-left py-3 px-4">Status</th>
          <th className="text-left py-3 px-4">Availability</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map(room => (
          <tr key={room.id} className="border-b hover:bg-gray-50">
            <td className="py-3 px-4 font-medium">{room.roomNumber}</td>
            <td className="py-3 px-4">{room.type}</td>
            <td className="py-3 px-4">{room.size}</td>
            <td className="py-3 px-4">{room.rent.toLocaleString()}</td>
            <td className="py-3 px-4">
              <span className={`px-2 py-1 text-xs rounded-full ${
                room.status === 'available' 
                  ? 'bg-green-100 text-green-800' 
                  : room.status === 'occupied'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {room.status}
              </span>
            </td>
            <td className="py-3 px-4">
              {/* Toggle Switch */}
              <button
                onClick={() => toggleRoomAvailability(room.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  room.isAvailable ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    room.isAvailable ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
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
           <NavLink
                to={"/admin/reports"}
                // close drawer on mobile when clicking a link  
                onClick={() => {  
                  if (typeof onClose === "function") onClose();
              }}
                >
              <button className="w-full flex mt-5 items-center px-6 py-3 cursor-pointer text-left text-white rounded hover:bg-gray-800 relative bg-gray-800" >View Recent Reports</button>
            </NavLink>
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
              <NavLink
                to={"/admin/tenants"}
                // close drawer on mobile when clicking a link  
                onClick={() => {  
                  if (typeof onClose === "function") onClose();
              }}
                >
              <button className="w-full flex mt-5 items-center px-6 py-3 cursor-pointer text-left text-white rounded hover:bg-gray-800 relative bg-gray-800" >View Recent Tenants</button>
            </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminOrganisation;