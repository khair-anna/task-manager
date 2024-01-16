function formatEndYear(timestamp) {
  const date = timestamp.toDate()
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }
  return date.toLocaleString('uk-UA', options)
}

function formatTimeDate(timestamp) {
  const date = new Date(timestamp)
  const options = { hour: 'numeric', minute: 'numeric', hour12: false, timeZone: 'Europe/Kiev' }
  return date.toLocaleString('uk-UA', options)
}

function formatTimeYear(timestamp) {
  const date = new Date(timestamp)
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' }
  return date.toLocaleString('uk-UA', options)
}

export { formatEndYear, formatTimeDate, formatTimeYear }
