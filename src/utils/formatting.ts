export const formatMilitary = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${day} ${month} ${date.getFullYear()}`;
};

export const formatMilitaryShort = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${day} ${month}`;
};

export const pad2 = (n: number) => String(n).padStart(2, "0");
