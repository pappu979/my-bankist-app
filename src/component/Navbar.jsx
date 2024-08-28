import React from "react";
import logoImg from "../image/logo.png";

const Navbar = ({
  handleLogin,
  userName,
  setUserName,
  setUserPin,
  userPin,
  labelMessage,
}) => {
  return (
    <nav>
      <p className="welcome">{labelMessage}</p>
      <img src={logoImg} alt="Logo" className="logo" />
      <form className="login">
        <input
          type="text"
          placeholder="user"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="login__input login__input--user"
        />
        <input
          type="text"
          placeholder="PIN"
          value={userPin}
          onChange={(e) => setUserPin(e.target.value)}
          className="login__input login__input--pin"
        />
        <button onClick={handleLogin} className="login__btn">
          &rarr;
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
