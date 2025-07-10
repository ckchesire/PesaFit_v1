import moment from 'moment';

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  if (!Array.isArray(data)) return [];
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
  return chartData;
}

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Group by month and sum amounts
  const groupedData = sortedData.reduce((acc, item) => {
    const monthKey = moment(item?.date).format('Do MMM');
    
    if (acc[monthKey]) {
      acc[monthKey].amount += item?.amount;
      acc[monthKey].sources.push(item?.source);
    } else {
      acc[monthKey] = {
        category: monthKey,
        amount: item?.amount,
        sources: [item?.source],
      };
    }
    
    return acc;
  }, {});
  
  // Convert back to array
  const chartData = Object.values(groupedData);
  
  return chartData;
};