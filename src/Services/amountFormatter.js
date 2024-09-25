export default function formatAmount(value) {
  if (isNaN(value)) return "0.00";

  const absValue = Math.abs(value);

  if (absValue >= 1.0e7) {
    // Crore and remaining Lakhs
    const crores = Math.floor(value / 1.0e7); // Crores
    const lakhs = Math.floor((value % 1.0e7) / 1.0e5); // Remaining Lakhs
    if (lakhs > 0) {
      return crores + " Cr " + lakhs + " L"; // Example: 2 Cr 35 L
    }
    return crores + " Cr"; // Example: 2 Cr
  } else if (absValue >= 1.0e5) {
    // Lakhs only
    return (value / 1.0e5).toFixed(2) + " L"; // Example: 12.34 L
  } else {
    // Less than 1 Lakh, show as is
    return value.toFixed(2); // Example: 99,999.99
  }
}

export const formatCurrency = (amount) => {
  return amount?.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
};
