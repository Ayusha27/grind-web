import { useState } from "react";
import { Box, Container } from "@mui/material";

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

const IntakeForm = () => {
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

  const handleSubmit = () => {
    console.log("Intake form:", formData);
  };

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#080808",
        py: {
          xs: 5,
          md: 7,
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 820,
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
            border: "1px solid #292929",
            backgroundColor: "#080808",
            overflow: "hidden",
          }}
        >
          {/* Personal + Body Metrics */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              borderBottom: "1px solid #292929",
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

          {/* Training Goals */}
          <TrainingGoalsSection
            data={formData}
            onChange={handleChange}
          />

          {/* Workout Preference */}
          <WorkoutPreference
            data={formData}
            onChange={handleChange}
          />

          {/* Health + Lifestyle */}
          <HealthLifestyleSection
            data={formData}
            onChange={handleChange}
          />

          {/* Coaching Consultation */}
          <CoachingConsultation
            data={formData}
            onChange={handleChange}
          />

          {/* Submit */}
          <IntakeSubmit />
        </Box>
      </Container>
    </Box>
  );
};

export default IntakeForm;