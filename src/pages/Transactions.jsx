import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { isDarkMode } from "../utils/theme";
import { getTransactionKey } from "../utils/storage";

function Transactions() {
  const darkMode = isDarkMode();

  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("Food");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [editId, setEditId] = useState(null);

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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const updatedTransactions = transactions.map(
        (transaction) =>
          transaction.id === editId
            ? {
                ...transaction,
                title,
                amount: Number(amount),
                type,
                category,
              }
            : transaction
      );

      setTransactions(updatedTransactions);

      localStorage.setItem(
        getTransactionKey(),
        JSON.stringify(updatedTransactions)
      );

      setEditId(null);
    } else {
      const newTransaction = {
        id: Date.now(),
        title,
        amount: Number(amount),
        type,
        category,
      };

      const updatedTransactions = [
        ...transactions,
        newTransaction,
      ];

      setTransactions(updatedTransactions);

      localStorage.setItem(
        getTransactionKey(),
        JSON.stringify(updatedTransactions)
      );
    }

    setTitle("");
    setAmount("");
    setType("Expense");
    setCategory("Food");
  };

  const deleteTransaction = (id) => {
    const updatedTransactions =
      transactions.filter(
        (transaction) =>
          transaction.id !== id
      );

    setTransactions(updatedTransactions);

    localStorage.setItem(
      getTransactionKey(),
      JSON.stringify(updatedTransactions)
    );
  };

  const editTransaction = (transaction) => {
    setTitle(transaction.title);
    setAmount(transaction.amount);
    setType(transaction.type);
    setCategory(
      transaction.category || "Food"
    );
    setEditId(transaction.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredTransactions =
    transactions.filter((transaction) => {
      const matchesSearch =
        transaction.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filterType === "All" ||
        transaction.type === filterType;

      return (
        matchesSearch && matchesFilter
      );
    });

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
          <h1 className="text-3xl font-bold mb-8">
            Transactions
          </h1>

          <div
            className={`p-6 rounded-2xl shadow mb-8 ${
              darkMode
                ? "bg-slate-800 text-white"
                : "bg-white"
            }`}
          >
            <h2 className="text-xl font-bold mb-5">
              {editId
                ? "Edit Transaction"
                : "Add Transaction"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                placeholder="Transaction Name"
                className={`border p-3 rounded-lg ${
                  darkMode
                    ? "bg-slate-700 text-white border-slate-600"
                    : "bg-white"
                }`}
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
              />

              <input
                type="number"
                placeholder="Amount"
                className={`border p-3 rounded-lg ${
                  darkMode
                    ? "bg-slate-700 text-white border-slate-600"
                    : "bg-white"
                }`}
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                required
              />

              <select
                className={`border p-3 rounded-lg ${
                  darkMode
                    ? "bg-slate-700 text-white border-slate-600"
                    : "bg-white"
                }`}
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
              >
                <option>Expense</option>
                <option>Income</option>
              </select>

              {type === "Expense" ? (
                <select
                  className={`border p-3 rounded-lg ${
                    darkMode
                      ? "bg-slate-700 text-white border-slate-600"
                      : "bg-white"
                  }`}
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                >
                  <option>Food</option>
                  <option>Shopping</option>
                  <option>Travel</option>
                  <option>Bills</option>
                  <option>
                    Entertainment
                  </option>
                  <option>Health</option>
                  <option>
                    Education
                  </option>
                  <option>Others</option>
                </select>
              ) : (
                <input
                  type="text"
                  value="Income"
                  disabled
                  className={`border p-3 rounded-lg ${
                    darkMode
                      ? "bg-slate-700 text-white border-slate-600"
                      : "bg-gray-100"
                  }`}
                />
              )}

              <button className="bg-blue-600 text-white p-3 rounded-lg md:col-span-2 hover:bg-blue-700 transition">
                {editId
                  ? "Update Transaction"
                  : "Add Transaction"}
              </button>
            </form>
          </div>

          <div
            className={`p-6 rounded-2xl shadow mb-8 ${
              darkMode
                ? "bg-slate-800 text-white"
                : "bg-white"
            }`}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Search Transaction"
                className={`border p-3 rounded-lg ${
                  darkMode
                    ? "bg-slate-700 text-white border-slate-600"
                    : "bg-white"
                }`}
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <select
                className={`border p-3 rounded-lg ${
                  darkMode
                    ? "bg-slate-700 text-white border-slate-600"
                    : "bg-white"
                }`}
                value={filterType}
                onChange={(e) =>
                  setFilterType(
                    e.target.value
                  )
                }
              >
                <option>All</option>
                <option>Income</option>
                <option>Expense</option>
              </select>
            </div>
          </div>

          <div
            className={`rounded-2xl shadow overflow-hidden ${
              darkMode
                ? "bg-slate-800 text-white"
                : "bg-white"
            }`}
          >
            <table className="w-full">
              <thead
                className={
                  darkMode
                    ? "bg-slate-700"
                    : "bg-gray-100"
                }
              >
                <tr>
                  <th className="p-4 text-left">
                    Title
                  </th>
                  <th className="p-4 text-left">
                    Category
                  </th>
                  <th className="p-4 text-left">
                    Type
                  </th>
                  <th className="p-4 text-left">
                    Amount
                  </th>
                  <th className="p-4 text-left">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map(
                  (transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-slate-600"
                    >
                      <td className="p-4">
                        {transaction.title}
                      </td>

                      <td className="p-4">
                        {transaction.category ||
                          "-"}
                      </td>

                      <td className="p-4">
                        {transaction.type}
                      </td>

                      <td
                        className={`p-4 font-semibold ${
                          transaction.type ===
                          "Income"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        ₹{transaction.amount}
                      </td>

                      <td className="p-4 space-x-2">
                        <button
                          onClick={() =>
                            editTransaction(
                              transaction
                            )
                          }
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteTransaction(
                              transaction.id
                            )
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;