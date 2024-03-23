import React, { useState } from "react";

import { Sidebar } from "../../components/navbar";
import { MainContent } from "../../components/MainContent";
import { CreateAccountPage ,UpdateAccountPage } from "../../components/account";
import { TransactPage, TransferPage } from "../../components/transaction";

export const Dashboard = (props) => {
  const [page, setPage] = useState("home");
  const [users, setUsers] = useState(props.users);
  const [notif, setNotif] = useState({ message: "", style: "" });
  const [editingUser, setEditingUser] = useState(null);

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

 
  if (page === "home") {
    return (
      <main>
        <Sidebar changePage={changePageHandler} page={page} />
        <MainContent
          users={users}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
        
        />
      </main>
    );
  }

  if (page === "create-account") {
    return (
      <main>
        <Sidebar
          changePage={changePageHandler}
          page={page}
        />
        <CreateAccountPage users={users} setUsers={setUsers} />
      </main>
    );
  }
  if (page === "update-account") {
 
  }
  if (page === "transfer") {
    return (
      <main>
        <Sidebar
          changePage={changePageHandler}
          page={page}
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
