import { parse, format } from "date-fns";

export const parseDDMMYYYY = (dateString) => {
  const [day, month, year] = dateString.split("-");
  return parse(`${year}-${month}-${day}`, "yyyy-MM-dd", new Date());
};

export const formatDDMMYYYY = (date) => {
  return format(date, "dd-MM-yyyy");
};
