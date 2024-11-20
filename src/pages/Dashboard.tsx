import React from 'react';
import { Brain, Users, DollarSign, BarChart3, TrendingUp, Wallet, Receipt } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ClientsOverview from '../components/ClientsOverview';
import AlfredAssistant from '../components/AlfredAssistant';
import Header from '../components/Header';
import FinancialMetrics from '../components/FinancialMetrics';
import TeamManagement from '../components/TeamManagement';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <MetricCard 
              title="Monthly Recurring Revenue" 
              value="$124,592.50" 
              trend="+12.5%"
              icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
            />
            <MetricCard 
              title="Monthly Costs" 
              value="$45,230.80" 
              trend="-3.2%"
              icon={<Wallet className="w-6 h-6 text-red-600" />}
            />
            <MetricCard 
              title="Monthly Profit" 
              value="$79,361.70" 
              trend="+18.7%"
              icon={<Receipt className="w-6 h-6 text-blue-600" />}
            />
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2">
              <FinancialMetrics />
            </div>
            <div className="xl:col-span-1">
              <AlfredAssistant />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <TeamManagement />
            <ClientsOverview />
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon }) {
  const trendIsPositive = trend.startsWith('+');
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <span className={`text-sm font-medium ${trendIsPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}