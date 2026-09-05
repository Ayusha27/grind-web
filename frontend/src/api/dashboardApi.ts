// import { dashboardResponse } from "../mocks/dashboardResponse";
// import type { DashboardResponse } from "../types/dashboard";

// export const getDashboard = async (): Promise<DashboardResponse> => {
//   return dashboardResponse;
// };

import axios from "axios";

import type { DashboardResponse } from "../types/dashboard";
import {
  API_BASE_URL,
  DEV_TOKEN,
} from "../config/api";

export const getDashboard =
  async (): Promise<DashboardResponse> => {
    const response =
      await axios.get<DashboardResponse>(
        `${API_BASE_URL}/api/v1/portal/my-plan`,
        {
          params: {
            token: DEV_TOKEN,
          },
        }
      );

    return response.data;
  };

