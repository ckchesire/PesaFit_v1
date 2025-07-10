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


export const prepareExpenseLineChartData = (data = []) => {
  const groupedByDay = data.reduce((acc, curr) => {
    const dayKey = moment(curr.date).format('YYYY-MM-DD');

    if (!acc[dayKey]) {
      acc[dayKey] = {
        date: dayKey,
        amount: 0,
        categories: {},
      };
    }

    acc[dayKey].amount += Number(curr.amount);

    // Track amount by category
    if (!acc[dayKey].categories[curr.category]) {
      acc[dayKey].categories[curr.category] = 0;
    }
    acc[dayKey].categories[curr.category] += Number(curr.amount);

    return acc;
  }, {});

  const chartData = Object.values(groupedByDay).map((entry) => ({
    dayLabel: moment(entry.date).format('Do MMM'),
    amount: entry.amount,
    categories: entry.categories,
    date: entry.date,
  }));

  return chartData.sort((a, b) => new Date(a.date) - new Date(b.date));
};

