import { useState } from "react";
import { Notif } from "../../utils/Notif";
import { formatNumber, trim } from "../../utils/Utils";

export function CreateAccountPage(props) {
  const createRandomAccount = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  };

  const [notif, setNotif] = useState({
    message: "Create a new client account.",
    style: "left",
  });
  const [initialBalance, setInitialBalance] = useState(0);
  const [initialAccountNumber, setInitialAccountNumber] = useState(
    createRandomAccount()
  );

  const createNewAccount = (user) => {
    const emptyInputs = Object.values(user).filter((input) => {
      return input === "";
    });

    const localUsers = props.users;

    const dob = new Date(user.dob);
    const today = new Date();
    const ageDiff = today.getFullYear() - dob.getFullYear();
    if (ageDiff < 21) {
      setNotif({
        message: "Age must be at least 21 years old.",
        style: "danger",
      });
      return false;
    }

    if (emptyInputs.length > 0) {
      setNotif({ message: "All fields are required.", style: "danger" });
      return false;
    } else {
      if (isNaN(user.netsalary) || user.netsalary <= 0) {
        setNotif({ message: "Invalid monthly net salary.", style: "danger" });
        return false;
      }

      setNotif("");

      localUsers.unshift(user);
      props.setUsers(localUsers);
      localStorage.setItem("users", JSON.stringify(localUsers));

      setInitialAccountNumber(createRandomAccount());
      setInitialBalance(0);

      setNotif({ message: "Successfully saved.", style: "success" });
      return true;
    }
  };

  const handleCreateAccount = (event) => {
    event.preventDefault();
    const user = event.target.elements;

    const account = {
      fullname: user.fullname.value,
      firstname: user.firstname.value,
      dob: user.dob.value,
      number: user.accountNumber.value,
      bank: user.bank.value,
      balance: trim(user.initialBalance.value),
      netsalary: trim(user.netsalary.value),
      transactions: [],
    };

    const isSaved = createNewAccount(account);
    if (isSaved) {
      user.fullname.value = "";
      user.firstname.value = "";
      user.dob.value = "";
      user.accountNumber.value = initialAccountNumber;
      user.initialBalance.value = formatNumber(initialBalance);
      user.netsalary.value = "";
    }
  };

  const onInitialBalance = (event) => {
    const amount = trim(event.target.value) || 0;
    setInitialBalance(amount);
  };

  return (
    <section id="main-content">
      <form id="form" onSubmit={handleCreateAccount}>
        <h1>Create Account</h1>
        <Notif message={notif.message} style={notif.style} />
        <label htmlFor="fullname">Full name</label>
        <input id="fullname" type="text" autoComplete="off" name="name" />
        <label htmlFor="firstname">First name</label>
        <input id="firstname" type="text" autoComplete="off" name="firstname" />
        <label htmlFor="dob">Date of Birth</label>
        <input id="dob" type="date" name="dob" />
        <hr />
        <label htmlFor="account-number">Account # (Randomly Generated)</label>
        <input
          id="account-number"
          name="accountNumber"
          className="right"
          value={initialAccountNumber}
          type="number"
          disabled
        />

        <label htmlFor="balance">Initial balance</label>
        <input
          id="balance"
          type="text"
          value={formatNumber(initialBalance)}
          onChange={onInitialBalance}
          name="initialBalance"
          className="right"
        />

        <label htmlFor="netsalary">Monthly Net Salary</label>
        <input id="netsalary" type="text" name="netsalary" autoComplete="off" />

        <label htmlFor="bank">Bank</label>
        <select name="bank">
          <option value="BMOI">BMOI</option>
          <option value="BNI">BNI</option>
          <option value="y-bank">y-bank</option>
          <option value="BOA">BOA</option>
        </select>
        <hr />

        <input value="Create Account" className="btn" type="submit" />
      </form>
    </section>
  );
}
