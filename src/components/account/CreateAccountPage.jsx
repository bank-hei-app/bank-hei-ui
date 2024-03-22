import { useState } from "react";
import Axios from "axios";
import { Notif } from "../../utils/Notif";
import { formatNumber, trim } from "../../utils/Utils";

export function CreateAccountPage(props) {
  const createRandomAccount = () => {
    return uuidv4();
  };
  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };
  const [notif, setNotif] = useState({
    message: "Create a new client account.",
    style: "left",
  });
  const [initialBalance, setInitialBalance] = useState(0);
  const [initialAccountNumber, setInitialAccountNumber] = useState(
    createRandomAccount()
  );
  const handleCreateAccount = async (event) => {
    event.preventDefault();
    const user = event.target.elements;
    const dob = new Date(user.dob.value);
    const today = new Date();
    const ageDiff = today.getFullYear() - dob.getFullYear();
    if (ageDiff < 21) {
      setNotif({
        message: "Age must be at least 21 years old.",
        style: "danger",
      });
      return false;
    }
    const account = {
      clientName: user.fullname.value,
      clientLastName: user.firstname.value,
      dateOfBirth: user.dob.value,
      netSalaryPerMonth: trim(user.netsalary.value),
      accountNumber: createRandomAccount(),
      accountId: trim(user.accountId.value), // Ajout du champ accountId
      bankName: user.bank.value,
      defaultSolde: initialBalance,
    };
    try {
      const response = await Axios.post(
        "http://127.0.0.1:8080/accounts/create",
        account
      );
      setNotif({ message: "Successfully saved.", style: "success" });
      user.fullname.value = "";
      user.firstname.value = "";
      user.dob.value = "";
      user.initialBalance.value = formatNumber(initialBalance);
      user.netsalary.value = "";
      props.setUsers([...props.users, response.data]);
      localStorage.setItem(
        "users",
        JSON.stringify([...props.users, response.data])
      );
      setInitialAccountNumber(createRandomAccount());
    } catch (error) {
      console.error("Error while creating account:", error);
      setNotif({ message: "Error while saving.", style: "danger" });
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
          type="text"
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
        {/* Ajout du champ accountId */}
        <label htmlFor="accountId">Account ID</label>
        <input id="accountId" type="text" name="accountId" autoComplete="off" value={"5" + uuidv4().substring(1)} />
        <input value="Create Account" className="btn" type="submit" />
      </form>
    </section>
  );
}
