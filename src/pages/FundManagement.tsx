import React from 'react';
import { Plus, ArrowUpDown } from 'lucide-react';
import { mockTransactions, mockMetrics } from '../data';

const FundManagement = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fund Management</h1>
          <p className="text-gray-500">Manage your AI service funds and transactions</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Funds
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Transfer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Wallet Balance</h2>
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(mockMetrics.totalBalance)}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Monthly Budget</p>
            <p className="text-lg font-semibold mt-1">{formatCurrency(mockMetrics.monthlyBudget)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Total Allocated</p>
            <p className="text-lg font-semibold mt-1">{formatCurrency(mockMetrics.totalAllocated)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Available</p>
            <p className="text-lg font-semibold mt-1">
              {formatCurrency(mockMetrics.totalBalance - mockMetrics.totalAllocated)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Agent</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-t border-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{transaction.agent || '-'}</td>
                  <td className={`px-6 py-4 text-sm text-right ${
                    transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FundManagement;