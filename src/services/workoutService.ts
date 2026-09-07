import api from "./api";

export interface WorkoutExercise {
  id: number;
  day_id: number;
  exercise_name: string;
  sets_count: number;
  reps: string;
  youtube_url: string;
  notes?: string;
  sort_order: number;
}

export interface WorkoutDay {
  id: number;
  plan_id: number;
  day_number: number;
  day_name: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  id: number;
  client_id: number;
  plan_name: string;
  is_active: number;
  version_no?: number;
  workout_json?: string;
}

export interface WorkoutResponse {
  success: boolean;
  data: {
    plan: WorkoutPlan;
    days: WorkoutDay[];
  } | null;
  message?: string;
}

export const getWorkout = async (
  clientId: number
): Promise<WorkoutResponse> => {
  const response = await api.get<WorkoutResponse>(
    `/api/workout.php?client_id=${clientId}`
  );

  return response.data;
};