import React from 'react'
import { useState } from 'react';
import { Building } from 'lucide-react';
// Login Component
const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [userType, setUserType] = useState('admin');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare for Django authentication
    const payload = {
      email: credentials.email,
      password: credentials.password
    };

    try {
      // Backend authentication ready
      // const response = await fetch('/api/v1/auth/login/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      // const data = await response.json();
      // localStorage.setItem('token', data.access_token);
      // localStorage.setItem('refresh_token', data.refresh_token);
      
      console.log('Login payload ready for backend:', payload);
      onLogin(userType);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const demoLogin = (type) => {
    setUserType(type);
    onLogin(type);
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-gray-700 mb-3">Demo Credentials:</p>
            <div className="space-y-2">
              <div>
                <button 
                  onClick={() => demoLogin('admin')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  <strong>Admin:</strong> admin@property.com / admin123
                </button>
              </div>
              <div>
                <button 
                  onClick={() => demoLogin('tenant')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  <strong>Tenant:</strong> john@email.com / tenant123
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm
