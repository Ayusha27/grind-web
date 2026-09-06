import axios from "axios";

import {
  API_BASE_URL,
  DEV_TOKEN,
} from "../config/api";

/**
 * Payload sent when the user clicks
 * "Mark Complete" in the workout dialog.
 *
 * completion_percent is intentionally NOT sent.
 * The backend calculates it from:
 *
 * completed_sets / total_sets * 100
 */

export interface WorkoutSetLogInput {
  exercise_id: number;
  set_no: number;
  completed: boolean;
}


export interface WorkoutLogPayload {
  client_id: number;
  month_no: number;
  week_no: number;
  day_id: number;
  total_sets: number;
  completed_sets: number;
  calories_burned: number;
  sets: WorkoutSetLogInput[];
}

export interface WorkoutSetLogPayload {
  month_no: number;
  week_no: number;
  day_id: number;
  exercise_id: number;
  set_no: number;
  completed: boolean;
}

export interface WorkoutSetLogResponse {
  success: boolean;
  id: number;
  client_id: number;
  month_no: number;
  week_no: number;
  day_id: number;
  exercise_id: number;
  set_no: number;
  completed: boolean;
}

export interface WorkoutSetsResponse {
  success: boolean;
  sets: WorkoutSetLogResponse[];
}
/**
 * Response returned by:
 *
 * POST /api/v1/workout/log
 */
export interface WorkoutLogResponse {
  success: boolean;
  message: string;
  log_id: number;
}

/**
 * Save one completed workout summary.
 *
 * One API request = one workout_logs row.
 */
export const logWorkout = async (
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


export const logWorkoutSet = async (
  payload: WorkoutSetLogPayload
): Promise<WorkoutSetLogResponse> => {
  const response = await axios.post<WorkoutSetLogResponse>(
    `${API_BASE_URL}/api/v1/workout/set`,
    payload,
    {
      params: {
        token: DEV_TOKEN,
      },
    }
  );

  return response.data;
};


export const getWorkoutSets = async (
  monthNo: number,
  weekNo: number,
  dayId: number
): Promise<WorkoutSetsResponse> => {
  const response = await axios.get<WorkoutSetsResponse>(
    `${API_BASE_URL}/api/v1/workout/sets`,
    {
      params: {
        token: DEV_TOKEN,
        month_no: monthNo,
        week_no: weekNo,
        day_id: dayId,
      },
    }
  );

  return response.data;
};