export const formatTime = (dateString) => {
  if (!dateString) return;
  const dateParts = dateString.split(" ");
  const timePart = dateParts[1]; // Extract the time part
  const [hours, minutes] = timePart.split(":");
  const paddedHours = hours.padStart(2, "0");
  const paddedMinutes = minutes.padStart(2, "0");
  const formattedTime = `${paddedHours}:${paddedMinutes}`;
  return formattedTime;
};
