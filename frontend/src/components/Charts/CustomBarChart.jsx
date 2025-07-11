import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({data}) => {

  // Add function to alternate colors
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomTooltip = ({ active, payload}) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload.category}</p>
          <p className="text-sm text-gray-600">
            Amount: <span className="text-sm font-medium text-gray-900">${payload[0].payload.amount}</span>
          </p>
          {payload[0].payload.sources && (
            <p className="text-xs text-gray-500">
              Sources:
              <br />
              {Array.isArray(payload[0].payload.sources)
                ? payload[0].payload.sources.map((src, idx) => (
                    <span
                      key={idx}
                      className="block ml-2 text-purple-700 text-xs font-medium before:content-['•_']"
                    >
                      {src}
                    </span>
                  ))
                : (
                    <span className="inline-block ml-2 px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-xs font-medium">
                      {payload[0].payload.sources}
                    </span>
                  )
              }
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none"/>
          
          <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

          <Tooltip content={CustomTooltip} />
          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle= {{ fill: "green"}}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={getBarColor(index)} />
              ))}
            </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart