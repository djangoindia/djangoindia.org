interface Duration {
  hours: number
  days: number
  weeks: number
  months: number
  years: number
}

export const calculateDuration = (date1: string, date2: string): Duration => {
  // Ensure date1 is the earlier date
  let startDate = new Date(date1)
  let endDate = new Date(date2)

  if (startDate.getTime() > endDate.getTime()) {
    ;[startDate, endDate] = [endDate, startDate]
  }

  // Calculate the difference in milliseconds
  const diffMilliseconds = endDate.getTime() - startDate.getTime()

  // Calculate the differences in various units
  const diffHours = diffMilliseconds / (1000 * 60 * 60)
  const diffDays = diffMilliseconds / (1000 * 60 * 60 * 24)
  const diffWeeks = diffMilliseconds / (1000 * 60 * 60 * 24 * 7)

  // Calculate months and years
  const diffYears = endDate.getFullYear() - startDate.getFullYear()
  const diffMonths =
    diffYears * 12 + (endDate.getMonth() - startDate.getMonth())

  // Return an object with all the calculated durations
  return {
    hours: Math.floor(diffHours),
    days: Math.floor(diffDays),
    weeks: Math.floor(diffWeeks),
    months: diffMonths,
    years: diffYears,
  }
}
