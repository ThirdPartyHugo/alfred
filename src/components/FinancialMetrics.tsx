import React, { useState } from 'react';
import { BarChart3, Download, Calendar } from 'lucide-react';

const monthlyData = {
  revenue: [98500, 102300, 110500, 124592.50],
  costs: [42100, 43500, 44800, 45230.80],
  profit: [56400, 58800, 65700, 79361.70]
};

const categories = [
  { name: 'Software Subscriptions', amount: 12450.30, percentage: 27.5 },
  { name: 'Employee Salaries', amount: 18500.00, percentage: 40.9 },
  { name: 'Marketing Expenses', amount: 8230.50, percentage: 18.2 },
  { name: 'Office & Utilities', amount: 4550.00, percentage: 10.1 },
  { name: 'Miscellaneous', amount: 1500.00, percentage: 3.3 }
];

export default function FinancialMetrics() {
  const [timeframe, setTimeframe] = useState('monthly');

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Financial Breakdown</h2>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-4">Revenue vs Costs Trend</h3>
            <div className="h-64 flex items-end space-x-2">
              {monthlyData.revenue.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="w-full bg-emerald-200 rounded-t" style={{ height: `${(value/150000)*100}%` }}></div>
                  <div className="w-full bg-red-200 rounded-t" style={{ height: `${(monthlyData.costs[index]/150000)*100}%` }}></div>
                  <span className="text-xs text-gray-500">M{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-200 rounded"></div>
                <span className="text-xs text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-200 rounded"></div>
                <span className="text-xs text-gray-600">Costs</span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-4">Cost Categories</h3>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{category.name}</span>
                    <span className="font-medium">${category.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}