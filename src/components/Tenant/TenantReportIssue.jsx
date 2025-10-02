import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTenantToast } from '../../context/TenantToastContext';
import { Send, AlertTriangle } from 'lucide-react';

const TenantReportIssue = () => {
  const navigate = useNavigate();
  const { showToast } = useTenantToast();
  const [formData, setFormData] = useState({
    category: '',
    priority: '',
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare WhatsApp message
    const whatsappMessage = `*New Maintenance Request*\n\nTenant: John Doe\nRoom: A101\nCategory: ${formData.category}\nPriority: ${formData.priority}\nTitle: ${formData.title}\nDescription: ${formData.description}`;
    
    // WhatsApp API integration (replace with actual admin number)
    const adminPhoneNumber = '+254712345678';
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Prepare for backend API
    const payload = {
      tenant_id: 1,
      category: formData.category,
      priority: formData.priority,
      title: formData.title,
      description: formData.description
    };
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Report payload ready for backend:', payload);
      
      // Show success toast
      showToast('Report submitted successfully! Admin has been notified.', 'success');
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      setFormData({
        category: '',
        priority: '',
        title: '',
        description: ''
      });
      
      // Navigate back to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/tenant');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      showToast('Error submitting report. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-red-600 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 mr-2" />
          Report an Issue
        </h1>
        <p className="text-gray-600 mt-2">Submit a maintenance request or report a problem</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Issue Category *</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level *</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title *</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description *</label>
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Please provide as much detail as possible about the issue, including when it started, what you've tried, and how it affects you."
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/tenant')}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 flex items-center justify-center disabled:opacity-50"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Report
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantReportIssue;