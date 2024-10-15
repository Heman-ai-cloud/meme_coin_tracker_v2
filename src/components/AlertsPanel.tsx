import React, { useState } from 'react';
import { Alert, Memecoin } from '../types';
import { Bell, BellOff, Plus, X } from 'lucide-react';
import { addAlert, removeAlert } from '../services/memecoinsService';

interface AlertsPanelProps {
  alerts: Alert[];
  memecoins: Memecoin[];
  onAlertsChange: () => void;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, memecoins, onAlertsChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [newAlert, setNewAlert] = useState<Omit<Alert, 'id' | 'triggered'>>({
    coinId: '',
    type: 'mentions',
    threshold: 0,
    condition: 'above',
  });

  const handleAddAlert = () => {
    addAlert({ ...newAlert, triggered: false });
    setShowForm(false);
    setNewAlert({ coinId: '', type: 'mentions', threshold: 0, condition: 'above' });
    onAlertsChange();
  };

  const handleRemoveAlert = (id: string) => {
    removeAlert(id);
    onAlertsChange();
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Bell className="mr-2" />
          Alerts
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
        >
          <Plus size={20} />
        </button>
      </div>
      {showForm && (
        <form onSubmit={(e) => { e.preventDefault(); handleAddAlert(); }} className="mb-4 space-y-2">
          <select
            value={newAlert.coinId}
            onChange={(e) => setNewAlert({ ...newAlert, coinId: e.target.value })}
            className="w-full bg-gray-700 text-white rounded px-2 py-1"
          >
            <option value="">Select Coin</option>
            {memecoins.map((coin) => (
              <option key={coin.id} value={coin.id}>{coin.name}</option>
            ))}
          </select>
          <select
            value={newAlert.type}
            onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value as Alert['type'] })}
            className="w-full bg-gray-700 text-white rounded px-2 py-1"
          >
            <option value="mentions">Mentions</option>
            <option value="sentiment">Sentiment</option>
            <option value="price">Price</option>
          </select>
          <select
            value={newAlert.condition}
            onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value as Alert['condition'] })}
            className="w-full bg-gray-700 text-white rounded px-2 py-1"
          >
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
          <input
            type="number"
            value={newAlert.threshold}
            onChange={(e) => setNewAlert({ ...newAlert, threshold: parseFloat(e.target.value) })}
            placeholder="Threshold"
            className="w-full bg-gray-700 text-white rounded px-2 py-1"
          />
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
            Add Alert
          </button>
        </form>
      )}
      <ul className="space-y-2">
        {alerts.map((alert) => (
          <li key={alert.id} className={`flex items-center justify-between p-3 rounded-md ${
            alert.triggered ? 'bg-red-900/50' : 'bg-gray-700'
          }`}>
            <span className="text-sm">
              {memecoins.find(c => c.id === alert.coinId)?.name} {alert.type} {alert.condition} {alert.threshold}
            </span>
            <div className="flex items-center">
              {alert.triggered ? (
                <Bell className="h-5 w-5 text-red-400 mr-2" />
              ) : (
                <BellOff className="h-5 w-5 text-gray-400 mr-2" />
              )}
              <button onClick={() => handleRemoveAlert(alert.id)} className="text-red-400 hover:text-red-300">
                <X size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsPanel;