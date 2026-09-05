export interface ProgressExercises {
  total: number;
  completed: number;
  percent: number;
}

export interface ProgressCurrent {
  day?: number | null;
  week?: number | null;
  month?: number | null;
  completion?: number | null;
  calories?: number | null;
}

export interface ProgressTransformation {
  weight_lost: number;
  waist_reduced: number;
}

export interface ProgressChart {
  dates: string[];
  weights: number[];
  waists: number[];
}

export interface ProgressData {
  exercises: ProgressExercises;
  current: ProgressCurrent | null;
  transformation: ProgressTransformation;
  chart: ProgressChart;
}

export interface ProgressResponse {
  success: boolean;
  data: ProgressData;
}