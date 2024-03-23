import { formatNumber } from "../../utils/Utils";
import EditIcon from "@mui/icons-material/Edit";
export function Account(props) {
  const {
    bank,
    accountNumber,
    balance,
    fullname,
    firstname,
    onEditClick
  } = props;

  return (
    <div className="account">
      <div className="details">
        <AccountHolder fullname={fullname} />
        <AccountName firstname={firstname} />
        <AccountNumber accountNumber={accountNumber} />
        <div id="actions">
          <button onClick={onEditClick}>
            <EditIcon />
            Edit
          </button>
        </div>
      </div>
      <BankName bank={bank} />
      <AccountBalance balance={formatNumber(balance)} />
    </div>
  );
}

export const AccountHolder = (props) => {
  return (
    <h1>
      {props.fullname} {props.firstname}
    </h1>
  );
};
export const AccountName = (props) => {
  return <h1>{props.firstname}</h1>;
};

export const BankName = (props) => {
  return <div>{props.bank}</div>;
};

export const AccountNumber = (props) => {
  return <div>{props.accountNumber}</div>;
};

export const AccountBalance = (props) => {
  const balance = props.balance;
  return <div className="balance">{balance}</div>;
};
