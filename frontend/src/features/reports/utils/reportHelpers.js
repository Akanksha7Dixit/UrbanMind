import { format } from "date-fns";

export const formatReportDate = (date) =>

  format(
    new Date(date),
    "dd MMM yyyy"
  );

export const latestReport = (reports) => {

  if (!reports.length)

    return null;

  return [...reports].sort(

    (a, b) =>

      new Date(b.createdAt) -

      new Date(a.createdAt)

  )[0];

};

export const totalReports = (

  reports

) => reports.length;

export const reportCategories = (

  reports

) => {

  const map = {};

  reports.forEach((report) => {

    map[report.category] =

      (map[report.category] || 0) + 1;

  });

  return map;

};