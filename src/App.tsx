import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart2, ThumbsUp } from 'lucide-react';
import MemecoinsTable from './components/MemecoinsTable';
import MentionChart from './components/MentionChart';
import AlertsPanel from './components/AlertsPanel';
import { getMemecoins, getMentionData, getAlerts, updateAlerts } from './services/memecoinsService';
import { Memecoin, Alert } from './types';

const App: React.FC = () => {
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  const [mentionData, setMentionData] = useState([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const newMemecoins = getMemecoins();
      setMemecoins(newMemecoins);
      if (newMemecoins.length > 0) {
        const coinId = selectedCoinId || newMemecoins[0].id;
        setSelectedCoinId(coinId);
        setMentionData(getMentionData(coinId));
      }
      const updatedAlerts = updateAlerts(newMemecoins);
      setAlerts(updatedAlerts);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [selectedCoinId]);

  const handleCoinSelect = (coinId: string) => {
    setSelectedCoinId(coinId);
  };

  const handleAlertsChange = () => {
    setAlerts(getAlerts());
  };

  const totalMentions = memecoins.reduce((sum, coin) => sum + coin.totalMentions, 0);
  const averageSentiment = memecoins.length > 0
    ? memecoins.reduce((sum, coin) => sum + coin.sentiment, 0) / memecoins.length
    : 0;
  const totalGrowth = memecoins.reduce((sum, coin) => sum + coin.growthPercentage, 0);
  const averagePrice = memecoins.length > 0
    ? memecoins.reduce((sum, coin) => sum + coin.price, 0) / memecoins.length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold flex items-center">
            <DollarSign className="mr-2" />
            Memecoin Tracker
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <BarChart2 className="mr-2" />
              Total Mentions
            </h3>
            <p className="text-2xl font-bold">{totalMentions.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <ThumbsUp className="mr-2" />
              Average Sentiment
            </h3>
            <p className="text-2xl font-bold">{averageSentiment.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <TrendingUp className="mr-2" />
              Total Growth
            </h3>
            <p className="text-2xl font-bold">{totalGrowth.toFixed(2)}%</p>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <DollarSign className="mr-2" />
              Average Price
            </h3>
            <p className="text-2xl font-bold">${averagePrice.toFixed(4)}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MemecoinsTable memecoins={memecoins} onSelectCoin={handleCoinSelect} selectedCoinId={selectedCoinId} />
          </div>
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Mention Trend</h2>
              <MentionChart data={mentionData} />
            </div>
            <AlertsPanel alerts={alerts} memecoins={memecoins} onAlertsChange={handleAlertsChange} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;