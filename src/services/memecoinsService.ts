import { Memecoin, MentionData, Alert } from '../types';

const generateRandomMemecoins = (): Memecoin[] => {
  const coinNames = ['Doge', 'Shiba', 'SafeMoon', 'ElonMars', 'MoonShot', 'RocketCoin', 'DiamondHands', 'ToTheMoon'];
  return coinNames.map((name, index) => ({
    id: `coin-${index + 1}`,
    name,
    firstMention: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    totalMentions: Math.floor(Math.random() * 10000),
    growthPercentage: (Math.random() * 200) - 100,
    sentiment: (Math.random() * 10) - 5,
    price: Math.random() * 10,
    priceChange: (Math.random() * 40) - 20,
  }));
};

let memecoins: Memecoin[] = generateRandomMemecoins();
let alerts: Alert[] = [];

export const getMemecoins = (): Memecoin[] => {
  // Simulate data updates
  memecoins = memecoins.map(coin => ({
    ...coin,
    totalMentions: coin.totalMentions + Math.floor(Math.random() * 100),
    growthPercentage: coin.growthPercentage + (Math.random() * 10) - 5,
    sentiment: Math.max(-5, Math.min(5, coin.sentiment + (Math.random() * 2) - 1)),
    price: Math.max(0, coin.price + (Math.random() * 0.5) - 0.25),
    priceChange: (Math.random() * 10) - 5,
  }));
  return memecoins;
};

export const getMentionData = (coinId: string): MentionData[] => {
  const coin = memecoins.find(c => c.id === coinId);
  if (!coin) return [];

  const data: MentionData[] = [];
  let currentDate = new Date();
  let currentMentions = coin.totalMentions;

  for (let i = 0; i < 24; i++) {
    data.unshift({
      timestamp: new Date(currentDate.getTime() - i * 60 * 60 * 1000),
      count: Math.max(0, currentMentions - Math.floor(Math.random() * 100)),
    });
    currentMentions = data[0].count;
  }

  return data;
};

export const getAlerts = (): Alert[] => {
  return alerts;
};

export const addAlert = (alert: Omit<Alert, 'id'>): Alert => {
  const newAlert = { ...alert, id: Date.now().toString() };
  alerts.push(newAlert);
  return newAlert;
};

export const removeAlert = (id: string): void => {
  alerts = alerts.filter(alert => alert.id !== id);
};

export const updateAlerts = (memecoins: Memecoin[]): Alert[] => {
  alerts = alerts.map(alert => {
    const coin = memecoins.find(c => c.id === alert.coinId);
    if (coin) {
      let triggered = false;
      switch (alert.type) {
        case 'mentions':
          triggered = alert.condition === 'above' ? coin.totalMentions > alert.threshold : coin.totalMentions < alert.threshold;
          break;
        case 'sentiment':
          triggered = alert.condition === 'above' ? coin.sentiment > alert.threshold : coin.sentiment < alert.threshold;
          break;
        case 'price':
          triggered = alert.condition === 'above' ? coin.price > alert.threshold : coin.price < alert.threshold;
          break;
      }
      return { ...alert, triggered };
    }
    return alert;
  });
  return alerts;
};