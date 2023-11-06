export function convertTime(inputTime: string) {
  // Get the current date
  const currentDate = new Date();

  // Parse the time string "18:00am" and set it as the time for the current date
  const timeString = "18:00am";
  const [hours, minutes] = timeString.split(":").map(Number);

  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);

  return currentDate;
}
