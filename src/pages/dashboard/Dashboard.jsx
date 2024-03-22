import React, { useState, useEffect } from "react";
import axios from "axios"; 

import { Sidebar } from "../../components/navbar";
import { MainContent } from "../../components/MainContent";
import { CreateAccountPage } from "../../components/account";
import { TransactPage, TransferPage } from "../../components/transaction";

export const Dashboard = (props) => {
  const [page, setPage] = useState("home");
  const [users, setUsers] = useState(props.users);
  const [notif, setNotif] = useState({ message: "", style: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [newAccount, setNewAccount] = useState(null);

  const changePageHandler = (pageName) => {
    setPage(pageName);

    if (pageName === "withdraw") {
      setNotif({
        message: "Select an account to withdraw money from.",
        style: "left",
      });
    }

    if (pageName === "deposit") {
      setNotif({
        message: "Select an account to deposit money.",
        style: "left",
      });
    }
  };

  useEffect(() => {
    if (deleteUser !== null) {
      const filteredUsers = users.filter((user, index) => {
        return index !== deleteUser;
      });

      setUsers(filteredUsers);
      setDeleteUser(null);
      // save
      localStorage.setItem("users", JSON.stringify(filteredUsers));
    }
  }, [deleteUser]);

  useEffect(() => {
    if (isUpdate) {
      const filteredUsers = users.map((user, index) => {
        if (user.number === newAccount.number) {
          user = { ...user, ...newAccount };
        }
        return user;
      });

      setUsers(filteredUsers);
      setIsUpdate(false);
    
      localStorage.setItem("users", JSON.stringify(filteredUsers));
    }
  }, [isUpdate]);

 
  const updateAccount = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8080/accounts/${newAccount.accountId}`,
        newAccount
      );
      console.log("Account updated successfully:", response.data);
      
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  let modal = null;
  if (editingUser !== null && editModal) {
    const user = users[editingUser];
   
    modal = (
      <AccountEditModal
        clientName={user.fullname}
        clientLastName={user.firstname}
        dateOfBirth={user.dob}
        netSalaryPerMonth={user.netsalary}
        accountNumber={user.accountNumber}
        accountId={user.accountId}
        bankName={user.bank}
        balance={user.balance}
        setEditModal={setEditModal}
        setIsUpdate={setIsUpdate}
        setNewAccount={setNewAccount}
        updateAccount={updateAccount}
      />
    );
  }

  if (page === "home") {
    return (
      <main>
        <Sidebar
          changePage={changePageHandler}
          page={page}
          logoutHandler={props.logoutHandler}
        />
        <MainContent
          users={users}
          editingUser={editingUser}
          setEditModal={setEditModal}
          setEditingUser={setEditingUser}
          setDeleteUser={setDeleteUser}
        />
        {modal}
      </main>
    );
  }

  if (page === "create-account") {
    return (
      <main>
        <Sidebar
          changePage={changePageHandler}
          page={page}
          logoutHandler={props.logoutHandler}
        />
        <CreateAccountPage users={users} setUsers={setUsers} />
      </main>
    );
  }

  if (page === "transfer") {
    return (
      <main>
        <Sidebar
          changePage={changePageHandler}
          page={page}
          logoutHandler={props.logoutHandler}
        />
        <TransferPage users={users} setUsers={setUsers} />
      </main>
    );
  }

  if (page === "deposit") {
    return (
      <main>
        <Sidebar
          changePage={changePageHandler}
          page={page}
          logoutHandler={props.logoutHandler}
        />
        <TransactPage
          users={users}
          setUsers={setUsers}
          notif={notif}
          setNotif={setNotif}
          type="add"
          page={page}
        />
      </main>
    );
  }

  if (page === "withdraw") {
    return (
      <main>
        <Sidebar
          changePage={changePageHandler}
          page={page}
          logoutHandler={props.logoutHandler}
        />
        <TransactPage
          users={users}
          setUsers={setUsers}
          notif={notif}
          setNotif={setNotif}
          type="subtract"
          page={page}
        />
      </main>
    );
  }
};

const AccountEditModal = (props) => {
  const {
    clientName,
    clientLastName,
    dateOfBirth,
    netSalaryPerMonth,
    accountId,
    bankName,
    accountNumber,
    balance,
    setEditModal,
    setIsUpdate,
    setNewAccount,
    updateAccount,
  } = props;
  const [account, setAccount] = useState({
    fullname: clientName,
    lastname: clientLastName,
    dob: dateOfBirth,
    netsalary: netSalaryPerMonth,
    accountId: accountId,
    bank: bankName,
    number: accountNumber,
    balance: balance,
  });

  const closeModal = () => {
    setEditModal(false);
  };
  
 
  const handleUpdateAccount = (e) => {
    e.preventDefault();
    console.log("Update");
    setNewAccount(account);
    setIsUpdate(true);
    updateAccount(); 
    setEditModal(false);
  };

  const editAccountName = (e) => {
    const name = e.target.value;
    setAccount({ ...account, ...{ fullname: name } });
  };

  const editAccountNumber = (e) => {
    const number = e.target.value;
    setAccount({ ...account, ...{ number: number } });
  };

  const editAccountBalance = (e) => {
    const balance = e.target.value;
    setAccount({ ...account, ...{ balance: parseFloat(balance) || 0 } });
  };

  return (
    <div className="overlay">
      <div className="modal">
        <form onSubmit={handleUpdateAccount}>
          <h2 className="title">Edit Account</h2>
          <label>Account name</label>
          <input
            name="clientName"
            onChange={editAccountName}
            value={account.fullname}
            autoComplete="off"
          />

          <label>Account number</label>
          <input
            type="text"
            name="accountNumber"
            onChange={editAccountNumber}
            disabled
            value={account.number}
            autoComplete="off"
          />

          <label>Balance</label>
          <input
            type="text"
            name="balance"
            onChange={editAccountBalance}
            value={account.balance}
            autoComplete="off"
          />

          <button
            type="button"
            onClick={() => closeModal()}
            className="btn2 btn-muted"
          >
            Cancel
          </button>
          <button type="submit" className="btn2">
            Update Account
          </button>
        </form>
      </div>
    </div>
  );
};
