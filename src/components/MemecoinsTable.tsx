import React from 'react';
import { Memecoin } from '../types';
import { TrendingUp, TrendingDown, DollarSign, BarChart2, ThumbsUp, ThumbsDown } from 'lucide-react';

interface MemecoinsTableProps {
  memecoins: Memecoin[];
  onSelectCoin: (coinId: string) => void;
  selectedCoinId: string | null;
}

const MemecoinsTable: React.FC<MemecoinsTableProps> = ({ memecoins, onSelectCoin, selectedCoinId }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">First Mention</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Mentions</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Growth</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sentiment</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {memecoins.map((coin) => (
            <tr 
              key={coin.id} 
              className={`hover:bg-gray-700 transition-colors cursor-pointer ${selectedCoinId === coin.id ? 'bg-gray-600' : ''}`}
              onClick={() => onSelectCoin(coin.id)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium">{coin.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">{coin.firstMention.toLocaleDateString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm flex items-center">
                  <BarChart2 className="mr-1 h-4 w-4 text-blue-400" />
                  {coin.totalMentions.toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-semibold flex items-center ${
                  coin.growthPercentage >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {coin.growthPercentage >= 0 ? (
                    <TrendingUp className="mr-1 h-4 w-4" />
                  ) : (
                    <TrendingDown className="mr-1 h-4 w-4" />
                  )}
                  {Math.abs(coin.growthPercentage).toFixed(2)}%
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-semibold flex items-center ${
                  coin.sentiment >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {coin.sentiment >= 0 ? (
                    <ThumbsUp className="mr-1 h-4 w-4" />
                  ) : (
                    <ThumbsDown className="mr-1 h-4 w-4" />
                  )}
                  {coin.sentiment.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-yellow-400" />
                  {coin.price.toFixed(4)}
                  <span className={`ml-2 ${
                    coin.priceChange >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    ({coin.priceChange >= 0 ? '+' : ''}{coin.priceChange.toFixed(2)}%)
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemecoinsTable;