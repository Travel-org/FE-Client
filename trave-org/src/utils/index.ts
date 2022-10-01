export const handleCompareDate = (e: Date, d: Date) =>
  e.getFullYear() === d.getFullYear() &&
  e.getMonth() === d.getMonth() &&
  e.getDate() === d.getDate();