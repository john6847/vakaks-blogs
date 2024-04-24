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
