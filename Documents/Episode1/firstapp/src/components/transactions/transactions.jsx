import React, { useState, useEffect } from "react";
import "./Transactions.css";
import Report from "../report/report";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [budget, setBudget] = useState(1000);
  const [budgetExceeded, setBudgetExceeded] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const transactiontype = ["income", "expense"];
  const categories = ["Food","Entertainment","Shopping","Travel","Profit","Salary","Gifts","Others"];

  const subcategories = {
    Food: ["Groceries", "Restaurants"],
    Entertainment: ["Movies", "Concerts", "Games"],
    Shopping: ["Clothing", "Electronics"],
    Travel: ["Flights", "Hotels", "Transportation"],
    Profit: ["investments", "sales"],
    Salary: ["1 Job", "2 Job"],
    Gifts: ["friend", "family"],
    Others: ["others"],
  };

  // Use state to keep track of accumulated sums
  const [incomeSum, setIncomeSum] = useState(0);
  const [expenseSum, setExpenseSum] = useState(0);

  const addTransaction = () => {
    if (date && amount && account && selectedCategory && selectedSubcategory) {
      const transactionAmount = parseFloat(amount);
      if (transactionAmount > budget) {
        setBudgetExceeded(true);
      }

      const newTransaction = {
        type: selectedType,
        date,
        amount,
        account,
        category: selectedCategory,
        subcategory: selectedSubcategory,
      };
      setSelectedType("");
      setTransactions([...transactions, newTransaction]);
      setDate("");
      setAmount("");
      setAccount("");
      setSelectedCategory("");
      setSelectedSubcategory("");
    }
  };

  const updateBudget = () => {
    const newBudget = parseFloat(prompt("Enter new budget:"));
    setBudget(newBudget);
    setBudgetExceeded(false);
  };

  useEffect(() => {
    const income = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
  
    const expense = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
  
    const totalAmount = income - expense;
    setIncomeSum(income);
    setExpenseSum(expense);
  
    if (totalAmount > budget) {
      setBudgetExceeded(true);
    } else {
      setBudgetExceeded(false);
    }
  }, [transactions, budget]);
  

  return (
    <div className="App">
      <div className="budget">
        <h2>Budget:</h2>
        <p className="budget-exceeds">
          {budgetExceeded ? "Budget Exceeded! " : ""}${budget.toLocaleString()}
        </p>
        <button onClick={updateBudget} className="budget-button">
          Update Budget
        </button>
      </div>
      <div className="budget-cards">
        <div className="income">
          <h1 className="budget-title">Income</h1>
          <span className="budget-amount">${incomeSum.toFixed(2)}</span>
        </div>
        <div className="expense">
          <h1 className="budget-title">Expenses</h1>
          <span className="budget-amount">${expenseSum.toFixed(2)}</span>
        </div>
        <div className="total">
          <h1 className="total-title">
            Total Amount 
          </h1>
            <span className="total-amount">$
            {incomeSum - expenseSum}
              </span>
        </div>
      </div>

      <main className="App-main">
        <h3 className="transaction-select">Type of Transaction:</h3>
        <div className="selectType">
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
            }}
          >
            <option value="">Select Type</option>
            {transactiontype.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <h3 className="transaction-label">Transaction:</h3>
        <div className="transaction-form">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">Select Subcategory</option>
            {selectedCategory && subcategories[selectedCategory]
              ? subcategories[selectedCategory].map((subcategory, index) => (
                  <option key={index} value={subcategory}>
                    {subcategory}
                  </option>
                ))
              : null}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={addTransaction}>Add Transaction</button>
        </div>

        <div className="transaction-list">
          <div className="report-section">
            <Report
              transactions={transactions}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="transaction-form">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <table>
            <thead>
              <tr>
              <th>Transaction Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Account</th>
                <th>Category</th>
                <th>Subcategory</th>
                
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.type}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.account}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.subcategory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Transactions;
