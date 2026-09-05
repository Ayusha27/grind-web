export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

export interface DashboardData {
  client: Client;
  plan_name: string;
  days: WorkoutDay[];
  diet: DietPlan;
  progress: Progress;
}

export interface Client {
  id: number;
  name: string;
  goal: string;
}

export interface WorkoutDay {
  id: number;
  label: string;
  short: string;
  color: string;
  colorSoft: string;
  calMin: number;
  calMax: number;
  calNote: string;
  exercises: BackendWorkoutExercise[];
}

export interface BackendWorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  note: string;
  yt: string;
}

export interface DietPlan {
  plan_name: string;
  goal: string;
  current_weight: string;
  goal_weight: string;
  height: string;
  bmi: string;
  bmi_status: string;
  daily_calories: string;
  daily_protein: string;
  daily_carbs: string;
  daily_fat: string;
  daily_fibre: string;
  daily_water_intake: string;
  notes: string;
  meals: Meal[];
}

export interface Meal {
  meal: string;
  options: MealOption[];
}

export interface MealOption {
  name: string;
  calories: string | number;
  protein: string | number;
  carbs: string | number;
  fat: string | number;
  fibre: string | number;

  items?: string[];
  ingredients?: string;
}

export interface Progress {
  total: number;
  completed: number;
  percent: number;
}