import React from 'react';
import { Download, Calendar } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { mockAgents } from '../data';

const Reports = () => {
  // Generate mock spending data for the last 7 days
  const generateSpendingData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        spending: Math.floor(Math.random() * 1000) + 500,
      });
    }
    return data;
  };

  const spendingData = generateSpendingData();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500">View detailed spending reports and usage analytics</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4 mr-2" />
            Last 7 Days
          </button>
          <button className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Daily Spending Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="spending" stroke="#ec4899" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">AI Agent Usage Summary</h2>
          <div className="space-y-4">
            {mockAgents.map((agent) => (
              <div key={agent.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="bg-pink-100 p-2 rounded-lg mr-3">
                      <span className="font-semibold text-pink-500">{agent.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-500">
                        {((agent.spent / agent.allocation) * 100).toFixed(1)}% of budget used
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${agent.spent.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">of ${agent.allocation.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-pink-500 h-2 rounded-full"
                    style={{ width: `${(agent.spent / agent.allocation) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Spending Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Most Used Service</h3>
            <p className="text-lg font-semibold">GPT-4</p>
            <p className="text-sm text-gray-500">46% of total spending</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Highest Daily Spend</h3>
            <p className="text-lg font-semibold">$1,245</p>
            <p className="text-sm text-gray-500">March 15, 2024</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Average Daily Spend</h3>
            <p className="text-lg font-semibold">$742</p>
            <p className="text-sm text-gray-500">Last 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;