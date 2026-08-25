export interface IntakeFormData {
  // Personal
  fullName: string;
  email: string;
  age: string;
  gender: string;
  occupation: string;

  // Body metrics
  weightUnit: "kg" | "lbs";
  weight: string;
  heightUnit: "cm" | "ft";
  height: string;
  fitnessLevel: string;
  trainingDays: string;
  sessionLength: string;

  // Goals
  trainingGoals: string[];
  specificFocus: string;

  // Workout
  workoutPreference: "gym" | "home" | "both" | "";

  // Health
  injuries: string[];
  healthConcern: string;

  // Lifestyle
  dietaryPreference: string;
  sleep: string;
  stressLevel: string;

  // Coaching
  lifestyleConsultation: boolean;
}

export const initialFormData: IntakeFormData = {
  fullName: "",
  email: "",
  age: "",
  gender: "",
  occupation: "",

  weightUnit: "kg",
  weight: "",
  heightUnit: "cm",
  height: "",
  fitnessLevel: "",
  trainingDays: "",
  sessionLength: "",

  trainingGoals: [],
  specificFocus: "",

  workoutPreference: "",

  injuries: [],
  healthConcern: "",

  dietaryPreference: "",
  sleep: "",
  stressLevel: "",

  lifestyleConsultation: false,
};