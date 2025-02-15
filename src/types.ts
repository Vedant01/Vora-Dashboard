export interface AIAgent {
  id: string;
  name: string;
  allocation: number;
  spent: number;
  status: 'active' | 'paused';
  performance?: {
    costEfficiency: number;
    responseQuality: number;
    averageLatency: number;
  };
  category: 'language' | 'vision' | 'multimodal';
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  agent?: string;
}

export interface FundMetrics {
  totalBalance: number;
  totalSpent: number;
  totalAllocated: number;
  monthlyBudget: number;
}

export interface AISuggestion {
  id: string;
  type: 'optimization' | 'allocation' | 'performance';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  potentialSavings?: number;
  recommendation: string;
}