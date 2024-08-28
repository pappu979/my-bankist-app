export const calcBalance = function (acc) {
  acc.balance = acc.movements.reduce((curr, mov) => {
    return curr + mov;
  }, 0); // Initialize the accumulator with 0
}