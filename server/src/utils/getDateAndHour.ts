const getDateAndHour = () => {
  const data = new Date();
  
  const newData = data.toJSON().slice(0, 10) + " " + data.toJSON().slice(11, 19);

  return newData;
}

export default getDateAndHour;
