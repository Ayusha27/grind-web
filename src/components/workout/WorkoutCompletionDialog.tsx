import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";

interface WorkoutCompletionDialogProps {
  open: boolean;
  month: number;
  week: number;
  dayNumber: number;
  exerciseCount: number;
  totalSets: number;
  completedSets: number;
  earnedCalories: number;
  isSubmitting?: boolean;
  isSuccess?: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

const WorkoutCompletionDialog = ({
  open,
  month,
  week,
  dayNumber,
  exerciseCount,
  totalSets,
  completedSets,
  earnedCalories,
  isSubmitting = false,
  isSuccess = false,
  errorMessage = null,
  onClose,
  onConfirm,
}: WorkoutCompletionDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={
        isSubmitting
          ? undefined
          : onClose
      }
      fullWidth
      maxWidth="xs"
      slotProps={{
  paper: {
    sx: {
      width: "100%",
      mx: 2,
      borderRadius: "16px",
      backgroundColor: "#ffffff",
      overflow: "hidden",
    },
  },
}}
    >
      {!isSuccess ? (
        <>
          {/* =================================================
              HEADER
              ================================================= */}

          <Box
            sx={{
              position: "relative",
              px: {
                xs: 2.5,
                sm: 3,
              },
              pt: {
                xs: 2.5,
                sm: 3,
              },
              pb: 0.5,
            }}
          >
            {/* Close button */}

            <Button
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="Close"
              sx={{
                position: "absolute",
                top: 12,
                right: 12,

                minWidth: 32,
                width: 32,
                height: 32,

                p: 0,

                borderRadius: "8px",

                color: "#77716b",

                fontSize: 20,

                "&:hover": {
                  backgroundColor:
                    "#f5f2ed",
                  color: "#1c1b19",
                },
              }}
            >
              ×
            </Button>

            {/* Success/check icon */}

            <Box
              sx={{
                width: 48,
                height: 48,

                borderRadius: "50%",

                backgroundColor:
                  "#fff1ec",

                color: "#ff5b38",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontSize: 25,
                fontWeight: 900,
              }}
            >
              ✓
            </Box>

            <DialogTitle
              sx={{
                px: 0,

                pt: 1.5,
                pb: 0.5,

                fontSize: {
                  xs: 20,
                  sm: 22,
                },

                lineHeight: 1.15,

                fontWeight: 900,

                color: "#1c1b19",
              }}
            >
              Mark Workout Complete?
            </DialogTitle>

            <Typography
              sx={{
                fontSize: {
                  xs: 11,
                  sm: 12,
                },

                lineHeight: 1.5,

                color: "#77716b",

                pr: 2,
              }}
            >
              Your workout progress will
              be saved to your account.
            </Typography>
          </Box>

          {/* =================================================
              CONTENT
              ================================================= */}

          <DialogContent
            sx={{
              px: {
                xs: 2.5,
                sm: 3,
              },

              pt: 2,

              pb: 1,
            }}
          >
            {/* Workout information */}

            <Box
              sx={{
                p: 1.5,

                borderRadius: "10px",

                backgroundColor:
                  "#f8f6f3",
              }}
            >
              <SummaryRow
                label="Workout"
                value={`Month ${month} · Week ${week} · Day ${dayNumber}`}
              />

              <SummaryRow
                label="Exercises"
                value={String(
                  exerciseCount
                )}
              />

              <SummaryRow
                label="Sets completed"
                value={`${completedSets} / ${totalSets}`}
              />

              <SummaryRow
                label="Calories earned"
                value={`${earnedCalories} kcal`}
                last
              />
            </Box>

            {/* Explanation */}

            <Typography
              sx={{
                mt: 1.5,

                fontSize: {
                  xs: 9.5,
                  sm: 10.5,
                },

                lineHeight: 1.5,

                color: "#918b85",

                textAlign: "center",
              }}
            >
              All workout sets will be
              logged when you confirm.
            </Typography>

            {/* Error */}

            {errorMessage && (
              <Box
                sx={{
                  mt: 1.5,

                  px: 1.5,
                  py: 1,

                  borderRadius: "8px",

                  backgroundColor:
                    "#fff1f0",

                  border:
                    "1px solid #f2c9c5",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10,
                    lineHeight: 1.4,
                    color: "#c62828",
                    fontWeight: 700,
                  }}
                >
                  {errorMessage}
                </Typography>
              </Box>
            )}
          </DialogContent>

          {/* =================================================
              ACTIONS
              ================================================= */}

          <DialogActions
            sx={{
              px: {
                xs: 2.5,
                sm: 3,
              },

              pb: {
                xs: 2.5,
                sm: 3,
              },

              pt: 1.5,

              gap: 1,
            }}
          >
            <Button
              onClick={onClose}
              disabled={isSubmitting}
              variant="outlined"
              sx={{
                flex: 1,

                minHeight: 42,

                borderRadius: "9px",

                borderColor: "#d8d3cd",

                color: "#706b67",

                fontSize: 11,

                fontWeight: 700,

                textTransform:
                  "none",

                "&:hover": {
                  borderColor:
                    "#c8c2bb",

                  backgroundColor:
                    "#f8f6f3",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={onConfirm}
              disabled={isSubmitting}
              variant="contained"
              sx={{
                flex: 1,

                minHeight: 42,

                borderRadius: "9px",

                backgroundColor:
                  "#ff5b38",

                color: "#ffffff",

                fontSize: 11,

                fontWeight: 800,

                textTransform:
                  "none",

                boxShadow: "none",

                "&:hover": {
                  backgroundColor:
                    "#ed4e30",

                  boxShadow: "none",
                },

                "&.Mui-disabled": {
                  backgroundColor:
                    "#ddd8d2",

                  color: "#ffffff",
                },
              }}
            >
              {isSubmitting
                ? "Saving..."
                : "Mark Complete"}
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          {/* =================================================
              SUCCESS STATE
              ================================================= */}

          <Box
            sx={{
              px: {
                xs: 2.5,
                sm: 3,
              },

              pt: {
                xs: 3,
                sm: 3.5,
              },

              pb: 1,

              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 58,
                height: 58,

                mx: "auto",

                borderRadius: "50%",

                backgroundColor:
                  "#effbf3",

                color: "#20a957",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontSize: 31,
                fontWeight: 900,
              }}
            >
              ✓
            </Box>

            <DialogTitle
              sx={{
                px: 0,

                pt: 1.5,
                pb: 0.5,

                fontSize: {
                  xs: 20,
                  sm: 22,
                },

                fontWeight: 900,

                color: "#1c1b19",
              }}
            >
              Workout Saved
            </DialogTitle>

            <Typography
              sx={{
                fontSize: {
                  xs: 11,
                  sm: 12,
                },

                color: "#77716b",

                lineHeight: 1.5,
              }}
            >
              Your workout progress has
              been recorded successfully.
            </Typography>
          </Box>

          <DialogContent
            sx={{
              px: {
                xs: 2.5,
                sm: 3,
              },

              pt: 1.5,

              pb: 1,
            }}
          >
            <Box
              sx={{
                p: 1.5,

                borderRadius: "10px",

                backgroundColor:
                  "#f5faf7",

                border:
                  "1px solid #dcefe3",
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,

                  fontWeight: 800,

                  color: "#25864c",

                  textAlign: "center",
                }}
              >
                {completedSets} of{" "}
                {totalSets} sets
                completed
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,

                  fontSize: 10,

                  color: "#6d766f",

                  textAlign: "center",
                }}
              >
                {earnedCalories} kcal
                earned
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions
            sx={{
              px: {
                xs: 2.5,
                sm: 3,
              },

              pb: {
                xs: 2.5,
                sm: 3,
              },

              pt: 1.5,
            }}
          >
            <Button
              onClick={onClose}
              fullWidth
              variant="contained"
              sx={{
                minHeight: 42,

                borderRadius: "9px",

                backgroundColor:
                  "#ff5b38",

                color: "#ffffff",

                fontSize: 11,

                fontWeight: 800,

                textTransform:
                  "none",

                boxShadow: "none",

                "&:hover": {
                  backgroundColor:
                    "#ed4e30",

                  boxShadow: "none",
                },
              }}
            >
              Continue
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

/* ===========================================================
   SUMMARY ROW
   =========================================================== */

interface SummaryRowProps {
  label: string;
  value: string;
  last?: boolean;
}

const SummaryRow = ({
  label,
  value,
  last = false,
}: SummaryRowProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          justifyContent:
            "space-between",

          gap: 1,

          py: 0.8,
        }}
      >
        <Typography
          sx={{
            fontSize: 10,

            color: "#77716b",

            flexShrink: 0,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: 10,

            fontWeight: 800,

            color: "#282522",

            textAlign: "right",
          }}
        >
          {value}
        </Typography>
      </Box>

      {!last && (
        <Divider
          sx={{
            borderColor:
              "#e8e3de",
          }}
        />
      )}
    </>
  );
};

export default WorkoutCompletionDialog;