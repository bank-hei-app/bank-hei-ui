import { Logo } from "../Logo";
import HomeIcon from "@mui/icons-material/Home";
import AddCardIcon from "@mui/icons-material/AddCard";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { Icon } from "@mui/material";
export function Sidebar(props) {
  const {  changePage, page } = props;

  return (
    <section id="side-menu">
      <Logo />
      <SideMenu
        changePage={changePage}
        page={page}
        
      />
    </section>
  );
}

export function SideMenu(props) {
  const { changePage, page } = props;
  return (
    <ul>
      <SideLink
        onClickHandler={changePage}
        active={page}
        page="home"
        icon={<HomeIcon />}
        text="Home"
      />
      <SideLink
        onClickHandler={changePage}
        active={page}
        page="create-account"
        icon={<AddCardIcon />}
        text="Create Account"
      />
      <SideLink
        onClickHandler={changePage}
        active={page}
        page="transfer"
        icon={<TransferWithinAStationIcon/>}
        text="Fund Transfer"
      />
      <SideLink
        onClickHandler={changePage}
        active={page}
        page="deposit"
        icon={<AttachMoneyIcon/>}
        text="Deposit"
      />
      <SideLink
        onClickHandler={changePage}
        active={page}
        page="withdraw"
        icon={<CallReceivedIcon/>}
        text="Withdraw"
      />
    </ul>
  );
}
export function SideLink(props) {
  const { icon, text, page, active } = props;

  function clickLink(event) {
    if (page) {
      event.preventDefault();
      props.onClickHandler(page);
    } else {
      event.preventDefault();
      props.onClickHandler();
    }
  }

  return (
    <li>
      <a
        onClick={clickLink}
        className={active === page ? "active" : ""}
        href="#"
      >
        <Icon>{icon}</Icon> {text}
      </a>
    </li>
  );
}
