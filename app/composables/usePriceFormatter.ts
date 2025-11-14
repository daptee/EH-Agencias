export function usePriceFormatter() {
  const formatPrice = (price: string): string => {
    if (!price) return ''

    const priceNumber = parseFloat(price)
    if (isNaN(priceNumber)) return ''

    return priceNumber.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  return { formatPrice }
}
