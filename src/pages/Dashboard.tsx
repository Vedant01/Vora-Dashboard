import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  PieChart,
  Activity 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MetricCard from '../components/MetricCard';
import { mockMetrics, mockAgents, mockTransactions } from '../data';

const Dashboard = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const spendingData = mockAgents.map(agent => ({
    name: agent.name,
    spent: agent.spent,
    allocated: agent.allocation
  }));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here's your fund status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Balance"
          value={formatCurrency(mockMetrics.totalBalance)}
          icon={<Wallet className="w-6 h-6 text-pink-500" />}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Total Allocated"
          value={formatCurrency(mockMetrics.totalAllocated)}
          icon={<PieChart className="w-6 h-6 text-pink-500" />}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Total Spent"
          value={formatCurrency(mockMetrics.totalSpent)}
          icon={<Activity className="w-6 h-6 text-pink-500" />}
          trend={{ value: 5, isPositive: false }}
        />
        <MetricCard
          title="Monthly Budget"
          value={formatCurrency(mockMetrics.monthlyBudget)}
          icon={<TrendingUp className="w-6 h-6 text-pink-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">AI Agent Spending</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="spent" fill="#ec4899" />
                <Bar dataKey="allocated" fill="#f9a8d4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100">
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{transaction.description}</td>
                    <td className={`px-4 py-3 text-sm text-right ${
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
    </div>
  );
};

export default Dashboard;