import jsPDF from "jspdf";
import { getTransactionKey } from "./storage";

export const exportPDF = () => {
  const doc = new jsPDF();

  const transactions =
    JSON.parse(
      localStorage.getItem(getTransactionKey())
    ) || [];

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  doc.setFontSize(22);
  doc.text("Finance Report", 20, 20);

  doc.setFontSize(14);
  doc.text(`Total Income: Rs. ${income}`, 20, 40);
  doc.text(`Total Expense: Rs. ${expense}`, 20, 50);
  doc.text(`Balance: Rs. ${balance}`, 20, 60);

  doc.text("Transactions", 20, 80);

  let y = 95;

  transactions.forEach((transaction) => {
    doc.text(
      `${transaction.title} | ${transaction.type} | Rs. ${transaction.amount}`,
      20,
      y
    );

    y += 10;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("Finance_Report.pdf");
};