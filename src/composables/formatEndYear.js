export function formatEndYear(timestamp) {
  const date = timestamp.toDate()
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }
  return date.toLocaleString('uk-UA', options)
}
