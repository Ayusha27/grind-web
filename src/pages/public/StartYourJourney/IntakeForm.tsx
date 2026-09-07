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

import {
  initialFormData,
  IntakeFormData,
} from "./types";
import IntakeFooter from "./IntakeFooter";

const IntakeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] =
    useState<IntakeFormData>(initialFormData);

  const handleChange = <K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        age: formData.age,
        weight: formData.weight,
        weight_unit: formData.weightUnit,
        height: formData.height,
        height_ft: formData.heightFt,
        height_in: formData.heightIn,
        height_unit: formData.heightUnit,
        gender: formData.gender,
        occupation: formData.occupation,
        fitness_level: formData.fitnessLevel,
        days_per_week: formData.trainingDays,
        session_duration: formData.sessionLength,
        goals: formData.trainingGoals.join(", "),
        goal_focus: formData.specificFocus,
        workout_pref: formData.workoutPreference,
        injuries: formData.injuries.join(", "),
        injuries_detail: formData.healthConcern,
        diet: formData.dietaryPreference
      };

      const response = await api.post("/intake", payload);

      if (response.status === 200 || response.status === 201) {
        const result = response.data;
        if (result.success) {
          navigate("/submission-success");
        } else {
          console.error("Failed to submit intake form:", result.message);
        }
      } else {
        console.error("Failed to submit intake form");
      }
    } catch (error) {
      console.error("Error submitting intake form:", error);
    }
  };

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
            border: "1px solid #292929",
            backgroundColor: "#080808",
            overflow: "hidden",
          }}
        >
          {/* PERSONAL + BODY METRICS */}
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
            />

            <BodyMetricsSection
              data={formData}
              onChange={handleChange}
            />
          </Box>

          {/* TRAINING GOALS */}
          <TrainingGoalsSection
            data={formData}
            onChange={handleChange}
          />

          {/* WORKOUT PREFERENCE */}
          <WorkoutPreference
            data={formData}
            onChange={handleChange}
          />

          {/* HEALTH + LIFESTYLE */}
          <HealthLifestyleSection
            data={formData}
            onChange={handleChange}
          />

          {/* COACHING */}
          <CoachingConsultation
            data={formData}
            onChange={handleChange}
          />

          {/* SUBMIT */}
          <IntakeSubmit />
        </Box>
      </Container>

      {/* FOOTER */}
      <IntakeFooter />
    </Box>
  );
};

export default IntakeForm;