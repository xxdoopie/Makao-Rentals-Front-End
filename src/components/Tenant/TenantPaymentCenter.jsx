import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTenantToast } from "../../context/TenantToastContext";
import { useAuth } from "../../context/AuthContext";
import { 
  FaMobileAlt, 
  FaCreditCard, 
  FaCheckCircle, 
  FaClock, 
  FaTimes,
  FaInfoCircle,
  FaSpinner,
  FaReceipt,
  FaExclamationTriangle
} from "react-icons/fa";

// Mock data - replace with actual API calls
const mockTenants = [
  { id: '1', name: 'John Doe', email: 'john@email.com', room: 'A101', phone: '+254712345678', status: 'active', rentStatus: 'due', rentAmount: 25000, rentDue: 25000, bookingId: 'BK001' },
  { id: '2', name: 'Jane Smith', email: 'jane@email.com', room: 'B205', phone: '+254723456789', status: 'active', rentStatus: 'paid', rentAmount: 35000, rentDue: 0, bookingId: 'BK002' },
  { id: '3', name: 'Mike Johnson', email: 'mike@email.com', room: 'C301', phone: '+254734567890', status: 'active', rentStatus: 'overdue', rentAmount: 20000, rentDue: 40000, bookingId: 'BK003' }
];

const mockPayments = [
  { id: '1', tenantId: '1', amount: 25000, status: 'completed', transactionId: 'MPX123456789', phoneNumber: '+254712345678', createdAt: '2024-03-15', method: 'mpesa' },
  { id: '2', tenantId: '1', amount: 25000, status: 'pending', transactionId: 'MPX987654321', phoneNumber: '+254712345678', createdAt: '2024-03-10', method: 'mpesa' },
  { id: '3', tenantId: '2', amount: 35000, status: 'completed', transactionId: 'MPX456789123', phoneNumber: '+254723456789', createdAt: '2024-03-12', method: 'mpesa' },
];

const TenantPaymentCenter = () => {
  const navigate = useNavigate();
  const { showToast } = useTenantToast();
  const { user } = useAuth(); // only one declaration
  
  const [formData, setFormData] = useState({
    amount: "",
    phoneNumber: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [tenantPayments, setTenantPayments] = useState([]);
  const [errors, setErrors] = useState({});

  // Load tenant data on component mount
  useEffect(() => {
    if (user?.id) {
      const tenant = mockTenants.find(t => t.id === user.id);
      const payments = mockPayments.filter(p => p.tenantId === user.id);
      
      setCurrentTenant(tenant);
      setTenantPayments(payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      
      // Pre-fill phone number if available
      if (tenant?.phone) {
        setFormData(prev => ({ ...prev, phoneNumber: tenant.phone }));
      }
    }
  }, [user]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    } else if (parseFloat(formData.amount) > (currentTenant?.rentDue || 0)) {
      newErrors.amount = "Amount cannot exceed outstanding balance";
    }
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+254[0-9]{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid Kenyan phone number (+254XXXXXXXXX)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters except +
    let cleaned = value.replace(/[^\d+]/g, '');
    
    // Ensure it starts with +254
    if (cleaned.startsWith('0')) {
      cleaned = '+254' + cleaned.substring(1);
    } else if (cleaned.startsWith('254')) {
      cleaned = '+' + cleaned;
    } else if (!cleaned.startsWith('+254') && cleaned.length > 0) {
      if (cleaned.startsWith('+')) {
        // If starts with + but not +254, keep as is for now
      } else {
        cleaned = '+254' + cleaned;
      }
    }
    
    return cleaned;
  };

  // Simulate M-Pesa STK Push API call
  const initiateMpesaPayment = async (amount, phoneNumber) => {
    // This would be your actual M-Pesa API integration
    const mpesaPayload = {
      BusinessShortCode: "174379", // Your business short code
      Password: "YOUR_PASSWORD", // Base64 encoded password
      Timestamp: new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14),
      TransactionType: "CustomerPayBillOnline",
      Amount: parseInt(amount),
      PartyA: phoneNumber,
      PartyB: "174379", // Your business short code
      PhoneNumber: phoneNumber,
      CallBackURL: "https://your-domain.com/api/mpesa/callback",
      AccountReference: `RENT-${currentTenant?.room}-${Date.now()}`,
      TransactionDesc: `Rent payment for room ${currentTenant?.room}`
    };

    // Simulate API call with random success/failure
    return new Promise((resolve) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.3; // 70% success rate for demo
        resolve({
          success: isSuccess,
          message: isSuccess 
            ? "Payment request sent successfully. Check your phone for M-Pesa prompt." 
            : "Payment request failed. Please try again.",
          transactionId: isSuccess ? `MPX${Date.now()}` : null,
          checkoutRequestId: isSuccess ? `ws_CO_${Date.now()}` : null
        });
      }, 2000);
    });
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fix the form errors before submitting.', 'error');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus(null);
    setErrors({});

    try {
      const formattedPhone = formatPhoneNumber(formData.phoneNumber);
      const response = await initiateMpesaPayment(formData.amount, formattedPhone);

      if (response.success) {
        setPaymentStatus({
          type: 'success',
          message: response.message,
          transactionId: response.transactionId
        });

        // Show toast notification
        showToast('Payment request sent! Check your phone for M-Pesa prompt.', 'success');

        // Create pending payment record
        const newPayment = {
          id: Date.now().toString(),
          tenantId: user?.id,
          amount: parseFloat(formData.amount),
          status: 'pending',
          transactionId: response.transactionId,
          phoneNumber: formattedPhone,
          createdAt: new Date().toISOString().split('T')[0],
          method: 'mpesa'
        };

        setTenantPayments(prev => [newPayment, ...prev]);
        
        // Clear form
        setFormData({ amount: "", phoneNumber: formattedPhone });
        
      } else {
        setPaymentStatus({
          type: 'error',
          message: response.message
        });
        showToast(response.message || 'Payment failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = 'An error occurred while processing your payment. Please try again.';
      setPaymentStatus({
        type: 'error',
        message: errorMessage
      });
      showToast(errorMessage, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Quick amount buttons
  const quickAmounts = currentTenant ? [
    { label: 'Full Rent', amount: currentTenant.rentAmount },
  ].filter(item => item.amount > 0 && item.amount <= currentTenant.rentDue) : [];

  if (!currentTenant) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <FaExclamationTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-lg font-medium text-gray-900 mb-2">Tenant Data Not Found</h2>
          <p className="text-gray-500">Unable to load your tenant information. Please contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Payment Center
        </h1>
        <p className="text-gray-600 mt-2">Manage your rent payments securely with M-Pesa</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Form */}
        <div className="border rounded-xl shadow-sm bg-white">
          <div className="p-4 border-b bg-gradient-to-r from-green-50 to-emerald-50">
            <h2 className="text-lg font-semibold flex items-center">
              <FaMobileAlt className="mr-2 text-green-600" />
              M-Pesa Payment
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Pay your rent using M-Pesa mobile money
            </p>
          </div>

          <div className="p-6">
            {/* Payment Status Alert */}
            {paymentStatus && (
              <div className={`mb-4 p-4 rounded-lg border flex items-start ${
                paymentStatus.type === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                {paymentStatus.type === 'success' ? (
                  <FaCheckCircle className="mr-2 mt-0.5 text-green-600" />
                ) : (
                  <FaTimes className="mr-2 mt-0.5 text-red-600" />
                )}
                <div>
                  <p className="font-medium">{paymentStatus.message}</p>
                  {paymentStatus.transactionId && (
                    <p className="text-sm mt-1">Transaction ID: {paymentStatus.transactionId}</p>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handlePayment} className="space-y-6">
              {/* Balance Summary */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3">Account Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-700">Room Number:</span>
                    <span className="text-sm font-bold text-blue-900">{currentTenant.room}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-700">Monthly Rent:</span>
                    <span className="text-sm text-blue-800">KSh {currentTenant.rentAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-blue-200 pt-2">
                    <span className="text-sm font-medium text-blue-700">Outstanding Balance:</span>
                    <span className="text-lg font-bold text-blue-900">
                      KSh {currentTenant.rentDue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Amount Buttons */}
              {quickAmounts.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Amount Selection
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {quickAmounts.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, amount: item.amount.toString() }))}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500">KSh {item.amount.toLocaleString()}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Amount Input */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Amount (KSh) *
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount to pay"
                  min="1"
                  max={currentTenant.rentDue}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.amount ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isProcessing}
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  M-Pesa Phone Number *
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+254712345678"
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isProcessing}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Enter your M-Pesa registered phone number
                </p>
              </div>

              {/* Info Alert */}
              <div className="flex items-start p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-sm">
                <FaInfoCircle className="mr-2 mt-0.5 text-blue-600" />
                <div>
                  <p className="font-medium mb-1">How it works:</p>
                  <ul className="text-xs space-y-1">
                    <li>• You'll receive an M-Pesa prompt on your phone</li>
                    <li>• Enter your M-Pesa PIN to complete payment</li>
                    <li>• Payment confirmation will be sent via SMS</li>
                  </ul>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || currentTenant.rentDue === 0}
                className="w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <FaCreditCard className="mr-2" />
                    Pay with M-Pesa
                  </>
                )}
              </button>

              {/* Fully Paid Alert */}
              {currentTenant.rentDue === 0 && (
                <div className="flex items-start p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                  <FaCheckCircle className="mr-2 mt-0.5 text-green-600" />
                  <p className="font-medium">Your rent is fully paid for this month!</p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Payment History */}
        <div className="border rounded-xl shadow-sm bg-white">
          <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-lg font-semibold flex items-center">
              <FaReceipt className="mr-2 text-blue-600" />
              Payment History
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Your recent payment transactions
            </p>
          </div>

          <div className="p-6">
            {tenantPayments.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {tenantPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900">
                          KSh {payment.amount.toLocaleString()}
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : payment.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {payment.status === "completed" && <FaCheckCircle className="mr-1" />}
                          {payment.status === "pending" && <FaClock className="mr-1" />}
                          {payment.status === "failed" && <FaTimes className="mr-1" />}
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {new Date(payment.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {payment.transactionId}
                      </p>
                      <p className="text-xs text-gray-500">
                        {payment.phoneNumber} • {payment.method.toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaCreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History</h3>
                <p className="text-gray-500">Your payment transactions will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantPaymentCenter;