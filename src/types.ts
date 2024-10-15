export interface Memecoin {
  id: string;
  name: string;
  firstMention: Date;
  totalMentions: number;
  growthPercentage: number;
  sentiment: number;
  price: number;
  priceChange: number;
}

export interface MentionData {
  timestamp: Date;
  count: number;
}

export interface Alert {
  id: string;
  coinId: string;
  type: 'mentions' | 'sentiment' | 'price';
  threshold: number;
  condition: 'above' | 'below';
  triggered: boolean;
}