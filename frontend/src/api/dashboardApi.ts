import axios from "axios";

import type { DashboardResponse } from "../types/dashboard";
import type { ProgressResponse } from "../types/progress";

import {
  API_BASE_URL,
  DEV_TOKEN,
} from "../config/api";

/**
 * Get the client's dashboard plan.
 *
 * Endpoint:
 * GET /api/v1/portal/my-plan
 */
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

/**
 * Get the client's latest workout progress.
 *
 * Endpoint:
 * GET /api/v1/portal/progress
 *
 * This endpoint is not cached by the backend,
 * so it returns the latest progress information.
 */
export const getProgress =
  async (): Promise<ProgressResponse> => {
    const response =
      await axios.get<ProgressResponse>(
        `${API_BASE_URL}/api/v1/portal/progress`,
        {
          params: {
            token: DEV_TOKEN,
          },
        }
      );

    return response.data;
  };