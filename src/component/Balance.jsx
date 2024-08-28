import React from "react";
import { formatCur } from "../userData/format";

const Balance = ({ balanceAccount }) => {
  const [balance, setBalance] = React.useState("");
  const [date, setDate] = React.useState("");

  const formatBalance = formatCur(
    balanceAccount.balance,
    balanceAccount.locale,
    balanceAccount.currency
  );

  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const dateFormat = new Intl.DateTimeFormat(
    balanceAccount.locale,
    options
  ).format(now);

  // Ensure `setBalance` is called in a safe place like useEffect to avoid infinite loops
  React.useEffect(() => {
    setBalance(formatBalance);
    setDate(dateFormat);
  }, [formatBalance, dateFormat]);

  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of <span className="date">{date}</span>
        </p>
      </div>
      <p className="balance__value">{balance}</p>
    </div>
  );
};

export default Balance;
