import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addHabit } from "../store/HabitSlice";

const AddHabitForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim()) {
      dispatch(addHabit({ name, frequency }));
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          maxWidth: "450px",
          margin: "0 auto",
          padding: "32px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          label="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What habit would you like to build?"
          fullWidth
          variant="filled"
          sx={{
            "& .MuiFilledInput-root": {
              borderRadius: "12px",
              backgroundColor: "rgba(0,0,0,0.05)",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.08)",
              },
              "&.Mui-focused": {
                backgroundColor: "rgba(0,0,0,0.1)",
              },
              "&:before, &:after": {
                display: "none",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(0,0,0,0.7)",
            },
            "& .MuiInputBase-input": {
              color: "#000000",
            },
          }}
        />
        <FormControl fullWidth variant="filled">
          <InputLabel sx={{ color: "rgba(0,0,0,0.7)" }}>How often?</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
            sx={{
              borderRadius: "12px",
              backgroundColor: "rgba(0,0,0,0.05)",
              color: "#000000",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.08)",
              },
              "&:before, &:after": {
                display: "none",
              },
              "& .MuiSelect-icon": {
                color: "rgba(0,0,0,0.7)",
              },
            }}
          >
            <MenuItem value="daily" sx={{ color: "#000" }}>
              Daily
            </MenuItem>
            <MenuItem value="weekly" sx={{ color: "#000" }}>
              Weekly
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          sx={{
            padding: "16px",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "12px",
            backgroundColor: "#8b5cf6",
            fontSize: "1rem",
            letterSpacing: "0.5px",
            "&:hover": {
              backgroundColor: "#7c3aed",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 16px rgba(139, 92, 246, 0.3)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          Create New Habit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
