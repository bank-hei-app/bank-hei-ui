import React, { useState } from "react";
import Axios from "axios";
import { Notif } from "../../utils/Notif";

export function UpdateAccountPage(props) {
  const [notif, setNotif] = useState({
    message: "Update a client account.",
    style: "left",
  });
  const [clientName, setClientName] = useState(props.client.clientName);
  const [clientLastName, setClientLastName] = useState(
    props.client.clientLastName
  );
  const [dateOfBirth, setDateOfBirth] = useState(props.client.dateOfBirth);
  const [netSalaryPerMonth, setNetSalaryPerMonth] = useState(
    props.client.netSalaryPerMonth
  );
  const [initialBalance, setInitialBalance] = useState(
    props.client.defaultSolde
  );
  const [bankName, setBankName] = useState(props.client.bankName);

  const handleUpdateAccount = async (event) => {
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
      netSalaryPerMonth: user.netsalary.value,
      accountNumber: props.client.accountNumber,
      accountId: props.client.accountId,
      bankName: user.bank.value,
      defaultSolde: initialBalance,
    };

    try {
      const response = await Axios.put(
        `http://127.0.0.1:8080/accounts/${props.client.accountId}`,
        account
      );
      setNotif({ message: "Successfully updated.", style: "success" });

      props.setUsers(prevUsers =>
        prevUsers.map(user =>
          user.accountId === props.client.accountId ? response.data : user
        )
      );
    } catch (error) {
      console.error("Error while updating account:", error);
      setNotif({ message: "Error while updating.", style: "danger" });
    }
  };

  const handleCancel = () => {
    props.onCancelEdit(); 
  };

  return (
    <section id="main-content">
      <form id="form" onSubmit={handleUpdateAccount}>
        <h1>Update Account</h1>
        <Notif message={notif.message} style={notif.style} />
        <label htmlFor="fullname">Full name</label>
        <input
          id="fullname"
          type="text"
          autoComplete="off"
          name="fullname"
          defaultValue={clientName}
        />
        <label htmlFor="firstname">First name</label>
        <input
          id="firstname"
          type="text"
          autoComplete="off"
          name="firstname"
          defaultValue={clientLastName}
        />
        <label htmlFor="dob">Date of Birth</label>
        <input id="dob" type="date" name="dob" defaultValue={dateOfBirth} />
        <hr />
        <label htmlFor="account-number">Account # (Randomly Generated)</label>
        <input
          id="account-number"
          name="accountNumber"
          className="right"
          value={props.client.accountNumber}
          type="text"
          disabled
        />
        <label htmlFor="balance">Initial balance</label>
        <input
          id="balance"
          type="text"
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
          name="initialBalance"
          className="right"
        />
        <label htmlFor="netsalary">Monthly Net Salary</label>
        <input
          id="netsalary"
          type="text"
          name="netsalary"
          autoComplete="off"
          defaultValue={netSalaryPerMonth}
          onChange={(e) => setNetSalaryPerMonth(e.target.value)}
        />
        <label htmlFor="bank">Bank</label>
        <select
          name="bank"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        >
          <option value="BMOI">BMOI</option>
          <option value="BNI">BNI</option>
          <option value="y-bank">y-bank</option>
          <option value="BOA">BOA</option>
        </select>
        <hr />
        <label htmlFor="accountId">Account ID</label>
        <input
          id="accountId"
          type="text"
          name="accountId"
          autoComplete="off"
          defaultValue={props.client.accountId}
          readOnly
        />
        <input value="Update Account" className="btn" type="submit" />
        <button onClick={handleCancel}>Cancel</button> 
      </form>
    </section>
  );
}
