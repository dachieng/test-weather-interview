export const formatDate = (date: any) => {
  let newDate = new Date(Date.parse(date));
  let dateString = newDate.toString().split(" ");

  const day = dateString[2];
  const month = dateString[1];
  const year = dateString[3];

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return { day, month, year, hours, minutes };
};

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
