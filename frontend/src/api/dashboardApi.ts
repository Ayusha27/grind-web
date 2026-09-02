import { dashboardResponse } from "../mocks/dashboardResponse";
import type { DashboardResponse } from "../types/dashboard";

export const getDashboard = async (): Promise<DashboardResponse> => {
  return dashboardResponse;
};