import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

interface WorkoutHeaderProps {
  dayNumber: number;
  dayName: string;
  exerciseCount: number;
  totalSets: number;
  completedSets: number;
  progress: number;
  onReset: () => void;
}

const WorkoutHeader = ({
  dayNumber,
  dayName,
  exerciseCount,
  totalSets,
  completedSets,
  progress,
  onReset,
}: WorkoutHeaderProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        border: "1.5px solid #e0dbd4",
        borderRadius: "14px",
        boxShadow: "0 2px 12px rgba(26,23,20,.08)",
        px: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
        py: {
          xs: 2,
          md: 2.25,
        },
      }}
    >
      {/* =====================================================
          MAIN HEADER ROW
      ===================================================== */}

      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          alignItems: {
            xs: "stretch",
            md: "center",
          },
          justifyContent: "space-between",
          gap: {
            xs: 2,
            md: 0,
          },
        }}
      >
        {/* ===================================================
            LEFT SIDE
        =================================================== */}

        <Stack spacing={0.7}>
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              color: "#ff5c35",
            }}
          >
            • DAY {dayNumber}
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 19,
                sm: 21,
                md: 23,
              },
              lineHeight: 1.15,
              fontWeight: 800,
              color: "#1a1714",
            }}
          >
            {dayName}
          </Typography>

          {/* ===============================================
              WORKOUT STATS
          =============================================== */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                color: "#6b6560",
              }}
            >
              <strong>{exerciseCount}</strong>{" "}
              exercises
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                color: "#6b6560",
              }}
            >
              <strong>{totalSets}</strong>{" "}
              total sets
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                color:
                  completedSets > 0
                    ? "#15803d"
                    : "#6b6560",
              }}
            >
              <strong>{completedSets}</strong>{" "}
              done
            </Typography>
          </Box>
        </Stack>

        {/* ===================================================
            RIGHT SIDE
        =================================================== */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {
              xs: "space-between",
              md: "flex-end",
            },
            gap: 2,
          }}
        >
          {/* ===============================================
              CIRCULAR PROGRESS
          =============================================== */}

          <Box
            sx={{
              width: {
                xs: 64,
                md: 72,
              },
              height: {
                xs: 64,
                md: 72,
              },
              borderRadius: "50%",

              background: `conic-gradient(
                #ff5c35 ${progress}%,
                #eee9e3 ${progress}% 100%
              )`,

              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: "calc(100% - 7px)",
                height: "calc(100% - 7px)",
                borderRadius: "50%",

                backgroundColor: "#fff",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 15,
                  lineHeight: 1,
                  fontWeight: 900,
                  color: "#1a1714",
                }}
              >
                {progress}%
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: 8,
                  color: "#77716b",
                }}
              >
                {completedSets}/{totalSets}
              </Typography>
            </Box>
          </Box>

          {/* ===============================================
              RESET BUTTON
          =============================================== */}

          <Button
            variant="outlined"
            onClick={onReset}
            startIcon={
              <RestartAltOutlinedIcon
                sx={{
                  fontSize: 15,
                }}
              />
            }
            sx={{
              minWidth: "auto",
              height: 32,
              px: 1.3,

              borderRadius: "8px",

              borderColor: "#ddd7d0",
              color: "#6b6560",

              fontSize: 10,
              fontWeight: 700,

              textTransform: "none",
              whiteSpace: "nowrap",

              "&:hover": {
                borderColor: "#ff5c35",
                color: "#ff5c35",
                backgroundColor:
                  "rgba(255,92,53,.04)",
              },
            }}
          >
            Reset Day
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkoutHeader;