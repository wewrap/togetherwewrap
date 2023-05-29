export function getNthDateFromToday(numOfDay: number): Date {
  const today = new Date()
  const nthDayFromToday = new Date(today)
  nthDayFromToday.setDate(nthDayFromToday.getDate() + numOfDay)

  return nthDayFromToday
}
