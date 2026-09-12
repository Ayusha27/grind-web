import { useState } from "react";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

import PersonalSection from "./PersonalSection";
import BodyMetricsSection from "./BodyMetricsSection";
import TrainingGoalsSection from "./TrainingGoalsSection";
import WorkoutPreference from "./WorkoutPreference";
import HealthLifestyleSection from "./HealthLifestyleSection";
import CoachingConsultation from "./CoachingConsultation";
import IntakeSubmit from "./IntakeSubmit";
import IntakeFooter from "./IntakeFooter";

import {
  initialFormData,
  IntakeFormData,
} from "./types";


// ============================================================
// VALIDATION ERRORS
// ============================================================

type ValidationErrors = {
  // Personal
  fullName: boolean;
  email: boolean;
  age: boolean;
  gender: boolean;

  // Body metrics
  weight: boolean;
  height: boolean;
  fitnessLevel: boolean;
  trainingDays: boolean;

  // Other mandatory sections
  trainingGoals: boolean;
  workoutPreference: boolean;
  dietLifestyle: boolean;
  healthLimitations: boolean;
};


// ============================================================
// EMAIL VALIDATION
// ============================================================

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email.trim()
  );
};


// ============================================================
// INTAKE FORM
// ============================================================

const IntakeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<IntakeFormData>(initialFormData);

  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors>({
      fullName: false,
      email: false,
      age: false,
      gender: false,

      weight: false,
      height: false,
      fitnessLevel: false,
      trainingDays: false,

      trainingGoals: false,
      workoutPreference: false,
      dietLifestyle: false,
      healthLimitations: false,
    });


  // ==========================================================
  // HANDLE FIELD CHANGES
  // ==========================================================

  const handleChange = <K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => {
    const updatedData: IntakeFormData = {
      ...formData,
      [field]: value,
    };

    setFormData(updatedData);


    // ----------------------------------------------------------
    // Update validation errors while user fills the form
    // ----------------------------------------------------------

    setValidationErrors((previous) => {
      const next = {
        ...previous,
      };


      // ========================================================
      // PERSONAL
      // ========================================================

      if (field === "fullName") {
        next.fullName =
          !updatedData.fullName.trim();
      }

      if (field === "email") {
        next.email =
          !isValidEmail(
            updatedData.email
          );
      }

      if (field === "age") {
        const age =
          Number(updatedData.age);

        next.age =
          !updatedData.age.trim() ||
          !Number.isFinite(age) ||
          age < 13 ||
          age > 100;
      }

      if (field === "gender") {
        next.gender =
          !updatedData.gender.trim();
      }


      // ========================================================
      // BODY METRICS
      // ========================================================

      if (field === "weight") {
        const weight =
          Number(updatedData.weight);

        next.weight =
          !updatedData.weight.trim() ||
          !Number.isFinite(weight) ||
          weight <= 0;
      }

      if (
        field === "height" ||
        field === "heightFt" ||
        field === "heightIn" ||
        field === "heightUnit"
      ) {
        if (
          updatedData.heightUnit === "cm"
        ) {
          const height =
            Number(updatedData.height);

          next.height =
            !updatedData.height.trim() ||
            !Number.isFinite(height) ||
            height <= 0;
        } else {
          const feet =
            Number(updatedData.heightFt);

          const inches =
            Number(updatedData.heightIn);

          next.height =
            !updatedData.heightFt.trim() ||
            !Number.isFinite(feet) ||
            feet < 0 ||
            feet > 8 ||
            !updatedData.heightIn.trim() ||
            !Number.isFinite(inches) ||
            inches < 0 ||
            inches >= 12;
        }
      }

      if (field === "fitnessLevel") {
        next.fitnessLevel =
          !updatedData.fitnessLevel.trim();
      }

      if (field === "trainingDays") {
        next.trainingDays =
          !updatedData.trainingDays.trim();
      }


      // ========================================================
      // TRAINING GOALS
      // ========================================================

      if (field === "trainingGoals") {
        next.trainingGoals =
          updatedData.trainingGoals.length === 0;
      }


      // ========================================================
      // WORKOUT PREFERENCE
      // ========================================================

      if (field === "workoutPreference") {
        next.workoutPreference =
          !updatedData.workoutPreference.trim();
      }


      // ========================================================
      // DIET & LIFESTYLE
      // ========================================================

      if (
        field === "dietaryPreference" ||
        field === "averageSleep" ||
        field === "stressLevel"
      ) {
        next.dietLifestyle =
          !updatedData.dietaryPreference.trim() ||
          !updatedData.averageSleep.trim() ||
          !updatedData.stressLevel.trim();
      }


      // ========================================================
      // HEALTH & LIMITATIONS
      // ========================================================

      if (
        field === "injuries" ||
        field === "healthConcern"
      ) {
        const injuries =
          updatedData.injuries ?? [];

        next.healthLimitations =
          injuries.length === 0 ||
          (
            !injuries.includes(
              "No injuries"
            ) &&
            !updatedData.healthConcern.trim()
          );
      }


      return next;
    });
  };


  // ============================================================
  // COMPLETE FORM VALIDATION
  // ============================================================

  const validateForm = (): ValidationErrors => {
    const injuries =
      formData.injuries ?? [];


    // ----------------------------------------------------------
    // Personal
    // ----------------------------------------------------------

    const age =
      Number(formData.age);

    const validAge =
      formData.age.trim() !== "" &&
      Number.isFinite(age) &&
      age >= 13 &&
      age <= 100;


    // ----------------------------------------------------------
    // Weight
    // ----------------------------------------------------------

    const weight =
      Number(formData.weight);

    const validWeight =
      formData.weight.trim() !== "" &&
      Number.isFinite(weight) &&
      weight > 0;


    // ----------------------------------------------------------
    // Height
    // ----------------------------------------------------------

    let validHeight = false;

    if (
      formData.heightUnit === "cm"
    ) {
      const height =
        Number(formData.height);

      validHeight =
        formData.height.trim() !== "" &&
        Number.isFinite(height) &&
        height > 0;
    } else {
      const feet =
        Number(formData.heightFt);

      const inches =
        Number(formData.heightIn);

      validHeight =
        formData.heightFt.trim() !== "" &&
        Number.isFinite(feet) &&
        feet >= 0 &&
        feet <= 8 &&
        formData.heightIn.trim() !== "" &&
        Number.isFinite(inches) &&
        inches >= 0 &&
        inches < 12;
    }


    // ----------------------------------------------------------
    // Return all errors
    // ----------------------------------------------------------

    return {
      // Personal
      fullName:
        !formData.fullName.trim(),

      email:
        !isValidEmail(
          formData.email
        ),

      age:
        !validAge,

      gender:
        !formData.gender.trim(),


      // Body metrics
      weight:
        !validWeight,

      height:
        !validHeight,

      fitnessLevel:
        !formData.fitnessLevel.trim(),

      trainingDays:
        !formData.trainingDays.trim(),


      // Training goals
      trainingGoals:
        formData.trainingGoals.length === 0,


      // Workout preference
      workoutPreference:
        !formData.workoutPreference.trim(),


      // Diet & Lifestyle
      dietLifestyle:
        !formData.dietaryPreference.trim() ||
        !formData.averageSleep.trim() ||
        !formData.stressLevel.trim(),


      // Health & Limitations
      healthLimitations:
        injuries.length === 0 ||
        (
          !injuries.includes(
            "No injuries"
          ) &&
          !formData.healthConcern.trim()
        ),
    };
  };


  // ============================================================
  // SCROLL TO FIRST INVALID FIELD / SECTION
  // ============================================================

  const scrollToFirstInvalidSection = (
    errors: ValidationErrors
  ) => {
    /*
     * Validation order follows the form layout.
     *
     * 1. Name
     * 2. Email
     * 3. Age
     * 4. Gender
     * 5. Weight
     * 6. Height
     * 7. Fitness Level
     * 8. Training Days
     * 9. Training Goals
     * 10. Workout Preference
     * 11. Diet & Lifestyle
     * 12. Health & Limitations
     */

    const sectionId =
      errors.fullName
        ? "intake-full-name"
        : errors.email
          ? "intake-email"
          : errors.age
            ? "intake-age"
            : errors.gender
              ? "intake-gender"
              : errors.weight
                ? "intake-weight"
                : errors.height
                  ? "intake-height"
                  : errors.fitnessLevel
                    ? "intake-fitness-level"
                    : errors.trainingDays
                      ? "intake-training-days"
                      : errors.trainingGoals
                        ? "intake-training-goals"
                        : errors.workoutPreference
                          ? "intake-workout-preference"
                          : errors.dietLifestyle
                            ? "intake-diet-lifestyle"
                            : errors.healthLimitations
                              ? "intake-health-limitations"
                              : null;


    if (!sectionId) {
      return;
    }


    requestAnimationFrame(() => {
      const section =
        document.getElementById(
          sectionId
        );

      if (!section) {
        return;
      }


      const headerOffset = 24;

      const top =
        section.getBoundingClientRect()
          .top +
        window.scrollY -
        headerOffset;


      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });


      /*
       * Give keyboard focus to the invalid
       * input where possible.
       */
      const input =
        section.querySelector<
          HTMLInputElement |
          HTMLSelectElement |
          HTMLTextAreaElement
        >(
          "input, select, textarea"
        );

      input?.focus();
    });
  };


  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async () => {
    /*
     * Always validate before making the API call.
     */
    const errors =
      validateForm();


    setValidationErrors(
      errors
    );


    /*
     * If ANY required field/section
     * is incomplete:
     *
     * - Don't call API
     * - Don't navigate
     * - Scroll to first problem
     */
    if (
      Object.values(errors).some(
        Boolean
      )
    ) {
      scrollToFirstInvalidSection(
        errors
      );

      return;
    }


    // ==========================================================
    // API SUBMISSION
    // ==========================================================

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        age: formData.age,

        weight: formData.weight,
        weight_unit:
          formData.weightUnit,

        height: formData.height,
        height_ft:
          formData.heightFt,
        height_in:
          formData.heightIn,
        height_unit:
          formData.heightUnit,

        gender: formData.gender,
        occupation:
          formData.occupation,

        fitness_level:
          formData.fitnessLevel,

        days_per_week:
          formData.trainingDays,

        session_duration:
          formData.sessionLength,

        goals:
          formData.trainingGoals.join(
            ", "
          ),

        goal_focus:
          formData.specificFocus,

        workout_pref:
          formData.workoutPreference,

        injuries:
          formData.injuries.join(
            ", "
          ),

        injuries_detail:
          formData.healthConcern,

        diet:
          formData.dietaryPreference,
      };


      const response =
        await api.post(
          "/intake",
          payload
        );


      if (
        (
          response.status === 200 ||
          response.status === 201
        ) &&
        response.data?.success
      ) {
        navigate(
          "/submission-success"
        );
      } else {
        console.error(
          "Failed to submit intake form:",
          response.data?.message
        );
      }
    } catch (error) {
      console.error(
        "Error submitting intake form:",
        error
      );
    }
  };


  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#080808",

        pt: {
          xs: 4,
          md: 5,
        },

        pb: 0,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 800,

          mx: "auto",

          px: {
            xs: 1.5,
            sm: 2,
            md: 0,
          },
        }}
      >
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
          sx={{
            width: "100%",

            border:
              "1px solid #292929",

            backgroundColor:
              "#080808",

            overflow: "hidden",
          }}
        >

          {/* ====================================================
              PERSONAL + BODY METRICS
          ==================================================== */}

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },

              "& > *": {
                minWidth: 0,
              },

              "& > *:first-of-type": {
                borderRight: {
                  xs: "none",
                  md: "1px solid #292929",
                },

                borderBottom: {
                  xs: "1px solid #292929",
                  md: "none",
                },
              },
            }}
          >
            <PersonalSection
              data={formData}
              onChange={handleChange}

              errors={{
                fullName:
                  validationErrors.fullName,

                email:
                  validationErrors.email,

                age:
                  validationErrors.age,

                gender:
                  validationErrors.gender,
              }}
            />

            <BodyMetricsSection
              data={formData}
              onChange={handleChange}

              errors={{
                weight:
                  validationErrors.weight,

                height:
                  validationErrors.height,

                fitnessLevel:
                  validationErrors.fitnessLevel,

                trainingDays:
                  validationErrors.trainingDays,
              }}
            />
          </Box>


          {/* ====================================================
              TRAINING GOALS
          ==================================================== */}

          <Box id="intake-training-goals">
            <TrainingGoalsSection
              data={formData}
              onChange={handleChange}
              error={
                validationErrors.trainingGoals
              }
            />
          </Box>


          {/* ====================================================
              WORKOUT PREFERENCE
          ==================================================== */}

          <Box id="intake-workout-preference">
            <WorkoutPreference
              data={formData}
              onChange={handleChange}
              error={
                validationErrors.workoutPreference
              }
            />
          </Box>


          {/* ====================================================
              HEALTH + DIET
          ==================================================== */}

          <HealthLifestyleSection
            data={formData}
            onChange={handleChange}

            dietError={
              validationErrors.dietLifestyle
            }

            healthError={
              validationErrors.healthLimitations
            }

            dietSectionId=
            "intake-diet-lifestyle"

            healthSectionId=
            "intake-health-limitations"
          />


          {/* ====================================================
              COACHING CONSULTATION
          ==================================================== */}

          <CoachingConsultation
            data={formData}
            onChange={handleChange}
          />


          {/* ====================================================
              SUBMIT
          ==================================================== */}

          <IntakeSubmit />
        </Box>
      </Container>


      {/* ======================================================
          FOOTER
      ====================================================== */}

      <IntakeFooter />
    </Box>
  );
};

export default IntakeForm;