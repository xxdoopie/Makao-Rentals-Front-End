import React from 'react'
import {useState} from 'react'
import { 
  X, 
  Send,
} from 'lucide-react';
const EmailFormModal = ({ isOpen, onClose, tenants }) => {
  const [emailData, setEmailData] = useState({
    recipients: 'all',
    selectedTenants: [],
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      recipients: emailData.recipients,
      selectedTenants: emailData.recipients === 'specific' ? emailData.selectedTenants : null,
      subject: emailData.subject,
      message: emailData.message
    };

    try {
      // Prepare for Django API integration
      // const response = await fetch('/api/v1/communications/send-email/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(payload)
      // });
      
      console.log('Email payload ready for backend:', payload);
      alert('Email sent successfully!');
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };

  const handleTenantSelection = (tenantId) => {
    setEmailData(prev => ({
      ...prev,
      selectedTenants: prev.selectedTenants.includes(tenantId)
        ? prev.selectedTenants.filter(id => id !== tenantId)
        : [...prev.selectedTenants, tenantId]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Send Email to Tenants</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="recipients"
                  value="all"
                  checked={emailData.recipients === 'all'}
                  onChange={(e) => setEmailData(prev => ({ ...prev, recipients: e.target.value }))}
                  className="mr-2"
                />
                All Tenants
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="recipients"
                  value="specific"
                  checked={emailData.recipients === 'specific'}
                  onChange={(e) => setEmailData(prev => ({ ...prev, recipients: e.target.value }))}
                  className="mr-2"
                />
                Specific Tenants
              </label>
            </div>
          </div>

          {emailData.recipients === 'specific' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Tenants</label>
              <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
                {tenants.map(tenant => (
                  <label key={tenant.id} className="flex items-center py-2">
                    <input
                      type="checkbox"
                      checked={emailData.selectedTenants.includes(tenant.id)}
                      onChange={() => handleTenantSelection(tenant.id)}
                      className="mr-2"
                    />
                    <span>{tenant.name} ({tenant.room})</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              required
              value={emailData.subject}
              onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Email subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              required
              rows={6}
              value={emailData.message}
              onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center"
            >
              <Send className="w-5 h-5 mr-2" />
              Send Email
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailFormModal;
