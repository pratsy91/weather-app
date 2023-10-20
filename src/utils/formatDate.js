export const formatDate = (dateTimeString) => {
  if (!dateTimeString) return;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dateParts = dateTimeString.split(" ");
  const datePart = dateParts[0];
  const dateObj = new Date(datePart);

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  const dayName = days[dateObj.getDay()];
  const monthName = months[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  const formattedDate = `${dayName}, ${monthName} ${day}, ${year}`;
  return formattedDate;
};
