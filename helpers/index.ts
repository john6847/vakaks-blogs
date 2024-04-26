export const isValidUrl = (url: string|null|undefined) => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

export const formatNumberToNk = (num: number) => {
  if (num < 1000) return num
  if (num < 1000000) return (num / 1000).toFixed(1) + 'k'
  return (num / 1000000).toFixed(1) + 'm'
}

export const textCapitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const textCamelCase = (text: string) => {
  return text.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase()
  }).replace(/\s+/g, ' ')
}
