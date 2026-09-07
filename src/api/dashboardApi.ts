import axios from "axios";

import type { DashboardResponse } from "../types/dashboard";
import type { ProgressResponse } from "../types/progress";

import { API_BASE_URL } from "../config/api";
import { getToken } from "../utils/auth";

/*
 * =========================================================
 * AUTH CONFIG
 * =========================================================
 *
 * The user's token is retrieved from localStorage.
 *
 * We also keep sending it as a query parameter for now
 * because the existing backend already supports:
 *
 *     ?token=...
 *
 * This makes the migration safer and avoids changing the
 * backend authentication flow at this stage.
 */

const getAuthConfig = () => {
  const token = getToken();

  return {
    params: {
      token: token ?? "",
    },

    headers: {
      Authorization: token
        ? `Bearer ${token}`
        : undefined,
    },
  };
};


/*
 * =========================================================
 * DASHBOARD
 * =========================================================
 */

export const getDashboard =
  async (): Promise<DashboardResponse> => {
    const response =
      await axios.get<DashboardResponse>(
        `${API_BASE_URL}/api/v1/portal/my-plan`,
        getAuthConfig()
      );

    return response.data;
  };


/*
 * =========================================================
 * PROGRESS
 * =========================================================
 */

export const getProgress =
  async (): Promise<ProgressResponse> => {
    const response =
      await axios.get<ProgressResponse>(
        `${API_BASE_URL}/api/v1/portal/progress`,
        getAuthConfig()
      );

    return response.data;
  };


/*
 * =========================================================
 * LOG COMPLETE WORKOUT
 * =========================================================
 *
 * Authentication is retrieved from localStorage.
 *
 * The backend identifies the client from the token.
 */

export interface WorkoutSetLogInput {
  exercise_id: number;
  set_no: number;
  completed: boolean;
}

export interface WorkoutLogPayload {
  month_no: number;
  week_no: number;
  day_id: number;

  total_sets: number;
  completed_sets: number;
  calories_burned: number;

  sets: WorkoutSetLogInput[];
}

export interface WorkoutSummary {
  total_sets: number;
  completed_sets: number;
  completion_percent: number;
  calories_burned: number;
}

export interface WorkoutLogResponse {
  success: boolean;
  message: string;
  log_id: number;
  sets_logged: number;
  summary: WorkoutSummary;
}

export const logWorkout =
  async (
    payload: WorkoutLogPayload
  ): Promise<WorkoutLogResponse> => {
    const response =
      await axios.post<WorkoutLogResponse>(
        `${API_BASE_URL}/api/v1/workout/log`,
        payload,
        getAuthConfig()
      );

    return response.data;
  };