import React from "react";
import { formatCur } from "../userData/format";
import { formatMovementDate } from "../userData/format";

const Movements = ({ movAccount, isSorted }) => {
  const sortMovements = isSorted
    ? [...movAccount.movements].sort((a, b) => a - b) // Create a copy before sorting
    : [...movAccount.movements]; // Create a copy for unsorted state

  return (
    <div className="movements">
      {sortMovements.map((mov, i) => {
        const type = mov > 0 ? "deposit" : "withdrawal";

        const date = new Date(movAccount.movementsDates[i]);
        const displayDate = formatMovementDate(date, movAccount.locale);

        const formattedMov = formatCur(
          Math.abs(mov),
          movAccount.locale,
          movAccount.currency
        );

        return (
          <div className="movements__row" key={i}>
            <div className={`movements__type movements__type--${type}`}>
              {i + 1} {type}
            </div>
            <div className="movements__date">{displayDate}</div>
            <div className="movements__value">{formattedMov}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Movements;
