export function getItemExpireDate(): Date {
  const todayMidnight = new Date(new Date().setHours(0, 0, 0, 0));
  const additionalDays = 2;
  const finalDate = new Date(
    todayMidnight.setDate(todayMidnight.getDate() + additionalDays)
  );

  return finalDate;
}
