export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value) => {
  return `${value.toFixed(2)}%`;
};

export const formatMonths = (months) => {
  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""}`;
  }
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }
  return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${
    remainingMonths !== 1 ? "s" : ""
  }`;
};
