import React, { useState } from 'react';
import { Building, AlertCircle } from 'lucide-react';

// SECURITY NOTE: In production, NEVER store passwords in frontend code
// This mock data is ONLY for development/testing
const mockUsers = {
  admin: {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@property.com',
    // In real app, password validation happens on backend only
    password: 'admin123',
    role: 'admin'
  },
  tenant: {
    id: '1',
    name: 'John Doe',
    email: 'john@email.com',
    password: 'tenant123',
    room: 'A101',
    phone: '+254712345678',
    role: 'tenant'
  }
};

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // ==================== BACKEND INTEGRATION ====================
      // When you integrate with Django backend, REPLACE the mock validation below
      // with this actual API call:
      
      /*
      const response = await fetch('/api/v1/auth/login/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      // Handle response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Backend should return:
      // {
      //   access_token: "jwt_token_here",
      //   refresh_token: "refresh_token_here",
      //   user: {
      //     id: "user_id",
      //     name: "User Name",
      //     email: "user@example.com",
      //     role: "admin" | "tenant",  // Backend determines this
      //     phone: "+254712345678",
      //     room: "A101"  // for tenants only
      //   }
      // }

      // Store tokens securely (httpOnly cookies are more secure than localStorage)
      // But if using localStorage:
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      
      // The BACKEND determines the role based on database
      // For your 3 admins: set is_staff=True or role='admin' in Django
      // All others from signup form get role='tenant'
      
      // Pass user data to auth context
      onLogin(data.user.role, data.user);
      */

      // ==================== MOCK VALIDATION (Development Only) ====================
      // This simulates backend validation for testing
      // DELETE THIS SECTION when integrating with real backend
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Find user by email
      const user = Object.values(mockUsers).find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Verify password
      if (user.password !== credentials.password) {
        throw new Error('Invalid email or password');
      }
      
      // Create user data object (excluding password)
      const { password, ...userData } = user;
      
      // Successful login
      onLogin(userData.role, userData);
      
      // ==================== END MOCK VALIDATION ====================

    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = (type) => {
    const user = mockUsers[type];
    const { password, ...userData } = user;
    onLogin(userData.role, userData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-blue-600">TenantHub</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-6">Enter your credentials to access your dashboard</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={credentials.email}
                onChange={(e) => {
                  setCredentials(prev => ({ ...prev, email: e.target.value }));
                  setError('');
                }}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => {
                  setCredentials(prev => ({ ...prev, password: e.target.value }));
                  setError('');
                }}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3 text-center">Quick Demo Login:</p>
            <div className="space-y-2">
              <button 
                onClick={() => demoLogin('admin')}
                disabled={isLoading}
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                <strong className="text-blue-600">Admin:</strong> admin@property.com
              </button>
              <button 
                onClick={() => demoLogin('tenant')}
                disabled={isLoading}
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                <strong className="text-blue-600">Tenant:</strong> john@email.com
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              For testing: Use passwords "admin123" or "tenant123"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;