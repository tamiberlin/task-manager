import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import TaskRow from "./TaskRow";
import { clearAll } from "../features/tasksSlice";

const TaskTable = () => {
  const dispatch = useDispatch();

  const { items: tasks, filterText, filterCategory } = useSelector(
    (state) => state.tasks
  );

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchCategory =
      filterCategory === "ALL" ||
      !filterCategory ||
      task.category === filterCategory;

    const matchText =
      !filterText ||
      task.text.toLowerCase().includes(filterText.toLowerCase());

    return matchCategory && matchText;
  });

  // Group tasks
  const tasksByCategory = filteredTasks.reduce((groups, task) => {
    (groups[task.category] ||= []).push(task);
    return groups;
  }, {});

  const categoryNames = Object.keys(tasksByCategory).sort();

  // No tasks case
  if (categoryNames.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography>No tasks to display</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">Tasks</Typography>

              <Button
                variant="outlined"
                size="small"
                onClick={() => dispatch(clearAll())}
              >
                Clear All
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {categoryNames.map((category) => {
            const tasksInCategory = tasksByCategory[category];
            const count = tasksInCategory.length;

            return (
              <React.Fragment key={category}>
                <TableRow sx={{ backgroundColor: "rgba(205, 211, 239, 1)" }}>
                  <TableCell sx={{ fontWeight: 700, py: 1.5 }}>
                    {`${category} (${count} ${count === 1 ? "task" : "tasks"})`}
                  </TableCell>
                </TableRow>

                {tasksInCategory.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <TaskRow task={task} />
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
