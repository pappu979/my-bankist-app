import React from "react";

const Operations = ({
  transferAmo,
  transferUser,
  setTransferAmo,
  setTransferUser,
  requestLoan,
  setRequestLoan,
  closeUsername,
  setCloseUsername,
  closeUserPin,
  setCloseUserPin,
  handleTransfer,
  handleLoan,
  handleClose,
}) => {
  return (
    <>
      {/* OPERATION: TRANSFERS */}
      <div className="operation operation--transfer">
        <h2>Transfer money</h2>
        <form className="form form--transfer">
          <input
            type="text"
            className="form__input form__input--to"
            value={transferUser}
            onChange={(e) => setTransferUser(e.target.value)}
          />
          <input
            type="number"
            className="form__input form__input--amount"
            value={transferAmo}
            onChange={(e) => setTransferAmo(e.target.value)}
          />
          <button
            className="form__btn form__btn--transfer"
            onClick={handleTransfer}
          >
            &rarr;
          </button>
          <label className="form__label">Transfer to</label>
          <label className="form__label">Amount</label>
        </form>
      </div>

      {/* OPERATION: LOAN */}
      <div className="operation operation--loan">
        <h2>Request loan</h2>
        <form className="form form--loan">
          <input
            type="number"
            className="form__input form__input--loan-amount"
            value={requestLoan}
            onChange={(e) => setRequestLoan(e.target.value)}
          />
          <button className="form__btn form__btn--loan" onClick={handleLoan}>
            &rarr;
          </button>
          <label className="form__label form__label--loan">Amount</label>
        </form>
      </div>

      {/* OPERATION: CLOSE */}
      <div className="operation operation--close">
        <h2>Close account</h2>
        <form className="form form--close">
          <input
            type="text"
            className="form__input form__input--user"
            value={closeUsername}
            onChange={(e) => setCloseUsername(e.target.value)}
          />
          <input
            type="password"
            className="form__input form__input--pin"
            value={closeUserPin}
            onChange={(e) => setCloseUserPin(e.target.value)}
          />
          <button className="form__btn form__btn--close" onClick={handleClose}>
            &rarr;
          </button>
          <label className="form__label">Confirm user</label>
          <label className="form__label">Confirm PIN</label>
        </form>
      </div>
    </>
  );
};

export default Operations;
