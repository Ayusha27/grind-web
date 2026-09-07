import axios from "axios";

import type { DashboardResponse } from "../types/dashboard";
import type { ProgressResponse } from "../types/progress";

import { API_BASE_URL, DEV_TOKEN } from "../config/api";

/*
 * =========================================================
 * WORKOUT LOGGING TYPES
 * =========================================================
 *
 * The frontend sends individual set states.
 *
 * The backend is responsible for calculating:
 *
 * - total_sets
 * - completed_sets
 * - completion_percent
 * - calories_burned
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

  /*
   * These are retained in the request shape for compatibility,
   * but the backend calculates the authoritative values from
   * the submitted set states.
   */
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
        {
          params: {
            token: DEV_TOKEN,
          },
        }
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
        {
          params: {
            token: DEV_TOKEN,
          },
        }
      );

    return response.data;
  };


/*
 * =========================================================
 * LOG COMPLETE WORKOUT
 * =========================================================
 *
 * One request represents one complete workout-day state.
 *
 * The frontend sends:
 *
 *     month
 *     week
 *     day
 *     individual set states
 *
 * The backend:
 *
 *     validates the workout
 *     saves workout_set_logs
 *     calculates the summary
 *     upserts workout_logs
 *
 * Authentication is handled by the backend using the
 * configured access token.
 */

export const logWorkout =
  async (
    payload: WorkoutLogPayload
  ): Promise<WorkoutLogResponse> => {
    const response =
      await axios.post<WorkoutLogResponse>(
        `${API_BASE_URL}/api/v1/workout/log`,
        payload,
        {
          params: {
            token: DEV_TOKEN,
          },
        }
      );

    return response.data;
  };