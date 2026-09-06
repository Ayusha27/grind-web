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

/*
 * =========================================================
 * WORKOUT DAY PROGRESS
 * =========================================================
 */

export interface ProgressDayDetail {
  completed: boolean;
  completion_percent: number;
  calories_burned: number;
}

/*
 * =========================================================
 * MONTH → WEEK → DAY
 * =========================================================
 */

export interface ProgressWeeklyDetail {
  [month: string]: {
    [week: string]: {
      [day: string]: ProgressDayDetail;
    };
  };
}

export interface ProgressData {
  exercises: ProgressExercises;

  /*
   * Total calories burned from workout_logs
   */
  calories_burned: number;

  /*
   * Number of weeks with at least one
   * logged/completed workout.
   */
  active_weeks: number;

  /*
   * Highest week score.
   */
  best_week_score: number;

  /*
   * Workout progress grouped by:
   * month → week → day
   */
  weekly_detail: ProgressWeeklyDetail;

  current: ProgressCurrent | null;

  transformation: ProgressTransformation;

  chart: ProgressChart;
}

export interface ProgressResponse {
  success: boolean;
  data: ProgressData;
}