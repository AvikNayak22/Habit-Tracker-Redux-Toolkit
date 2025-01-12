import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { CheckCircle, Delete } from "@mui/icons-material";
import { Habit, removeHabit, toggleHabit } from "../store/HabitSlice";

const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();

  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];

      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
      {habits.map((habit) => {
        const isCompleted = habit.completedDates.includes(today);
        return (
          <Paper
            key={habit.id}
            elevation={3}
            sx={{
              p: 2.5,
              borderRadius: 4,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
              },
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: "#1f2937",
                      letterSpacing: "-0.5px",
                      mb: 1,
                    }}
                  >
                    {habit.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#6b7280",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    {habit.frequency}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#4b5563",
                        mb: 1,
                      }}
                    >
                      {getStreak(habit)} Day Streak
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(getStreak(habit) / 30) * 100}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#e5e7eb",
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
                          borderRadius: 5,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    justifyContent: "flex-end",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() =>
                      dispatch(toggleHabit({ id: habit.id, date: today }))
                    }
                    variant={isCompleted ? "contained" : "outlined"}
                    sx={{
                      borderRadius: 3,
                      py: 1,
                      px: 3,
                      textTransform: "none",
                      fontWeight: 600,
                      ...(isCompleted
                        ? {
                            background:
                              "linear-gradient(90deg, #059669 0%, #10b981 100%)",
                          }
                        : {
                            borderColor: "#e5e7eb",
                            color: "#4b5563",
                            "&:hover": {
                              background: "#f9fafb",
                              borderColor: "#d1d5db",
                            },
                          }),
                    }}
                    startIcon={<CheckCircle sx={{ fontSize: 20 }} />}
                  >
                    {isCompleted ? "Completed" : "Mark Complete"}
                  </Button>
                  <Button
                    onClick={() => dispatch(removeHabit({ id: habit.id }))}
                    variant="text"
                    sx={{
                      borderRadius: 3,
                      py: 1,
                      px: 2,
                      minWidth: "auto",
                      color: "#ef4444",
                      "&:hover": {
                        background: "#fef2f2",
                      },
                    }}
                  >
                    <Delete sx={{ fontSize: 20 }} />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        );
      })}
    </Box>
  );
};

export default HabitList;
