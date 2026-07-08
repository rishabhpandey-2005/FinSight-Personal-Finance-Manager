import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";
import InsightCard from "../components/InsightCard";
import BudgetCard from "../components/BudgetCard";
import { exportPDF } from "../utils/pdfExport";
import { isDarkMode } from "../utils/theme";
import { getTransactionKey } from "../utils/storage";

import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaPiggyBank,
} from "react-icons/fa";

function Dashboard() {
  const darkMode = isDarkMode();
  const location = useLocation();

  const [transactions, setTransactions] = useState([]);

  const loadTransactions = () => {
    const data =
      JSON.parse(
        localStorage.getItem(
          getTransactionKey()
        )
      ) || [];

    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, [location]);

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

  const balance = income - expense;

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

        <div className="p-8 pt-20 lg:pt-8">
          <div
            className="bg-gradient-to-r from-blue-600
            to-purple-600 rounded-3xl p-8
            text-white mb-8 flex justify-between items-center"
          >
            <div>
              <h1 className="text-4xl font-bold">
                Welcome Back 👋
              </h1>

              <p className="mt-3 text-lg">
                Track your finances smarter.
              </p>
            </div>

            <button
              onClick={exportPDF}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Export PDF
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <SummaryCard
              title="Balance"
              amount={balance}
              color="text-blue-600"
              icon={<FaWallet />}
            />

            <SummaryCard
              title="Income"
              amount={income}
              color="text-green-600"
              icon={<FaArrowUp />}
            />

            <SummaryCard
              title="Expense"
              amount={expense}
              color="text-red-600"
              icon={<FaArrowDown />}
            />

            <SummaryCard
              title="Savings"
              amount={balance}
              color="text-purple-600"
              icon={<FaPiggyBank />}
            />
          </div>

          <div className="mb-8">
            <BudgetCard />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <TransactionList />
            <ExpenseChart />
          </div>

          <div className="mt-8">
            <InsightCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;