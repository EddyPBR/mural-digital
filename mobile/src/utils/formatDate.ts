const formatedDate = (date: string) => {
  if (!date) return;
  const year = date.slice(0, 4);
  const day = date.slice(8, 10);
  const month = date.slice(5, 7);
  return (day + "-" + month + "-" + year);
} 

export default formatedDate;