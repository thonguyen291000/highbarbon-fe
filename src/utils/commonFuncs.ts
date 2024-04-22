export const scrollToTop = () =>
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

export const formatDayMonthYearDate = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};
