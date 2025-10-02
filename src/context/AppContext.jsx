import React from 'react'
import { createContext } from 'react';

export const AppContext = createContext();

const ContextProvider = (props) => {

const mockTenants = [
  { id: 1, name: 'John Doe', email: 'john@email.com', room: 'A101', phone: '+254712345678', status: 'active', rentStatus: 'paid', rentAmount: 4000, bookingId: 'BK001' },
  { id: 2, name: 'Jane Smith', email: 'jane@email.com', room: 'B205', phone: '+254723456789', status: 'active', rentStatus: 'due', rentAmount: 6000, bookingId: 'BK002' },
  { id: 3, name: 'Mike Johnson', email: 'mike@email.com', room: 'C301', phone: '+254734567890', status: 'pending', rentStatus: 'overdue', rentAmount: 8000, bookingId: 'BK003' },
  { id: 4, name: 'Dickens Okoth', email: 'jane@email.com', room: 'B205', phone: '+254723456789', status: 'active', rentStatus: 'due', rentAmount: 6000, bookingId: 'BK004' },
  { id: 5, name: 'Jerry Williams', email: 'mike@email.com', room: 'C301', phone: '+254734567890', status: 'pending', rentStatus: 'overdue', rentAmount: 8000, bookingId: 'BK005' }

];

const mockReports = [
  { id: 1, title: 'Power Outlet Not Working', tenant: 'John Doe', room: 'A101', category: 'Electrical', priority: 'high', status: 'open', date: '15/03/2024', description: 'Main power outlet not working' },
  { id: 2, title: 'Leaky Faucet', tenant: 'Jane Smith', room: 'B205', category: 'Plumbing', priority: 'medium', status: 'in-progress', date: '10/03/2024', description: 'Kitchen faucet leaking' },
  { id: 3, title: 'Leaky Faucet', tenant: 'Jane Smith', room: 'B205', category: 'Plumbing', priority: 'medium', status: 'in-progress', date: '10/03/2024', description: 'Kitchen faucet leaking' }

];

const mockUnits = [
  {
    id: 1,
    unitNumber: "A101",
    type: "Studio",
    rent: 25000,
    size: "30 sqm",
    status: "available",
    isAvailable: true,
    tenant: "John Doe"
  },
  {
    id: 2,
    unitNumber: "A205",
    type: "1 Bedroom",
    rent: 35000,
    size: "45 sqm",
    status: "available",
    isAvailable: true,
    tenant: "Jane Smith"
  },
  {
    id: 3,
    unitNumber: "A312",
    type: "2 Bedroom",
    rent: 50000,
    size: "65 sqm",
    status: "occupied",
    isAvailable: false,
    tenant: "Mike Johnson"
  },
  {
    id: 4,
    unitNumber: "B104",
    type: "Studio",
    rent: 28000,
    size: "32 sqm",
    status: "maintenance",
    isAvailable: false,
    tenant: null
  },
  {
    id: 5,
    unitNumber: "B201",
    type: "1 Bedroom",
    rent: 38000,
    size: "48 sqm",
    status: "available",
    isAvailable: true,
    tenant: null
  }
];
  // Mock pending applications (from signup form)
  const mockPendingApplications = [
    { 
      id: 'APP001', 
      name: 'Sarah Wilson', 
      email: 'sarah@email.com', 
      phone: '+254701234567',
      governmentId: '12345678',
      emergencyContact: '+254798765432',
      roomType: '1br',
      roomTypeLabel: '1 Bedroom',
      paymentAmount: 50000,
      paymentStatus: 'completed',
      transactionId: 'MPX1234567890',
      documents: [
        { name: 'national_id.pdf', type: 'application/pdf', size: 1024000, uploadedAt: '2024-03-20T10:30:00Z' },
        { name: 'passport_photo.jpg', type: 'image/jpeg', size: 512000, uploadedAt: '2024-03-20T10:31:00Z' },
        { name: 'employment_letter.pdf', type: 'application/pdf', size: 768000, uploadedAt: '2024-03-20T10:32:00Z' }
      ],
      submittedAt: '2024-03-20T10:30:00Z',
      status: 'pending'
    },
    { 
      id: 'APP002', 
      name: 'David Brown', 
      email: 'david@email.com', 
      phone: '+254787654321',
      governmentId: '87654321',
      emergencyContact: '+254712345678',
      roomType: 'studio',
      roomTypeLabel: 'Studio',
      paymentAmount: 60000,
      paymentStatus: 'completed',
      transactionId: 'MPX0987654321',
      documents: [
        { name: 'id_document.pdf', type: 'application/pdf', size: 945000, uploadedAt: '2024-03-21T14:15:00Z' },
        { name: 'bank_statement.pdf', type: 'application/pdf', size: 1200000, uploadedAt: '2024-03-21T14:16:00Z' }
      ],
      submittedAt: '2024-03-21T14:15:00Z',
      status: 'under_review'
    }
  ];

  // Mock tenants who have been recently evicted with auto-deletion countdown
  const mockEvictedTenants = [
    {
      id: 'APP004',
      name: 'Robert Taylor',
      email: 'robert@email.com',
      phone: '+254723456789',
      roomType: 'studio',
      roomTypeLabel: 'Studio',
      rejectedAt: '2024-03-18T16:30:00Z',
      rejectionReason: 'Incomplete documentation - Missing employment verification',
      daysUntilDeletion: 5,
      paymentAmount: 60000,
      refundStatus: 'processed',
      documents: [
        { name: 'incomplete_docs.pdf', type: 'application/pdf', size: 512000 }
      ]
    },
    {
      id: 'APP005',
      name: 'Emma Wilson',
      email: 'emma@email.com',
      phone: '+254756789012',
      roomType: '1br',
      roomTypeLabel: '1 Bedroom',
      rejectedAt: '2024-03-17T09:45:00Z',
      rejectionReason: 'Failed background verification',
      daysUntilDeletion: 4,
      paymentAmount: 75000,
      refundStatus: 'pending',
      documents: [
        { name: 'emma_documents.pdf', type: 'application/pdf', size: 890000 }
      ]
    }
  ];

  return (
    <AppContext.Provider value ={{mockTenants, mockReports, mockUnits, mockPendingApplications, mockEvictedTenants}}>
        {props.children}
    </AppContext.Provider>
  )
}

export default ContextProvider;
