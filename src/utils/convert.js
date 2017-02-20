const LITERS_IN_GALLON = 3.785411784

export const gallonsToLiters = gallons => gallons * LITERS_IN_GALLON
export const litersToGallons = liters => liters / LITERS_IN_GALLON
export const quantityToLiters = ({ value, unit }) => (unit === 'LITER' ? value : gallonsToLiters(value))

export default {}
