export const getInitialTime = () => {
  return 10 * 60;
};

export const resetTimer = () => {
  const defaultTime = 10 * 60;
  localStorage.setItem("countdown", defaultTime);
};

export const addTimer = () => {
  localStorage.removeItem("countdown");
  resetTimer();
};
