import { Container, Typography } from "@mui/material";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store/store";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";
import HabitStats from "./components/HabitStats";

function App() {
  return (
    <Provider store={store}>
      <Container
        maxWidth="md"
        sx={{
          py: 4,
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          align="center"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "primary.main",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Habit Tracker
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 4, color: "text.secondary" }}
        >
          Track your daily habits and build a better routine
        </Typography>
        <hr
          style={{
            margin: "2rem 0",
            border: "none",
            height: "1px",
            background: "rgba(0,0,0,0.1)",
          }}
        />
        <AddHabitForm />
        <hr
          style={{
            margin: "2rem 0",
            border: "none",
            height: "1px",
            background: "rgba(0,0,0,0.1)",
          }}
        />
        <HabitList />
        <hr
          style={{
            margin: "2rem 0",
            border: "none",
            height: "1px",
            background: "rgba(0,0,0,0.1)",
          }}
        />
        <HabitStats />
      </Container>
    </Provider>
  );
}

export default App;
