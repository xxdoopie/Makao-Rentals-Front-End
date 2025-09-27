import React from 'react'
import {useState} from 'react'
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

export default TenantReportIssue
