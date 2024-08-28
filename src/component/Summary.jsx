import React from "react";
import { formatCur } from "../userData/format";

const Summary = ({ acc, isSorted, handleSort }) => {
  const [balanceIn, setBalanceIn] = React.useState("");
  const [balanceOut, setBalanceOut] = React.useState("");
  const [balanceInterest, setBalanceInterest] = React.useState("");

  // Function to calculate the summary
  const calcDisplaySummary = React.useCallback(() => {
    // Calculate income (deposits)
    const incomes = acc.movements
      .filter((mov) => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
    const formattedIncomes = formatCur(incomes, acc.locale, acc.currency);

    // Calculate outgoing (withdrawals)
    const out = acc.movements
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    const formattedOut = formatCur(Math.abs(out), acc.locale, acc.currency);

    // Calculate interest
    const interest = acc.movements
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * acc.interestRate) / 100)
      .filter((int) => int >= 1) // Only consider interests >= 1
      .reduce((acc, int) => acc + int, 0);
    const formattedInterest = formatCur(interest, acc.locale, acc.currency);

    // Update state
    setBalanceIn(formattedIncomes);
    setBalanceOut(formattedOut);
    setBalanceInterest(formattedInterest);
  }, [acc]); // Re-run calculations if `acc` changes

  // Use useEffect to trigger calculation when component mounts or acc changes
  React.useEffect(() => {
    calcDisplaySummary();
  }, [calcDisplaySummary]);

  return (
    <div className="summary">
      <p className="summary__label">In</p>
      <p className="summary__value summary__value--in">{balanceIn}</p>

      <p className="summary__label">Out</p>
      <p className="summary__value summary__value--out">{balanceOut}</p>

      <p className="summary__label">Interest</p>
      <p className="summary__value summary__value--interest">
        {balanceInterest}
      </p>

      <button className="btn--sort" onClick={handleSort}>
        {isSorted ? "&uArr; SORT DESC" : "&dArr; SORT ASC"}
      </button>
    </div>
  );
};

export default Summary;
