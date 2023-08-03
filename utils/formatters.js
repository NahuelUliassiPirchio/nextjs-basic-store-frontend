export function formatPrice (price) {
  const stringifiedPrice = price.toString()

  if (stringifiedPrice.length < 4) {
    return stringifiedPrice
  }

  let result = ''
  let count = 0

  for (let i = stringifiedPrice.length - 1; i >= 0; i--) {
    result = stringifiedPrice[i] + result
    count++

    if (count === 3 && i !== 0) {
      result = '.' + result
      count = 0
    }
  }

  return result
}
