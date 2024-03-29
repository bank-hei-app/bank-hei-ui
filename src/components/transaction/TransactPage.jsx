import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Notif } from "../../utils/Notif";

export function TransactPage(props) {
  const [notif, setNotif] = useState({
    message: "Create a new transaction.",
    style: "left",
  });
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [dateOfTransaction, setDateOfTransaction] = useState("");
  const [amount, setAmount] = useState(0);
  const [balanceCategoryId, setBalanceCategoryId] = useState("");
  const [balanceCategories, setBalanceCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAccounts();
    fetchBalanceCategories();
    fetchTransactions();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await Axios.get("http://127.0.0.1:8080/accounts");
      setAccounts(response.data);
    } catch (error) {
      console.error("Error while fetching accounts:", error);
    }
  };

  const fetchBalanceCategories = async () => {
    try {
      const response = await Axios.get(
        "http://127.0.0.1:8080/balance-categories"
      );
      setBalanceCategories(response.data);
    } catch (error) {
      console.error("Error while fetching balance categories:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await Axios.get("http://127.0.0.1:8080/transaction");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error while fetching transactions:", error);
    }
  };

  const handleCreateTransaction = async (event) => {
    event.preventDefault();
    const transaction = {
      transactionId: Math.floor(Math.random() * 100) + 1,
      accountId: selectedAccountId,
      dateOfTransaction: dateOfTransaction,
      amount: amount,
      balanceTypeId: 1,
      balanceCategoryId: balanceCategoryId,
    };

    try {
      const response = await Axios.post(
        "http://127.0.0.1:8080/transaction/addTransaction",
        transaction
      );
      setNotif({
        message: "Transaction created successfully.",
        style: "success",
      });

      setSelectedAccountId("");
      setDateOfTransaction("");
      setAmount(0);
      fetchTransactions(); 
      setShowForm(false); 
    } catch (error) {
      console.error("Error while creating transaction:", error);
      setNotif({
        message: "Error while creating transaction.",
        style: "danger",
      });
    }
  };

  return (
    <section id="main-content">
      <button onClick={() => setShowForm(true)} className="btn" id="withdraw">
        WITHDRAW
      </button>
      {showForm ? (
        <div>
          <button onClick={() => setShowForm(false)}>Cancel</button>
          <form id="form" onSubmit={handleCreateTransaction}>
            <h1>WITHDRAW</h1>
            <Notif message={notif.message} style={notif.style} />

            <label htmlFor="accountId">Select Account</label>
            <select
              id="accountId"
              name="accountId"
              value={selectedAccountId}
              onChange={(event) => setSelectedAccountId(event.target.value)}
            >
              <option value="">Select an account...</option>
              {accounts.map((account) => (
                <option key={account.accountId} value={account.accountId}>
                  {account.accountId} - {account.clientName}
                </option>
              ))}
            </select>

            <label htmlFor="dateOfTransaction">Date of Transaction</label>
            <input
              id="dateOfTransaction"
              type="date"
              name="dateOfTransaction"
              value={dateOfTransaction}
              onChange={(event) => setDateOfTransaction(event.target.value)}
            />

            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              name="amount"
              value={amount}
              onChange={(event) => setAmount(parseFloat(event.target.value))}
            />

            <label htmlFor="balanceCategoryId">Balance Category</label>
            <select
              id="balanceCategoryId"
              name="balanceCategoryId"
              value={balanceCategoryId}
              onChange={(event) => setBalanceCategoryId(event.target.value)}
            >
              <option value="">Select a balance category...</option>
              {balanceCategories.map((category) => (
                <option
                  key={category.balanceCategoryId}
                  value={category.balanceCategoryId}
                >
                  {category.balanceCategoryName}
                </option>
              ))}
            </select>

            <input value="WITHDRAW" className="btn" type="submit" />
          </form>
        </div>
      ) : (
        <div>
          <h2>All Transactions</h2>
          <table className="table">
            <thead>
              <tr>
                <th className="th">Transaction ID</th>
                <th className="th">Account ID</th>
                <th className="th">Date</th>
                <th className="th">Amount</th>
                <th className="th">Balance Category</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {transactions.map((transaction) => (
                <tr key={transaction.transactionId} className="tr">
                  <td>{transaction.transactionId}</td>
                  <td>{transaction.accountId}</td>
                  <td>{transaction.dateOfTransaction}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.balanceCategoryId}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      )}
    </section>
  );
}
