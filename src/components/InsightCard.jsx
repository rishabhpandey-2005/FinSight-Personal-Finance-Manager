import { useEffect, useState } from "react";
import { isDarkMode } from "../utils/theme";
import {
  getBudgetKey,
  getTransactionKey,
} from "../utils/storage";

function InsightCard() {
  const darkMode = isDarkMode();

  const [insights, setInsights] =
    useState([]);

  useEffect(() => {
    const transactions =
      JSON.parse(
        localStorage.getItem(
          getTransactionKey()
        )
      ) || [];

    const budget =
      Number(
        localStorage.getItem(
          getBudgetKey()
        )
      ) || 0;

    const income = transactions
      .filter(
        (transaction) =>
          transaction.type === "Income"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

    const expense = transactions
      .filter(
        (transaction) =>
          transaction.type === "Expense"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

    const savings = income - expense;

    const expenseCategories = {};

    transactions
      .filter(
        (transaction) =>
          transaction.type === "Expense"
      )
      .forEach((transaction) => {
        expenseCategories[
          transaction.category
        ] =
          (expenseCategories[
            transaction.category
          ] || 0) +
          transaction.amount;
      });

    const generatedInsights = [];

    if (income > 0) {
      const savingsRate =
        (savings / income) * 100;

      if (savingsRate >= 40) {
        generatedInsights.push(
          "💰 Excellent! You are saving more than 40% of your income."
        );
      } else if (savingsRate >= 20) {
        generatedInsights.push(
          "👍 Good job! You have a healthy savings rate."
        );
      } else {
        generatedInsights.push(
          "⚠️ Your savings are low. Try reducing unnecessary expenses."
        );
      }
    }

    if (
      budget > 0 &&
      expense > budget
    ) {
      generatedInsights.push(
        `🚨 You exceeded your budget by ₹${
          expense - budget
        }.`
      );
    }

    const highestCategory =
      Object.entries(
        expenseCategories
      ).sort(
        (a, b) => b[1] - a[1]
      )[0];

    if (highestCategory) {
      generatedInsights.push(
        `📈 ${highestCategory[0]} is your highest spending category at ₹${highestCategory[1]}.`
      );
    }

    if (
      expenseCategories.Shopping &&
      income > 0
    ) {
      const shoppingPercentage =
        (expenseCategories.Shopping /
          income) *
        100;

      if (
        shoppingPercentage >= 30
      ) {
        generatedInsights.push(
          "🛍️ Shopping expenses are high. Consider reducing discretionary spending."
        );
      }
    }

    generatedInsights.push(
      `💵 Your current savings are ₹${savings}.`
    );

    setInsights(generatedInsights);
  }, []);

  return (
    <div
      className={`p-6 rounded-2xl shadow ${
        darkMode
          ? "bg-slate-800 text-white"
          : "bg-white"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">
        Smart Insights 💡
      </h2>

      {insights.length === 0 ? (
        <p>
          Add some transactions to
          generate insights.
        </p>
      ) : (
        <ul className="space-y-3">
          {insights.map(
            (
              insight,
              index
            ) => (
              <li
                key={index}
                className="border-b border-slate-600 pb-2"
              >
                {insight}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default InsightCard;