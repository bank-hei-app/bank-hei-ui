import { useState } from "react";
import { Notif } from "../../utils/Notif";
import {
  formatNumber,
  findAccount,
  transact,
  trim,
  capitalize,
} from "../../utils/Utils";

export function TransactPage(props) {
  const users = JSON.parse(localStorage.getItem("users"));
  const setNotif = props.setNotif;
  const notif = props.notif;
  const [accounts, setAccounts] = useState(users);
  const [selectedAccount, setSelectedAccount] = useState({ balance: 0 });
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawalDateTime, setWithdrawalDateTime] = useState("");

  const options = accounts.map((user) => {
    return (
      <option key={user.accountNumber} value={user.accountNumber}>
        {user.clientName} N:{user.accountNumber}
      </option>
    );
  });

  const displayBalance = (e) => {
    setNotif(notif);
    const selectedNumber = e.target.value;

    for (const user of accounts) {
      if (user.accountNumber === selectedNumber) {
        setSelectedAccount(user);
        break;
      }
    }
  };

  const onDeposit = (e) => {
    const amount = formatNumber(trim(e.target.value));
    setDepositAmount(amount);
  };

  const processTransfer = (e) => {
    e.preventDefault();
    const amount = trim(e.target.elements.amount.value);
    const accountNumber = e.target.elements.account.value;

    if (amount > 0 && accountNumber !== "0") {
      const totalFunds = selectedAccount.defaultSolde;
      const creditLimit = selectedAccount.credit || 0;
      const overdraftEnabled = selectedAccount.overdraftEnabled || false;

      if (totalFunds + creditLimit >= amount || overdraftEnabled) {
        transact(accountNumber, amount, props.type, props.setUsers);
        setSelectedAccount(findAccount(accountNumber));
        setAccounts(JSON.parse(localStorage.getItem("users")));
        setDepositAmount(0);
        setNotif({
          message: `${capitalize(props.page)} successful.`,
          style: "success",
        });
      } else {
        setNotif({
          message: `Insufficient funds.`,
          style: "danger",
        });
      }
    } else {
      setNotif({
        message: `${capitalize(props.page)} failed.`,
        style: "danger",
      });
    }
  };

  const handleChangeDateTime = (e) => {
    setWithdrawalDateTime(e.target.value);
  };



  const icon =
    props.page === "withdraw" ? "bx bx-down-arrow-alt" : "bx bx-up-arrow-alt";

  return (
    <section id="main-content">
      <form id="form" onSubmit={processTransfer}>
        <h1>{props.page}</h1>
        <Notif message={notif.message} style={notif.style} />
        <label>Account</label>
        <select name="account" onChange={displayBalance}>
          <option value="0">Select Account</option>
          {options}
        </select>

        <label>Current balance</label>
        <input
          type="text"
          className="right"
          value={formatNumber(selectedAccount.defaultSolde !== undefined ? formatNumber(selectedAccount.defaultSolde) : '')}
          disabled
        />

        <label>Withdrawal Date and Time</label>
        <input
          type="datetime-local"
          name="withdrawalDateTime"
          value={withdrawalDateTime}
          onChange={handleChangeDateTime}
        />

        <div className="transfer-icon">
          <i className={icon}></i>
        </div>
        <label>Amount to {props.page}</label>
        <input
          type="text"
          name="amount"
          value={depositAmount}
          onChange={onDeposit}
          autoComplete="off"
          className="right big-input"
        />

        
        <button type="submit" className="btn">
          {props.page}
        </button>
      </form>
    </section>
  );
}
