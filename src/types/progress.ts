export interface ProgressDay {
  completed: boolean;
  logged: boolean;
  completion_percent: number;
  calories_burned: number;
  total_sets: number;
  completed_sets: number;
}

export interface ProgressWeeklyDetail {
  [month: string]: {
    [week: string]: {
      [day: string]: ProgressDay;
    };
  };
}

export interface ProgressSessions {
  total: number;
  logged: number;
  completed: number;
  percent: number;
}

export interface ProgressMonth {
  month_no: number;

  sessions_completed: number;
  sessions_logged: number;
  sessions_total: number;
  percent: number;

  sets_total: number;
  sets_completed: number;

  calories_burned: number;
  avg_calories_per_session: number;

  active_weeks: number;
  weeks_logged: number;
  weeks_completed: number;
  weeks_total: number;

  best_week_score: number;

  workouts: number;
  calories: number;
  score: number;
}

export interface ProgressPlan {
  workouts_per_week: number;
  weeks_per_month: number;
  sessions_per_month: number;
  months: number;
  sessions_total: number;
}

export interface ProgressOverall {
  sessions_completed: number;
  sessions_logged: number;
  sessions_total: number;
  percent: number;

  calories_burned: number;
  avg_calories_per_session: number;

  active_weeks: number;
  best_week_score: number;
  months_tracked: number;
}

export interface ProgressSets {
  total: number;
  completed: number;
  percent: number;
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

export interface ProgressExercises {
  total: number;
  completed: number;
  percent: number;
}

export interface ProgressCurrent {
  [key: string]: unknown;
}

export interface ProgressData {
  /**
   * Session attendance overview.
   *
   * A session is considered logged when the user
   * logs at least one set.
   */
  sessions: ProgressSessions;

  /**
   * Kept optional for backwards compatibility with
   * any existing frontend code that may still reference
   * the previous API field.
   */
  exercises?: ProgressExercises;

  calories_burned: number;
  avg_calories_per_session: number;

  active_weeks: number;
  weeks_total: number;
  best_week_score: number;

  weekly_detail: ProgressWeeklyDetail;

  plan: ProgressPlan;

  month: ProgressMonth;

  months: {
    [month: string]: ProgressMonth;
  };

  overall: ProgressOverall;

  sets: ProgressSets;

  current: ProgressCurrent | null;

  transformation: ProgressTransformation;

  chart: ProgressChart;
}

export interface ProgressResponse {
  success: boolean;
  data: ProgressData;
}