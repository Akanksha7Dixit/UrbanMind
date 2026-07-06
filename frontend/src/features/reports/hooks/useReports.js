import { useQuery } from "@tanstack/react-query";
import {
  getReports,
  getReportById,
} from "../services/reportService";

export function useReports() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });
}

export function useReport(id) {
  return useQuery({
    queryKey: ["report", id],
    queryFn: () => getReportById(id),
    enabled: !!id,
  });
}