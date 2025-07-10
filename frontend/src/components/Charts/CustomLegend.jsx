const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <div className="flex gap-2 items-center justify-center flex-wrap mt-4 space-x-6">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center text-sm text-gray-600 space-x-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-gray-700 font-medium">{entry.value}
            </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;