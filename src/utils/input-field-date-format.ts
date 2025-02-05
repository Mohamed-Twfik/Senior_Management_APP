export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const today = new Date();
export const todayFormatted = formatDate(today);

const lastSaturday = new Date(today);
lastSaturday.setDate(today.getDate() - (today.getDay() + 1) % 7);
export { lastSaturday };
export const lastSaturdayFormatted = formatDate(lastSaturday);