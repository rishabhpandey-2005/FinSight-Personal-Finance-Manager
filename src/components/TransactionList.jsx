import { isDarkMode } from "../utils/theme";
import { getTransactionKey } from "../utils/storage";

function TransactionList() {
  const darkMode = isDarkMode();

  const transactions =
    JSON.parse(
      localStorage.getItem(getTransactionKey())
    ) || [];

  const recentTransactions = [...transactions]
    .reverse()
    .slice(0, 5);

  return (
    <div
      className={`p-6 rounded-2xl shadow ${
        darkMode
          ? "bg-slate-800 text-white"
          : "bg-white"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">
        Recent Transactions
      </h2>

      {recentTransactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <div className="space-y-4">
          {recentTransactions.map(
            (transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <h3 className="font-semibold">
                    {transaction.title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {transaction.type}
                  </p>
                </div>

                <p
                  className={`font-bold ${
                    transaction.type ===
                    "Income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ₹{transaction.amount}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default TransactionList;