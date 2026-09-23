import {
  Box,
  TextField,
  Typography,
} from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import type { IntakeFormData } from "./types";

interface PersonalSectionProps {
  data: IntakeFormData;

  onChange: <
    K extends keyof IntakeFormData
  >(
    field: K,
    value: IntakeFormData[K]
  ) => void;

  errors?: {
    fullName?: boolean;
    phoneNumber?: boolean;
    email?: boolean;
    age?: boolean;
    gender?: boolean;
  };
}

// ============================================================
// INPUT STYLES
// ============================================================

const inputStyles = {
  "& .MuiInputBase-root": {
    backgroundColor: "background.paper",
    color: "text.primary",
    borderRadius: 0,
    fontSize: 16,
    minHeight: 38,
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "divider",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "secondary.main",
  },

  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
  },

  "& .Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
  },

  "& .MuiInputBase-input": {
    py: 1,
  },

  "& .MuiInputBase-input::placeholder": {
    color: "text.primary",
    opacity: 0.45,
  },
};

// ============================================================
// NATIVE SELECT STYLES
// ============================================================

const nativeSelectStyles = {
  width: "100%",
  minHeight: 38,
  padding: "0 36px 0 12px",
  backgroundColor: "background.paper",
  color: "text.primary",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 0,
  outline: "none",
  fontSize: 16,
  fontFamily: "inherit",
  cursor: "pointer",

  "&:hover": {
    borderColor: "secondary.main",
  },

  "&:focus": {
    borderColor: "primary.main",
  },

  "& option": {
    backgroundColor: "background.paper",
    color: "text.primary",
  },
};

// ============================================================
// LABEL
// ============================================================

const labelStyles = {
  color: "text.primary",
  opacity: 0.55,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.7px",
  textTransform: "uppercase",
  mb: 0.7,
};

// ============================================================
// ERROR MESSAGE
// ============================================================

const ErrorMessage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Typography
      role="alert"
      sx={{
        color: "primary.main",
        fontSize: 11,
        lineHeight: 1.4,
        mt: 0.45,
      }}
    >
      {children}
    </Typography>
  );
};

// ============================================================
// PERSONAL SECTION
// ============================================================

const PersonalSection = ({
  data,
  onChange,
  errors = {},
}: PersonalSectionProps) => {
  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 2.5,
        },
      }}
    >
      {/* ======================================================
          SECTION HEADING
      ====================================================== */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Typography
          sx={{
            color: "primary.main",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "1.2px",
            whiteSpace: "nowrap",
          }}
        >
          PERSONAL
        </Typography>

        <Box
          sx={{
            flex: 1,
            height: "1px",
            backgroundColor: "divider",
          }}
        />
      </Box>

      {/* ======================================================
          FULL NAME
      ====================================================== */}

      <Box
        id="intake-full-name"
        sx={{
          mb: 1.6,
          borderLeft: errors.fullName
            ? "2px solid"
            : "2px solid transparent",
          borderColor: errors.fullName
            ? "primary.main"
            : "transparent",
          pl: errors.fullName ? 1 : 0,
        }}
      >
        <Typography sx={labelStyles}>
          Full Name{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
            }}
          >
            *
          </Box>
        </Typography>

        <TextField
          fullWidth
          size="small"
          value={data.fullName}
          placeholder="Alex Carter"
          error={Boolean(errors.fullName)}
          onChange={(event) =>
            onChange("fullName", event.target.value)
          }
          sx={inputStyles}
        />

        {errors.fullName && (
          <ErrorMessage>
            Please enter your full name.
          </ErrorMessage>
        )}
      </Box>

      {/* ======================================================
          PHONE NUMBER — REQUIRED
      ====================================================== */}

      <Box
        id="intake-phone-number"
        sx={{
          mb: 1.6,
          borderLeft: errors.phoneNumber
            ? "2px solid"
            : "2px solid transparent",
          borderColor: errors.phoneNumber
            ? "primary.main"
            : "transparent",
          pl: errors.phoneNumber ? 1 : 0,
        }}
      >
        <Typography
          sx={{
            ...labelStyles,
            display: "flex",
            alignItems: "center",
            gap: 0.7,
          }}
        >
          <WhatsAppIcon
            sx={{
              color: "#25D366",
              fontSize: 16,
              flexShrink: 0,
            }}
          />

          Whatsapp{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
              opacity: 1,
            }}
          >
            *
          </Box>
        </Typography>

        <TextField
          fullWidth
          size="small"
          type="tel"
          value={data.phoneNumber}
          placeholder="+91 98765 43210"
          error={Boolean(errors.phoneNumber)}
          onChange={(event) => {
            const value = event.target.value;

            // Allow digits, spaces, +, -, and parentheses.
            if (/^[0-9+\-() ]*$/.test(value)) {
              onChange("phoneNumber", value);
            }
          }}
          slotProps={{
            htmlInput: {
              inputMode: "tel",
              maxLength: 16,
            },
          }}
          sx={inputStyles}
        />

        <Typography
            sx={{
              mt: 0.5,
              color: "text.primary",
              opacity: 0.45,
              fontSize: 11,
              fontStyle: "italic",
              lineHeight: 1.4,
            }}
          >
            Strictly for communication and reminders, not for ads or promotional purposes
          </Typography>

        {errors.phoneNumber && (
          <ErrorMessage>
            Please enter a valid whatsapp number.
          </ErrorMessage>
        )}
      </Box>

      {/* ======================================================
          EMAIL — OPTIONAL
      ====================================================== */}

      <Box
        id="intake-email"
        sx={{
          mb: 1.6,
          borderLeft: errors.email
            ? "2px solid"
            : "2px solid transparent",
          borderColor: errors.email
            ? "primary.main"
            : "transparent",
          pl: errors.email ? 1 : 0,
        }}
      >
        <Typography sx={labelStyles}>
          Email Address
        </Typography>

        <TextField
          fullWidth
          size="small"
          type="email"
          value={data.email}
          placeholder="alex@example.com"
          error={Boolean(errors.email)}
          onChange={(event) =>
            onChange("email", event.target.value)
          }
          sx={inputStyles}
        />

        {errors.email && (
          <ErrorMessage>
            Please enter a valid email address.
          </ErrorMessage>
        )}
      </Box>

      {/* ======================================================
          AGE
      ====================================================== */}

      <Box
        id="intake-age"
        sx={{
          mb: 1.6,
          borderLeft: errors.age
            ? "2px solid"
            : "2px solid transparent",
          borderColor: errors.age
            ? "primary.main"
            : "transparent",
          pl: errors.age ? 1 : 0,
        }}
      >
        <Typography sx={labelStyles}>
          Age{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
            }}
          >
            *
          </Box>
        </Typography>

        <TextField
          fullWidth
          size="small"
          type="number"
          value={data.age}
          placeholder="28"
          error={Boolean(errors.age)}
          slotProps={{
            htmlInput: {
              min: 13,
              max: 100,
              step: 1,
            },
          }}
          onChange={(event) =>
            onChange("age", event.target.value)
          }
          sx={inputStyles}
        />

        {errors.age && (
          <ErrorMessage>
            Please enter your age.
          </ErrorMessage>
        )}
      </Box>

      {/* ======================================================
          GENDER
      ====================================================== */}

      <Box
        id="intake-gender"
        sx={{
          mb: 1.6,
          borderLeft: errors.gender
            ? "2px solid"
            : "2px solid transparent",
          borderColor: errors.gender
            ? "primary.main"
            : "transparent",
          pl: errors.gender ? 1 : 0,
        }}
      >
        <Typography sx={labelStyles}>
          Gender{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
            }}
          >
            *
          </Box>
        </Typography>

        <Box
          component="select"
          value={data.gender}
          onChange={(event) =>
            onChange("gender", event.target.value)
          }
          sx={{
            ...nativeSelectStyles,
            appearance: "auto",
            borderColor: errors.gender
              ? "primary.main"
              : "divider",
          }}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">
            Prefer not to say
          </option>
        </Box>

        {errors.gender && (
          <ErrorMessage>
            Please select your gender.
          </ErrorMessage>
        )}
      </Box>

      {/* ======================================================
          OCCUPATION — OPTIONAL
      ====================================================== */}

      <Box>
        <Typography sx={labelStyles}>
          Occupation
        </Typography>

        <TextField
          fullWidth
          size="small"
          value={data.occupation}
          placeholder="Software Engineer"
          onChange={(event) =>
            onChange(
              "occupation",
              event.target.value
            )
          }
          sx={inputStyles}
        />

        <Typography
          sx={{
            mt: 0.5,
            color: "text.primary",
            opacity: 0.45,
            fontSize: 11,
            fontStyle: "italic",
          }}
        >
          Helps us understand your daily activity & stress levels.
        </Typography>
      </Box>
    </Box>
  );
};

export default PersonalSection;