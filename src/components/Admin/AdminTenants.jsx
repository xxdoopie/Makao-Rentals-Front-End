import React, { useState } from 'react'
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
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  FileText,
  UserCheck,
  UserX,
  FileImage,
  Archive,
  RotateCcw,
  Timer
} from 'lucide-react';


const AdminTenants = ({ onEmailClick }) => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [documentPreview, setDocumentPreview] = useState(null);

  // Mock current tenants
  const mockTenants = [
    { id: 1, name: 'John Doe', email: 'john@email.com', room: 'A101', phone: '+254712345678', status: 'active', rentStatus: 'paid', bookingId: 'BK001', rentAmount: 25000, joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@email.com', room: 'B205', phone: '+254723456789', status: 'active', rentStatus: 'due', bookingId: 'BK002', rentAmount: 35000, joinDate: '2024-02-01' },
    { id: 3, name: 'Mike Johnson', email: 'mike@email.com', room: 'C301', phone: '+254734567890', status: 'inactive', rentStatus: 'overdue', bookingId: 'BK003', rentAmount: 20000, joinDate: '2024-01-20' }
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

  // Mock rejected applications with auto-deletion countdown
  const mockRejectedApplications = [
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

  const handleApproveApplication = (applicationId) => {
    console.log('Approving application:', applicationId);
    alert('Application approved! Tenant will be notified and can now access their account.');
  };

  const handleRejectApplication = (applicationId, reason = '') => {
    console.log('Rejecting application:', applicationId, 'Reason:', reason);
    const rejectionReason = reason || prompt('Please provide a reason for rejection:');
    if (rejectionReason) {
      alert(`Application rejected. Tenant will be notified and refund process will be initiated.\nReason: ${rejectionReason}`);
    }
  };

  const handleViewDocuments = (documents, applicantName) => {
    setDocumentPreview({ documents, applicantName });
  };

  const handleDownloadDocument = (document, applicantName) => {
    // In a real app, this would trigger a file download
    console.log('Downloading document:', document.name, 'for', applicantName);
    alert(`Downloading ${document.name} for ${applicantName}`);
  };

const handlePreviewDocument = (document) => {
  // Create a preview modal or open in new window
  if (document.type === 'application/pdf') {
    // For PDFs, open in new tab (in real app, you'd use the actual file URL)
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head><title>${document.name}</title></head>
        <body style="margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f5f5f5;">
          <div style="text-align:center; padding:40px;">
            <h2>PDF Preview: ${document.name}</h2>
            <p>File Size: ${formatFileSize(document.size)}</p>
            <p style="color:#666;">In a real application, the PDF content would be displayed here.</p>
            <button onclick="window.close()" style="margin-top:20px; padding:10px 20px; background:#007bff; color:white; border:none; border-radius:4px; cursor:pointer;">Close</button>
          </div>
        </body>
      </html>
    `);
  } else if (document.type?.startsWith('image/')) {
    // For images, show preview
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head><title>${document.name}</title></head>
        <body style="margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#000;">
          <div style="text-align:center;">
            <h3 style="color:white; margin-bottom:20px;">${document.name}</h3>
            <div style="color:#ccc; margin-bottom:20px;">Image Preview - File Size: ${formatFileSize(document.size)}</div>
            <div style="color:#999;">In a real application, the image would be displayed here.</div>
            <button onclick="window.close()" style="margin-top:20px; padding:10px 20px; background:#007bff; color:white; border:none; border-radius:4px; cursor:pointer;">Close</button>
          </div>
        </body>
      </html>
    `);
  }
};

  const handleRestoreApplication = (applicationId) => {
    console.log('Restoring application:', applicationId);
    alert('Application restored to pending review.');
  };

  const handlePermanentDelete = (applicationId) => {
    if (confirm('Are you sure you want to permanently delete this application? This action cannot be undone.')) {
      console.log('Permanently deleting application:', applicationId);
      alert('Application permanently deleted.');
    }
  };

  const copySignupLink = async () => {
    const signupUrl = `${window.location.origin}/tenant/signup`;
    try {
      await navigator.clipboard.writeText(signupUrl);
      alert('Signup link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

const getFileIcon = (fileType) => {
  if (fileType === 'application/pdf') {
    return <FileText className="w-5 h-5 text-red-500" />; // red FileText as PDF icon
  }
  if (fileType?.startsWith('image/')) {
    return <FileImage className="w-5 h-5 text-blue-500" />;
  }
  return <FileText className="w-5 h-5 text-gray-500" />;
};


  // Document Preview Modal
  const DocumentPreviewModal = () => {
    if (!documentPreview) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-lg font-semibold">
              Documents for {documentPreview.applicantName}
            </h3>
            <button
              onClick={() => setDocumentPreview(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentPreview.documents.map((doc, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getFileIcon(doc.type)}
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(doc.size)} • {doc.uploadedAt ? formatDate(doc.uploadedAt) : 'Recently uploaded'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePreviewDocument(doc)}
                      className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </button>
                    <button
                      onClick={() => handleDownloadDocument(doc, documentPreview.applicantName)}
                      className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-green-50 text-green-600 rounded hover:bg-green-100"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
            <button
              onClick={() => setDocumentPreview(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => {
                // Download all documents as ZIP
                alert('Downloading all documents as ZIP file...');
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Download className="w-4 h-4 mr-1" />
              Download All
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-600">Manage current tenants and pending applications</p>
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
            onClick={copySignupLink}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Share Signup Link
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Active Tenants</p>
              <p className="text-2xl font-bold text-blue-900">{mockTenants.filter(t => t.status === 'active').length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Pending Applications</p>
              <p className="text-2xl font-bold text-yellow-900">{mockPendingApplications.filter(a => a.status === 'pending').length}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Under Review</p>
              <p className="text-2xl font-bold text-green-900">{mockPendingApplications.filter(a => a.status === 'under_review').length}</p>
            </div>
            <FileText className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Rejected Apps</p>
              <p className="text-2xl font-bold text-purple-900">{mockRejectedApplications.length}</p>
            </div>
            <Archive className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Overdue Rent</p>
              <p className="text-2xl font-bold text-red-900">{mockTenants.filter(t => t.rentStatus === 'overdue').length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tenants or applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'active'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Active Tenants ({mockTenants.filter(t => t.status === 'active').length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Applications ({mockPendingApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rejected'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Rejected Applications ({mockRejectedApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-gray-500 text-gray-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All Tenants ({mockTenants.length})
          </button>
        </nav>
      </div>

      {/* Active Tenants Tab */}
      {activeTab === 'active' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="mr-2 text-blue-600" />
              Active Tenants
            </h3>
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
                  {mockTenants.filter(t => t.status === 'active').map(tenant => (
                    <tr key={tenant.id} className="border-b hover:bg-gray-50">
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
                          <p className="text-sm text-gray-600">Since {new Date(tenant.joinDate).toLocaleDateString()}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="flex items-center text-sm">
                            <Phone className="w-4 h-4 mr-1" /> {tenant.phone}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">KSh {tenant.rentAmount.toLocaleString()}</p>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            tenant.rentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                            tenant.rentStatus === 'due' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {tenant.rentStatus === 'paid' ? 'Paid' : 
                             tenant.rentStatus === 'due' ? 'Due' : 'Overdue'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <select 
                          defaultValue={tenant.status}
                          className="px-2 py-1 border rounded text-sm"
                          onChange={(e) => {
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
                          <button className="text-blue-600 hover:text-blue-800" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800" title="Send Email">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800" title="Remove">
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
      )}

      {/* Pending Applications Tab */}
      {activeTab === 'pending' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="mr-2 text-yellow-600" />
              Pending Applications
              {mockPendingApplications.length > 0 && (
                <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  {mockPendingApplications.length} new
                </span>
              )}
            </h3>
            
            {mockPendingApplications.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Applications</h3>
                <p className="text-gray-500 mb-4">New tenant applications will appear here</p>
                <button
                  onClick={copySignupLink}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center mx-auto"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Share Signup Link
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {mockPendingApplications.map(application => (
                  <div key={application.id} className="border rounded-lg p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{application.name}</h4>
                        <p className="text-sm text-gray-600">Application ID: {application.id}</p>
                        <p className="text-sm text-gray-500">Submitted: {formatDate(application.submittedAt)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                          application.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : application.status === 'under_review'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {application.status === 'pending' ? 'New Application' : 
                           application.status === 'under_review' ? 'Under Review' : 'Processed'}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Payment Completed
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Contact Information</h5>
                        <div className="space-y-1 text-sm">
                          <p className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            {application.email}
                          </p>
                          <p className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            {application.phone}
                          </p>
                          <p className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-gray-400" />
                            ID: {application.governmentId}
                          </p>
                          <p className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            Emergency: {application.emergencyContact}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Room & Documents</h5>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium">{application.roomTypeLabel}</p>
                          <p className="text-gray-600">Type: {application.roomType}</p>
                          <p className="flex items-center text-blue-600">
                            <FileText className="w-4 h-4 mr-1" />
                            {application.documents.length} document{application.documents.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Payment Details</h5>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium text-green-600">
                            KSh {application.paymentAmount.toLocaleString()}
                          </p>
                          <p className="text-gray-600">Transaction: {application.transactionId}</p>
                          <p className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Verified
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleViewDocuments(application.documents, application.name)}
                          className="flex items-center text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Documents ({application.documents.length})
                        </button>
                        <button
                          onClick={() => {
                            // Download all documents as ZIP
                            alert(`Downloading all documents for ${application.name}...`);
                          }}
                          className="flex items-center text-green-600 hover:text-green-800 px-3 py-1 border border-green-200 rounded hover:bg-green-50"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download All
                        </button>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleApproveApplication(application.id)}
                          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          <UserCheck className="w-4 h-4 mr-2" />
                          Approve Application
                        </button>
                        <button
                          onClick={() => handleRejectApplication(application.id)}
                          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                          <UserX className="w-4 h-4 mr-2" />
                          Reject Application
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rejected Applications Tab */}
      {activeTab === 'rejected' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Archive className="mr-2 text-purple-600" />
                Rejected Applications
                <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  Auto-delete in progress
                </span>
              </h3>
              <div className="text-sm text-gray-500">
                Applications are automatically deleted after 7 days
              </div>
            </div>
            
            {mockRejectedApplications.length === 0 ? (
              <div className="text-center py-12">
                <Archive className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Rejected Applications</h3>
                <p className="text-gray-500">Rejected applications will appear here temporarily before auto-deletion</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mockRejectedApplications.map(application => (
                  <div key={application.id} className="border border-red-200 rounded-lg p-6 bg-red-50">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{application.name}</h4>
                        <p className="text-sm text-gray-600">Application ID: {application.id}</p>
                        <p className="text-sm text-gray-500">Rejected: {formatDate(application.rejectedAt)}</p>
                        <p className="text-sm font-medium text-red-600 mt-1">
                          Reason: {application.rejectionReason}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium flex items-center">
                          <Timer className="w-3 h-3 mr-1" />
                          Deletes in {application.daysUntilDeletion} days
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          application.refundStatus === 'processed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          Refund: {application.refundStatus === 'processed' ? 'Completed' : 'Processing'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Contact Information</h5>
                        <div className="space-y-1 text-sm">
                          <p className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            {application.email}
                          </p>
                          <p className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            {application.phone}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Room & Documents</h5>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium">{application.roomTypeLabel}</p>
                          <p className="text-gray-600">Type: {application.roomType}</p>
                          <p className="flex items-center text-blue-600">
                            <FileText className="w-4 h-4 mr-1" />
                            {application.documents.length} document{application.documents.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Payment Details</h5>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium">
                            KSh {application.paymentAmount.toLocaleString()}
                          </p>
                          <p className={`flex items-center ${
                            application.refundStatus === 'processed' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            <DollarSign className="w-4 h-4 mr-1" />
                            {application.refundStatus === 'processed' ? 'Refunded' : 'Refund in progress'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-red-200">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleViewDocuments(application.documents, application.name)}
                          className="flex items-center text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Documents
                        </button>
                        <button
                          onClick={() => {
                            alert(`Downloading documents for ${application.name}...`);
                          }}
                          className="flex items-center text-green-600 hover:text-green-800 px-3 py-1 border border-green-200 rounded hover:bg-green-50"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleRestoreApplication(application.id)}
                          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Restore to Review
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(application.id)}
                          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Now
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                        <p className="text-sm text-yellow-800">
                          <strong>Auto-deletion notice:</strong> This application will be permanently deleted in {application.daysUntilDeletion} days. 
                          All associated documents and data will be removed from the system.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* All Tenants Tab */}
      {activeTab === 'all' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="mr-2 text-gray-600" />
              All Tenants
            </h3>
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
                    <tr key={tenant.id} className="border-b hover:bg-gray-50">
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
                          <p className="text-sm text-gray-600">Since {new Date(tenant.joinDate).toLocaleDateString()}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="flex items-center text-sm">
                            <Phone className="w-4 h-4 mr-1" /> {tenant.phone}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">KSh {tenant.rentAmount.toLocaleString()}</p>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            tenant.rentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                            tenant.rentStatus === 'due' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {tenant.rentStatus === 'paid' ? 'Paid' : 
                             tenant.rentStatus === 'due' ? 'Due' : 'Overdue'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          tenant.status === 'active' ? 'bg-green-100 text-green-800' :
                          tenant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {tenant.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800" title="Send Email">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800" title="Remove">
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
      )}

      {/* Document Preview Modal */}
      <DocumentPreviewModal />
    </div>
  );
}
export default AdminTenants;