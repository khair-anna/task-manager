export function formatTimeDate(timestamp) {
  const date = new Date(timestamp)
  const options = { hour: 'numeric', minute: 'numeric', hour12: false, timeZone: 'Europe/Kiev' }
  return date.toLocaleString('uk-UA', options)
}
