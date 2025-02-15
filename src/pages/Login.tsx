import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';

const VALID_CREDENTIALS = [
  { id: 'Vedant', password: 'qazmlp123' },
  { id: 'Siri', password: 'sirikaparthi12' }
  { id: 'Admin', password: 'admin@123' }
];

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isValidCredentials = VALID_CREDENTIALS.some(
      cred => cred.id === userId && cred.password === password
    );

    if (isValidCredentials) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userId', userId);
      navigate('/');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-pink-50 p-3 rounded-xl">
              <Bot className="w-8 h-8 text-pink-500" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Vora
          </h2>
          <p className="mt-2 text-gray-500">AI Fund Management Hub</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                User ID
              </label>
              <input
                id="userId"
                type="text"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter your user ID"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
