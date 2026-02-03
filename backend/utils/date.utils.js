export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // YYYY-MM-DD
};

export const getMonthRange = (year, month) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
};
