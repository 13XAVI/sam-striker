import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import '../report/report.css';

function Report(props) {
  const jsPdfGenerator = () => {
    const { transactions, startDate, endDate } = props;
    const filteredTransactions = transactions.filter(
      (transaction) =>
        transaction.date >= startDate && transaction.date <= endDate
    );

    const doc = new jsPDF('p', 'pt');
    doc.text(20, 20, 'Transaction Report');

    const tableColumn = ['Transaction Type','Date', 'Amount', 'Account', 'Category', 'Subcategory'];
    const tableRows = [];

    filteredTransactions.forEach((transaction) => {
      const transactionData = [
        transaction.type,
        transaction.date,
        transaction.amount,
        transaction.account,
        transaction.category,
        transaction.subcategory,
      ];
      tableRows.push(transactionData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 50 });

    doc.save('MonthlyReport.pdf');
  };

  return (
    <div className='report'>
      <button onClick={jsPdfGenerator}>Generate Report</button>
    </div>
  );
}

export default Report;
