function getDate(dateString) {
  const date = new Date(dateString)
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const dayIndex = date.getDay()

  return daysOfWeek[dayIndex]
}

export default getDate