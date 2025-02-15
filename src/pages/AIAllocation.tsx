import React, { useState } from 'react';
import { Bot, AlertCircle, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { mockAgents, mockMetrics, mockSuggestions } from '../data';
import { AIAgent, AISuggestion } from '../types';
import PerformanceChart from '../components/PerformanceChart';

const AIAllocation = () => {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const calculatePercentage = (spent: number, allocation: number) => {
    return (spent / allocation) * 100;
  };

  const getImpactColor = (impact: AISuggestion['impact']) => {
    switch (impact) {
      case 'high':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-amber-600 bg-amber-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Allocation</h1>
            <p className="text-gray-500">Manage your AI agent budgets and spending limits</p>
          </div>
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            <Zap className="w-4 h-4 mr-2" />
            {showSuggestions ? 'Hide Suggestions' : 'Show Suggestions'}
          </button>
        </div>
      </div>

      {showSuggestions && (
        <div className="mb-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-pink-500 mr-2" />
            <h2 className="text-lg font-semibold">AI-Driven Suggestions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getImpactColor(suggestion.impact)}`}>
                    {suggestion.impact} impact
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{suggestion.description}</p>
                {suggestion.potentialSavings && (
                  <p className="text-sm text-green-600 mb-2">
                    Potential savings: {formatCurrency(suggestion.potentialSavings)}
                  </p>
                )}
                <p className="text-sm font-medium text-gray-700">
                  Recommendation: {suggestion.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Available for Allocation</h2>
            <p className="text-sm text-gray-500 mt-1">Remaining funds that can be allocated to AI agents</p>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(mockMetrics.totalBalance - mockMetrics.totalAllocated)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAgents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-pink-50 p-2 rounded-lg mr-3">
                    <Bot className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-500">{agent.category} AI</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  agent.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'
                }`}>
                  {agent.status}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Allocated Budget</span>
                    <span className="font-medium">{formatCurrency(agent.allocation)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Spent</span>
                    <span className="font-medium">{formatCurrency(agent.spent)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Remaining</span>
                    <span className="font-medium">{formatCurrency(agent.allocation - agent.spent)}</span>
                  </div>
                </div>

                {agent.performance && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Metrics</h4>
                    <PerformanceChart performance={agent.performance} />
                  </div>
                )}

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Usage</span>
                    <span className="font-medium">
                      {Math.round(calculatePercentage(agent.spent, agent.allocation))}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-pink-500 h-2 rounded-full"
                      style={{
                        width: `${calculatePercentage(agent.spent, agent.allocation)}%`
                      }}
                    />
                  </div>
                </div>

                {calculatePercentage(agent.spent, agent.allocation) > 80 && (
                  <div className="flex items-center text-sm text-amber-600 bg-amber-50 p-2 rounded-lg">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span>Approaching allocation limit</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-b-xl">
              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedAgent(agent)}
                  className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Adjust Limit
                </button>
                <button className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Adjust Budget for {selectedAgent.name}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Allocation
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  defaultValue={selectedAgent.allocation}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAllocation;