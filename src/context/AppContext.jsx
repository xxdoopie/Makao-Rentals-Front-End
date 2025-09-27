import React from 'react'
import { createContext } from 'react';

export const AppContext = createContext();

const ContextProvider = (props) => {

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

  return (
    <AppContext.Provider value ={{mockTenants, mockReports, mockUnits}}>
        {props.children}
    </AppContext.Provider>
  )
}

export default ContextProvider;
