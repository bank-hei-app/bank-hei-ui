import { useEffect, useState } from "react";
import Axios from "axios";
import { Account } from "./account";

export function MainContent(props) {
  const { editingUser, setEditingUser, setEditModal, fetchAccountId } = props;
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8080/accounts")
      .then((response) => {
        setBankAccounts(response.data);
      })
      .catch((error) => {
        console.error("Error when fetching data:", error);
      });
  }, []);

  const handleAccountClick = (accountId) => {
    fetchAccountId(accountId);
  };

  return (
    <section id="main-content">
      {bankAccounts.map((account, index) => (
        <Account
          key={index}
          index={index}
          fullname={account.clientLastName}
          firstname={account.clientName}
          bank={account.bankName}
          accountNumber={account.accountNumber}
          balance={account.defaultSolde}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          setEditModal={setEditModal}
          onClick={() => handleAccountClick(account.id)}
        />
      ))}
    </section>
  );
}
