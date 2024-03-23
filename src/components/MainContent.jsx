import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Account, UpdateAccountPage } from "./account";

export function MainContent(props) {
  const [editingUser, setEditingUser] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8080/accounts")
      .then((response) => {
        setBankAccounts(response.data);
      })
      .catch((error) => {
        console.error("Error when fetching data:", error);
      });
  }, []);

  const handleEditClick = (index) => {
    const editedUser = bankAccounts[index];
    setEditingUser(editedUser);
    setIsEditing(true); 
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setIsEditing(false); 
  };

  return (
    <section id="main-content">
      {isEditing ? (
        <UpdateAccountPage
          client={editingUser}
          setUsers={setBankAccounts}
          users={bankAccounts}
          onCancelEdit={handleCancelEdit}
        />
      ) : (
        bankAccounts.map((account, index) => (
          <Account
            key={index}
            index={index}
            fullname={account.clientLastName}
            firstname={account.clientName}
            bank={account.bankName}
            accountNumber={account.accountNumber}
            balance={account.defaultSolde}
            onEditClick={() => handleEditClick(index)}
          />
        ))
      )}
    </section>
  );
}
