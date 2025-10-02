import React, { useContext, useState } from 'react';
import { 
  Users, 
  Bed, 
  Key,
  DollarSign,
  AlertTriangle,
  X
} from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { NavLink } from "react-router-dom";

// Confirmation Dialog Component
const ConfirmationDialog = ({ isOpen, onClose, onConfirm, room }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
            <h3 className="text-lg font-semibold">Confirm Availability Change</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Are you sure you want to change the availability status for:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium text-gray-600">Room:</div>
              <div className="font-semibold">{room?.unitNumber}</div>
              
              <div className="font-medium text-gray-600">Type:</div>
              <div>{room?.type}</div>
              
              <div className="font-medium text-gray-600">Current Status:</div>
              <div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  room?.status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : room?.status === 'occupied'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {room?.status}
                </span>
              </div>
              
              <div className="font-medium text-gray-600">New Status:</div>
              <div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  room?.isAvailable 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {room?.isAvailable ? 'occupied' : 'available'}
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {room?.isAvailable 
              ? "This will mark the room as occupied and remove it from the available listings."
              : "This will mark the room as available for new tenant signups."}
          </p>
        </div>

        <div className="flex gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Confirm Change
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminOrganisation = () => {
  const { mockReports, mockTenants, mockUnits } = useContext(AppContext);
  const { showToast } = useToast();
  
  // State for managing rooms from context
  const [rooms, setRooms] = useState(mockUnits);
  
  // State for confirmation dialog
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    room: null
  });

  // Open confirmation dialog
  const openConfirmDialog = (room) => {
    setConfirmDialog({
      isOpen: true,
      room: room
    });
  };

  // Close confirmation dialog
  const closeConfirmDialog = () => {
    setConfirmDialog({
      isOpen: false,
      room: null
    });
  };

  // Toggle room availability with confirmation
  const handleConfirmToggle = () => {
    const roomToUpdate = confirmDialog.room;
    
    setRooms(rooms.map(room => {
      if (room.id === roomToUpdate.id) {
        const newAvailability = !room.isAvailable;
        const newStatus = newAvailability ? 'available' : 'occupied';
        
        showToast(
          `Room ${room.unitNumber} marked as ${newStatus}`,
          'success',
          3000
        );
        
        // TODO: When backend is ready, call API to update room status
        // await fetch(`/api/v1/units/${room.id}/`, {
        //   method: 'PATCH',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        //   },
        //   body: JSON.stringify({
        //     isAvailable: newAvailability,
        //     status: newStatus
        //   })
        // });
        
        return {
          ...room,
          isAvailable: newAvailability,
          status: newStatus
        };
      }
      return room;
    }));
    
    closeConfirmDialog();
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

  // Calculate statistics from rooms data
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(room => room.isAvailable).length;
  const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
  const totalRevenue = rooms
    .filter(room => room.status === 'occupied')
    .reduce((sum, room) => sum + room.rent, 0);

  return (
    <div className="space-y-6">
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={handleConfirmToggle}
        room={confirmDialog.room}
      />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">About Makao Center</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Tenants</p>
              <p className="text-3xl font-bold text-gray-900">{occupiedRooms}</p>
              <p className="text-gray-600 text-sm">Active tenants</p>
            </div>
            <Users className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Rooms</p>
              <p className="text-3xl font-bold text-gray-900">{totalRooms}</p>
              <p className="text-gray-600 text-sm">Across all blocks</p>
            </div>
            <Bed className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Available Rooms</p>
              <p className="text-3xl font-bold text-gray-900">{availableRooms}</p>
              <p className="text-gray-600 text-sm">Ready for new tenants</p>
            </div>
            <Key className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900">
                KSh {(totalRevenue / 1000).toFixed(0)}K
              </p>
              <p className="text-gray-600 text-sm">From occupied rooms</p>
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
                <span>{((occupiedRooms / totalRooms) * 100).toFixed(0)}% ({occupiedRooms}/{totalRooms} rooms)</span>
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

      {/* Room Management Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Room Management</h2>
          <div className="text-sm text-gray-500">
            Available: {availableRooms} | Total: {totalRooms}
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
                <th className="text-left py-3 px-4">Tenant</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Availability</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{room.unitNumber}</td>
                  <td className="py-3 px-4">{room.type}</td>
                  <td className="py-3 px-4">{room.size}</td>
                  <td className="py-3 px-4">{room.rent.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {room.tenant || '-'}
                  </td>
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
                    <button
                      onClick={() => openConfirmDialog(room)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        room.isAvailable ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                      title="Click to change availability"
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
          <NavLink to="/admin/reports">
            <button className="w-full flex mt-5 items-center justify-center px-6 py-3 text-white rounded hover:bg-gray-800 bg-gray-800 cursor-pointer">
              View Recent Reports
            </button>
          </NavLink>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Tenants</h3>
          <div className="space-y-3">
            {mockTenants.slice(0, 3).map(tenant => (
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
          <NavLink to="/admin/tenants">
            <button className="w-full flex mt-5 items-center justify-center px-6 py-3 text-white rounded hover:bg-gray-800 bg-gray-800 cursor-pointer">
              View All Tenants
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminOrganisation;