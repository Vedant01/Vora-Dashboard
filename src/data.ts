import { AIAgent, Transaction, FundMetrics, AISuggestion } from './types';

export const mockAgents: AIAgent[] = [
  {
    id: '1',
    name: 'GPT-4',
    allocation: 5000,
    spent: 2300,
    status: 'active',
    category: 'language',
    performance: {
      costEfficiency: 0.85,
      responseQuality: 0.92,
      averageLatency: 0.8,
    },
  },
  {
    id: '2',
    name: 'Claude',
    allocation: 3000,
    spent: 1200,
    status: 'active',
    category: 'language',
    performance: {
      costEfficiency: 0.88,
      responseQuality: 0.89,
      averageLatency: 0.85,
    },
  },
  {
    id: '3',
    name: 'DALL-E',
    allocation: 2000,
    spent: 800,
    status: 'active',
    category: 'vision',
    performance: {
      costEfficiency: 0.75,
      responseQuality: 0.95,
      averageLatency: 0.70,
    },
  },
  {
    id: '4',
    name: 'Midjourney',
    allocation: 1500,
    spent: 900,
    status: 'paused',
    category: 'vision',
    performance: {
      costEfficiency: 0.70,
      responseQuality: 0.90,
      averageLatency: 0.75,
    },
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-15',
    amount: 500,
    type: 'debit',
    description: 'GPT-4 API Usage',
    agent: 'GPT-4',
  },
  {
    id: '2',
    date: '2024-03-14',
    amount: 1000,
    type: 'credit',
    description: 'Budget Allocation',
  },
  {
    id: '3',
    date: '2024-03-13',
    amount: 300,
    type: 'debit',
    description: 'Claude API Usage',
    agent: 'Claude',
  },
];

export const mockMetrics: FundMetrics = {
  totalBalance: 15000,
  totalSpent: 5200,
  totalAllocated: 11500,
  monthlyBudget: 20000,
};

export const mockSuggestions: AISuggestion[] = [
  {
    id: '1',
    type: 'optimization',
    title: 'Optimize GPT-4 Usage',
    description: 'Based on usage patterns, GPT-4 is being used for simple tasks that could be handled by more cost-effective models.',
    impact: 'high',
    potentialSavings: 450,
    recommendation: 'Consider routing simple queries to GPT-3.5 or Claude Instant for 30% cost reduction.',
  },
  {
    id: '2',
    type: 'allocation',
    title: 'Rebalance Vision AI Budget',
    description: 'DALL-E shows better cost efficiency compared to Midjourney for current workloads.',
    impact: 'medium',
    potentialSavings: 200,
    recommendation: 'Increase DALL-E allocation by reducing Midjourney budget.',
  },
  {
    id: '3',
    type: 'performance',
    title: 'Latency Optimization',
    description: 'Claude shows better response times for complex queries compared to GPT-4.',
    impact: 'medium',
    recommendation: 'Route time-sensitive complex queries to Claude for improved performance.',
  },
];