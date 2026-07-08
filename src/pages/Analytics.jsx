import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { isDarkMode } from "../utils/theme";
import { getTransactionKey } from "../utils/storage";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Analytics() {
  const darkMode = isDarkMode();

  const [transactions, setTransactions] = useState([]);

  const loadTransactions = () => {
    const data =
      JSON.parse(
        localStorage.getItem(getTransactionKey())
      ) || [];

    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();

    window.addEventListener("focus", loadTransactions);

    return () => {
      window.removeEventListener(
        "focus",
        loadTransactions
      );
    };
  }, []);

  const expenses = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );

  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(
      (item) => item.name === expense.category
    );

    if (existing) {
      existing.value += expense.amount;
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
  ];

  const highestExpense =
    categoryData.length > 0
      ? categoryData.reduce((max, item) =>
          item.value > max.value ? item : max
        )
      : null;

  const totalExpense = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  
  const income = transactions
    .filter(
      (transaction) =>
        transaction.type === "Income"
    )
    .reduce(
      (sum, transaction) =>
        sum + transaction.amount,
      0
    );
  
    const financeData = [
      {
        name: "Income",
        Amount: income,
      },
      {
        name: "Expense",
        Amount: totalExpense,
      },
    ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div
        className={`flex-1 h-screen overflow-y-auto ${
          darkMode
            ? "bg-slate-900 text-white"
            : "bg-slate-100"
        }`}
      >
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Analytics Dashboard 📊
          </h1>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div
              className={`p-6 rounded-2xl shadow ${
                darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-white"
              }`}
            >
              <h3 className="text-gray-500">
                Total Transactions
              </h3>

              <p className="text-3xl font-bold mt-3">
                {transactions.length}
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl shadow ${
                darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-white"
              }`}
            >
              <h3 className="text-gray-500">
                Total Income
              </h3>

              <p className="text-3xl font-bold text-green-500 mt-3">
                ₹{income}
              </p>
            </div>            

            <div
              className={`p-6 rounded-2xl shadow ${
                darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-white"
              }`}
            >
              <h3 className="text-gray-500">
                Total Expense
              </h3>

              <p className="text-3xl font-bold text-red-500 mt-3">
                ₹{totalExpense}
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl shadow ${
                darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-white"
              }`}
            >
              <h3 className="text-gray-500">
                Highest Spending Category
              </h3>

              <p className="text-2xl font-bold text-blue-500 mt-3">
                {highestExpense
                  ? highestExpense.name
                  : "No Data"}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
  {/* Category Expense */}
  <div
    className={`p-6 rounded-2xl shadow ${
      darkMode ? "bg-slate-800" : "bg-white"
    }`}
  >
    <h2 className="text-xl font-bold mb-5">
      Category Expenses
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart data={categoryData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar
          dataKey="value"
          fill="#3B82F6"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Expense Distribution */}
  <div
    className={`p-6 rounded-2xl shadow ${
      darkMode ? "bg-slate-800" : "bg-white"
    }`}
  >
    <h2 className="text-xl font-bold mb-5">
      Expense Distribution
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <PieChart>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {categoryData.map(
            (entry, index) => (
              <Cell
                key={index}
                fill={
                  colors[
                    index %
                      colors.length
                  ]
                }
              />
            )
          )}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

{/* NEW ROW */}

<div className="grid lg:grid-cols-2 gap-8">

  {/* Income vs Expense */}

  <div
    className={`p-6 rounded-2xl shadow ${
      darkMode ? "bg-slate-800" : "bg-white"
    }`}
  >
    <h2 className="text-xl font-bold mb-5">
      Income vs Expense
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
  >
    <BarChart data={financeData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />

    <Bar
      dataKey="Amount"
      fill="#3B82F6"
      radius={[6, 6, 0, 0]}
    />
  </BarChart>
</ResponsiveContainer>
  </div>

  {/* Top Spending Categories */}

  <div
    className={`p-6 rounded-2xl shadow ${
      darkMode ? "bg-slate-800" : "bg-white"
    }`}
  >
    <h2 className="text-xl font-bold mb-5">
      Top Spending Categories
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart
        layout="vertical"
        data={[...categoryData]
          .sort((a, b) => b.value - a.value)
          .slice(0, 5)}
      >
        <XAxis type="number" />

        <YAxis
          type="category"
          dataKey="name"
          width={90}
        />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#8B5CF6"
          radius={[0, 6, 6, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>

</div>
        </div>
      </div>
    </div>
  );
}
export default Analytics;