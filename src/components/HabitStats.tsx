import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchHabits, Habit } from "../store/HabitSlice";
import { LinearProgress, Paper, Typography } from "@mui/material";

const HabitStats: React.FC = () => {
  const { habits, isLoading, error } = useSelector(
    (state: RootState) => state.habits
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];

    return habits.filter((habit) => habit.completedDates.includes(today))
      .length;
  };

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

  const getLongestStreak = () => {
    return Math.max(...habits.map(getStreak), 0);
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mt: 4,
        borderRadius: 3,
        background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 700,
          letterSpacing: 1,
          mb: 4,
          textTransform: "uppercase",
        }}
      >
        Habit Statistics
      </Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <Typography variant="overline" sx={{ opacity: 0.8 }}>
            Total Habits
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {habits.length}
          </Typography>
        </div>
        <div>
          <Typography variant="overline" sx={{ opacity: 0.8 }}>
            Completed Today
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {getCompletedToday()}
          </Typography>
        </div>
        <div>
          <Typography variant="overline" sx={{ opacity: 0.8 }}>
            Longest Streak
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {getLongestStreak()}
          </Typography>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-10%",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          transform: "translateY(-50%)",
        }}
      />
    </Paper>
  );
};

export default HabitStats;
