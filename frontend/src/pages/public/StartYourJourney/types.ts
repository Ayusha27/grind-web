export interface IntakeFormData {
  fullName: string;
  email: string;
  age: string;
  gender: string;
  occupation: string;

  weightUnit: string;
  weight: string;
  heightUnit: string;
  height: string;

  fitnessLevel: string;
  trainingDays: string;
  sessionLength: string;

  trainingGoals: string[];
  specificFocus: string;
  workoutPreference: string;

  injuries: string[];
  healthConcern: string;

  dietaryPreference: string;
  averageSleep: string;
  stressLevel: string;

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
  averageSleep: "",
  stressLevel: "",

  lifestyleConsultation: false,
};