export const formatTime = (time) => {
  const min = String(Math.trunc(time / 60)).padStart(2, "0");
  const sec = String(time % 60).padStart(2, "0");
  return `${min}:${sec}`;
};