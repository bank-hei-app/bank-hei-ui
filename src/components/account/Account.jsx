import { ActionButtons } from "../ActionButtons";
import { formatNumber } from "../../utils/Utils";

export function Account(props) {
  const {type, accountNumber, balance, fullname, editingUser, setEditingUser, index,  setEditModal} = props;
    
  const action = <ActionButtons
    index={index}
    editingUser={editingUser}
    setEditingUser={setEditingUser}
    setEditModal={setEditModal}
    
  />;
  
  return (
    <div className="account">
        <div className="details">
            <AccountHolder fullname={fullname} />
            <AccountType type={type} />
            <AccountNumber accountNumber={accountNumber} />
            {action}
        </div>
        <AccountBalance balance={formatNumber(balance)} />
    </div>
  )
}

export const AccountHolder = (props) => {
  return (
    <h1>{props.fullname}</h1>
  )
}


export const AccountType = (props) => {
  return (
    <h3>{props.type}</h3>
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

