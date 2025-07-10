import React from 'react';
import { 
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart,
 } from 'recharts';

const CustomLineChart = ({ data }) => {

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data2 = payload[0].payload;

  if (!data2 || !data2.categories) return null;

  const total = Object.values(data2.categories).reduce((sum, val) => sum + val, 0);

  return (
    <div className="bg-white shadow-md rounded-lg p-3 border border-gray-300 text-sm w-52">
      <p className="text-xs font-semibold text-purple-800 mb-2">
        {data2.dayLabel}
      </p>

      {Object.entries(data2.categories).map(([category, amount]) => (
        <div
          key={category}
          className="flex justify-between text-xs text-gray-600 py-0.5"
        >
          <span className="mr-4">{category}</span>
          <span className="font-medium text-gray-900">${amount}</span>
        </div>
      ))}

      <hr className="my-2" />
      <div className="flex justify-between text-xs font-semibold text-purple-900">
        <span>Total</span>
        <span>${total}</span>
      </div>
      </div>
    );
  }


  return (
    <div className="bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="none" />
          <XAxis dataKey="dayLabel" tick={{ fontSize: 12, fill: "#555" }} stroke="none"/>
          <YAxis tick={{ fontSize: 12, fill: "#555"}} stroke="none" />
          <Tooltip content={<CustomTooltip />} />

          <Area type="monotone" dataKey="amount" stroke="#875cf5" fill="url(#incomeGradient)" strokeWidth={3} dot={{ r: 3, fill: "#ab8df8"}} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart