export const isValidUrl = (url: string|null|undefined) => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}