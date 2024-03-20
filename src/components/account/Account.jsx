import { ActionButtons } from "../ActionButtons";
import { formatNumber } from "../../utils/Utils";

export function Account(props) {
  const { bank,accountNumber, balance, fullname, firstname,editingUser, setEditingUser, index,  setEditModal} = props;
    
  const action = <ActionButtons
    index={index}
    editingUser={editingUser}
    setEditingUser={setEditingUser}
    setEditModal={setEditModal}
    
  />;
  
  return (
    <div className="account">
        <div className="details">
            <AccountHolder fullname={fullname}  />
            <AccountName firstname={firstname} />
            <AccountNumber accountNumber={accountNumber} />
            {action}
        </div>
            <BankName bank={bank} />
        <AccountBalance balance={formatNumber(balance)} />
    </div>
  )
}

export const AccountHolder = (props) => {
  return (
    <h1>{props.fullname} {props.firstname}</h1>
  )
}
export const AccountName = (props) => {
  return (
    <h1>{props.firstname}</h1>
  )
}


export const BankName = (props) => {
  return (
    <div>{props.bank}</div>
  )
}


export const AccountNumber = (props) => {
  return (
    <div>{props.accountNumber}</div>
  )
}


export const AccountBalance = (props) => {
  const balance = props.balance;
  return (
    <div className="balance">{balance}</div>
  )
}

