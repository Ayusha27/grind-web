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
export interface WorkoutLogPayload {
  client_id: number;
  month_no: number;
  week_no: number;
  day_id: number;
  total_sets: number;
  completed_sets: number;
  calories_burned: number;
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