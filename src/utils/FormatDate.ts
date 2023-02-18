export const formatDate = (date: Date): { date: string; time: string } => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes();

  return {
    date: `${day}.${month}.${year}`,
    time: `${hours}:${minutes}`,
  };
};
