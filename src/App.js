import React from 'react';
import Navbar from './component/Navbar';
import Balance from './component/Balance';
import Movements from './component/Movements';
import Summary from './component/Summary';
import Operations from './component/Operations';
import LogoutTimer from './component/LogoutTimer';
import './App.css';
import { accounts } from './userData/account';
import { formatTime } from './userData/timer';
import { calcBalance } from './userData/calcBalance';
import { createUsernames } from './userData/createUser';


function App() {
  const [currentAccont, setCurrentAccount] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const [userName, setUserName] = React.useState('');
  const [userPin, setUserPin] = React.useState('');
  const [transferUserName, setTransferUserName] = React.useState('');
  const [transferAmount, setTransferAmount] = React.useState('');
  const [userRequestLoan, setUserRequestLoan] = React.useState('');
  const [closeUserAcc, setCloseUserAcc] = React.useState('');
  const [closeUserAccPin, setCloseUserAccPin] = React.useState('');
  const [isSorted, setIsSorted] = React.useState(false);
  const [labelMessage, setLabelMessage] = React.useState('Log in to get started');


  React.useEffect(() => {
    if (timer) {
      const interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 1) {
            setIsLogin(false)
            setLabelMessage('Log in to get started');
            setCurrentAccount(null)
            clearInterval(interval)
          }
          return prevTime - 1;
        })
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);


  // Create UserName and Update accounts..
  createUsernames(accounts);

  let createAccount;

  // Handle Login button
  const handleLoginBtn = (e) => {
    e.preventDefault();
    createAccount = accounts.find(acc => acc.username === userName.toLowerCase());

    if (createAccount && createAccount.pin === parseInt(userPin)) {
      // Update Login Message
      setLabelMessage(`Welcome back, ${createAccount.owner.split(" ")[0]
        }`);
      setIsLogin(true);
      setCurrentAccount(createAccount);
      // Reset the logout timer
      setTimer(300)
      // Empty input after button click..
      setUserName('');
      setUserPin('');

      // ReCalculate balance and Update balance in accounts 
      calcBalance(createAccount);
    }
  }



  // Handle Transfer Amount button
  const handleTransferAmount = (e) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount); // Ensure the amount is a number
    const receiverAcc = accounts.find(acc => acc.username === transferUserName.toLowerCase());
    setTransferAmount('');
    setTransferUserName('');

    if (
      amount > 0 &&
      receiverAcc &&
      currentAccont.balance >= amount &&
      receiverAcc?.username !== currentAccont.username
    ) {
      currentAccont.movements.push(-amount);
      receiverAcc.movements.push(amount);


      // Add transfer date
      currentAccont.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());

      // Update Ui..
      // ReCalculate balance and update balance in accounts 
      calcBalance(currentAccont);
      calcBalance(receiverAcc);

      // Update current account state to trigger a re-render
      setCurrentAccount({ ...currentAccont });
      // Reset the logout timer
      setTimer(300);
    }
  }



  // Handle RequestLoan button
  const handleRequestLoan = (e) => {
    e.preventDefault();

    const amount = Math.floor(parseFloat(userRequestLoan));

    if (
      amount > 0 &&
      currentAccont.movements.some((mov) => mov >= amount * 0.1)
    ) {
      // Add movement
      currentAccont.movements.push(amount);

      // Add loan date
      currentAccont.movementsDates.push(new Date().toISOString());

      // Update UI..
      calcBalance(currentAccont);
      // Update current account state to trigger a re-render
      setCurrentAccount({ ...currentAccont });
      // Reset the logout timer
      setTimer(300);
    }
    // Empty input after button click..
    setUserRequestLoan('');
  }



  // Handle Close Account button
  const handleCloseAcc = (e) => {
    e.preventDefault();

    if (currentAccont.username === closeUserAcc
      && currentAccont.pin === parseFloat(closeUserAccPin)) {
      const index = accounts.findIndex(
        (acc) => acc.username === currentAccont.username
      );
      // Delete accont in acconts.
      accounts.splice(index, 1);

      setIsLogin(false)
      // Update Login Message
      setLabelMessage('Log in to get started');
      setCurrentAccount(null)
      // Reset the logout timer
      setTimer(0);
    }
    // Empty input after button click..
    setCloseUserAcc('');
    setCloseUserAccPin('');
  }



  // Handle movments sort button..
  const handleSort = () => {
    setIsSorted((prevsort) => !prevsort);
  };

  return (
    <div className="bankist-App">
      <Navbar handleLogin={handleLoginBtn} setUserName={setUserName} setUserPin={setUserPin} userName={userName} userPin={userPin} labelMessage={labelMessage}></Navbar>
      {isLogin && <main className='app'>
        <Balance balanceAccount={currentAccont}></Balance>
        <Movements movAccount={currentAccont} isSorted={isSorted}></Movements>
        <Summary acc={currentAccont} handleSort={handleSort} isSorted={isSorted}></Summary>
        <Operations transferAmo={transferAmount} transferUser={transferUserName} setTransferAmo={setTransferAmount} setTransferUser={setTransferUserName} handleTransfer={handleTransferAmount} requestLoan={userRequestLoan} setRequestLoan={setUserRequestLoan} handleLoan={handleRequestLoan} closeUsername={closeUserAcc} closeUserPin={closeUserAccPin} setCloseUsername={setCloseUserAcc} setCloseUserPin={setCloseUserAccPin} handleClose={handleCloseAcc}></Operations>
        <LogoutTimer sendTime={formatTime(timer)}></LogoutTimer>
      </main>}

    </div>
  );
}

export default App;
