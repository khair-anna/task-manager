export function formatTimeYear(timestamp) {
  const date = new Date(timestamp)
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' }
  return date.toLocaleString('uk-UA', options)
}
