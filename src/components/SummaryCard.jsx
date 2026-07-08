function SummaryCard({
    title,
    amount,
    color,
    icon,
  }) {
    return (
      <div
        className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg
        hover:scale-105 transition-all duration-300"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">
              {title}
            </p>
  
            <h2
              className={`text-3xl font-bold mt-3 ${color}`}
            >
              ₹{amount}
            </h2>
          </div>
  
          <div className="text-4xl">
            {icon}
          </div>
        </div>
      </div>
    );
  }
  
  export default SummaryCard;