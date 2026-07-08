import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  import { isDarkMode } from "../utils/theme";
  import { getTransactionKey } from "../utils/storage";
  
  function ExpenseChart() {
    const darkMode = isDarkMode();
  
    const transactions =
        JSON.parse(
            localStorage.getItem(getTransactionKey())
        ) || [];
  
    const expenses = transactions.filter(
      (transaction) => transaction.type === "Expense"
    );
  
    const groupedExpenses = expenses.reduce((acc, expense) => {
      const existingCategory = acc.find(
        (item) => item.name === expense.category
      );
  
      if (existingCategory) {
        existingCategory.value += expense.amount;
      } else {
        acc.push({
          name: expense.category,
          value: expense.amount,
        });
      }
  
      return acc;
    }, []);
  
    const colors = [
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#8B5CF6",
      "#06B6D4",
      "#EC4899",
      "#84CC16",
    ];
  
    return (
      <div
        className={`p-6 rounded-2xl shadow h-[380px] ${
          darkMode
            ? "bg-slate-800 text-white"
            : "bg-white"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">
          Expense Breakdown
        </h2>
  
        {groupedExpenses.length === 0 ? (
          <p>No expense data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={groupedExpenses}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {groupedExpenses.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
  
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    );
  }
  
  export default ExpenseChart;