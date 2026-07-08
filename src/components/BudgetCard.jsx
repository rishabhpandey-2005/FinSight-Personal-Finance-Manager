import { useEffect, useState } from "react";
import { isDarkMode } from "../utils/theme";
import {
  getBudgetKey,
  getTransactionKey,
} from "../utils/storage";

function BudgetCard() {
  const darkMode = isDarkMode();

  const [budget, setBudget] = useState(
    localStorage.getItem(getBudgetKey()) || ""
  );

  const [expense, setExpense] = useState(0);

  const loadExpenses = () => {
    const transactions =
      JSON.parse(
        localStorage.getItem(getTransactionKey())
      ) || [];

    const totalExpense = transactions
      .filter(
        (transaction) => transaction.type === "Expense"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

    setExpense(totalExpense);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      getBudgetKey(),
      budget
    );

    alert("Budget Saved!");
  };

  const remaining = Number(budget || 0) - expense;

  const percentage =
    Number(budget) > 0
      ? Math.min(
          (expense / Number(budget)) * 100,
          100
        )
      : 0;

  return (
    <div
      className={`p-6 rounded-2xl shadow ${
        darkMode
          ? "bg-slate-800 text-white"
          : "bg-white"
      }`}
    >
      <h2 className="text-xl font-bold mb-5">
        Monthly Budget
      </h2>

      <input
        type="number"
        placeholder="Enter Monthly Budget"
        className={`w-full p-3 rounded-lg mb-4 border ${
          darkMode
            ? "bg-slate-700 text-white border-slate-600"
            : "bg-white"
        }`}
        value={budget}
        onChange={(e) =>
          setBudget(e.target.value)
        }
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
      >
        Save Budget
      </button>

      <div className="mt-6">
        <p className="mb-2">
          Budget: ₹{budget || 0}
        </p>

        <p className="mb-2">
          Expense: ₹{expense}
        </p>

        <p className="font-bold">
          Remaining: ₹{remaining}
        </p>

        <div className="w-full bg-gray-300 h-4 rounded-full mt-4">
          <div
            className={`h-4 rounded-full ${
              percentage >= 80
                ? "bg-red-500"
                : percentage >= 50
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${percentage}%`,
            }}
          ></div>
        </div>

        <p className="mt-3">
          {percentage.toFixed(0)}% Used
        </p>
      </div>
    </div>
  );
}

export default BudgetCard;