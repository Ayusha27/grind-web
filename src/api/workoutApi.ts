import axios from "axios";

import {
  API_BASE_URL,
} from "../config/api";

import { getToken } from "../utils/auth";

/**
 * =========================================================
 * WORKOUT SET
 * =========================================================
 */

export interface WorkoutSetLogInput {
  exercise_id: number;
  set_no: number;
  completed: boolean;
}

/**
 * =========================================================
 * WORKOUT LOG PAYLOAD
 * =========================================================
 *
 * client_id is intentionally NOT included.
 *
 * The backend identifies the client from:
 *
 * Authorization: Bearer <token>
 *
 * The token is retrieved from localStorage.
 */

export interface WorkoutLogPayload {
  month_no: number;
  week_no: number;
  day_id: number;

  total_sets: number;
  completed_sets: number;
  calories_burned: number;

  sets: WorkoutSetLogInput[];
}

/**
 * =========================================================
 * WORKOUT SUMMARY
 * =========================================================
 */

export interface WorkoutSummary {
  total_sets: number;
  completed_sets: number;
  completion_percent: number;
  calories_burned: number;
}

/**
 * =========================================================
 * WORKOUT LOG RESPONSE
 * =========================================================
 */

export interface WorkoutLogResponse {
  success: boolean;
  message: string;
  log_id: number;
  sets_logged: number;
  summary: WorkoutSummary;
}

/**
 * =========================================================
 * SAVED WORKOUT SET
 * =========================================================
 */

export interface SavedWorkoutSet {
  exercise_id: number;
  set_no: number;
  completed: boolean;
}

/**
 * =========================================================
 * GET WORKOUT SETS RESPONSE
 * =========================================================
 */

export interface WorkoutSetsResponse {
  success: boolean;
  data: SavedWorkoutSet[];
}

/**
 * =========================================================
 * AUTH CONFIG
 * =========================================================
 *
 * The token comes from localStorage.
 *
 * We send it in both places for now:
 *
 * 1. Authorization header
 * 2. Query parameter
 *
 * This keeps compatibility with the existing backend.
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

/**
 * =========================================================
 * GET WORKOUT SETS
 * =========================================================
 *
 * Loads the saved individual set states for:
 *
 * month + week + day
 */

export const getWorkoutSets = async (
  month: number,
  week: number,
  dayId: number
): Promise<WorkoutSetsResponse> => {
  const response =
    await axios.get<WorkoutSetsResponse>(
      `${API_BASE_URL}/api/v1/workout/sets`,
      {
        ...getAuthConfig(),

        params: {
          ...getAuthConfig().params,
          month_no: month,
          week_no: week,
          day_id: dayId,
        },
      }
    );

  return response.data;
};

/**
 * =========================================================
 * LOG COMPLETE WORKOUT
 * =========================================================
 *
 * Sends ALL individual sets in one request.
 *
 * The backend is responsible for calculating:
 *
 * - completed_sets
 * - completion_percent
 * - calories_burned
 */

export const logWorkout = async (
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