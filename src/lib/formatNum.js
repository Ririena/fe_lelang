

export function formatNumberWithDots(value) {
  const numberString = value.toString().replace(/\D/g, "");
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
