import { useQuery } from "@tanstack/react-query";
import { getReportById } from "../services/reportService";

export function useReport(id) {
    return useQuery({
        queryKey: ["report", id],
        queryFn: () => getReportById(id),
        enabled: !!id,
    });
}