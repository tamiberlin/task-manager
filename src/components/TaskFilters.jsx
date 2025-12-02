import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  TextField,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { setFilterText, setFilterCategory } from "../features/tasksSlice";

const CATEGORIES = ["ALL", "Work", "Personal", "Shopping", "Others"];

const TaskFilters = () => {
  const dispatch = useDispatch();
  const { filterText, filterCategory } = useSelector((s) => s.tasks);

  const handleText = (e) => dispatch(setFilterText(e.target.value));
  const handleCategory = (e) => dispatch(setFilterCategory(e.target.value));

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filter Tasks
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            label="Search"
            value={filterText}
            onChange={handleText}
            margin="normal"
            sx={{ flex: 1 }}
          />

          <TextField
            select
            label="Filter by Category"
            value={filterCategory}
            onChange={handleCategory}
            margin="normal"
            sx={{ flex: 1 }}
          >
            {CATEGORIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c === "ALL" ? "All categories" : c}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskFilters;
