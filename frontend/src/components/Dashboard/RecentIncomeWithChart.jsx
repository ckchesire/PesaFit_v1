import React from 'react';
import { useState, useEffect } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"]

const RecentIncomeWithChart = ({data, totalIncome}) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    // Check if data is an array
    if (!Array.isArray(data)) return [];
    
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }))
    
    return dataArr;
  }

  useEffect(() => {
    const result = prepareChartData();
    setChartData(result);
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  )
}

export default RecentIncomeWithChart