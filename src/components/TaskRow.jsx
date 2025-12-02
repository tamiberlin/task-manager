import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Paper, Box, Typography, IconButton, Chip, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import { deleteTask, toggleComplete, updateStatus } from "../features/tasksSlice";

const TaskRow = ({ task }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  if (!task) return null;

  const status = task.status;

  const colors = {
    NEW: { bg: "#ffe8f0ff", text: "#c47399ff", icon: <PlayCircleOutlineRoundedIcon /> },
    "IN PROGRESS": { bg: "#fff7d1", text: "#d9a100", icon: <PlayCircleOutlineRoundedIcon /> },
    COMPLETED: { bg: "#b4eeb7ff", text: "#338a3e", icon: <CheckCircleIcon /> },
  };

  const handleChipClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleStatusChange = (newStatus) => {
    handleClose();
    dispatch(updateStatus({ id: task.id, status: newStatus }));
  };

  const chipProps = {
    label: status,
    size: "small",
    icon: colors[status].icon,
    onClick: handleChipClick,
    sx: {
      backgroundColor: colors[status].bg,
      color: colors[status].text,
      cursor: "pointer",
      "& .MuiChip-icon": { color: colors[status].text },
    },
  };

  const actionButtons = (
    <Box>
      <IconButton onClick={() => dispatch(toggleComplete(task.id))} sx={{ color: "#338a3e" }}>
        <CheckIcon />
      </IconButton>
      <IconButton onClick={() => dispatch(deleteTask(task.id))} sx={{ color: "#f75656ff" }}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: 0.5,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        mb: 0.5,
        boxShadow: "none",
        border: "none",
      }}
    >
      <Box sx={{ flex: { sm: 0.4 }, pr: { sm: 1 }, mb: { xs: 1, sm: 0 } }}>
        <Typography
          variant="body1"
          sx={{ textDecoration: status === "COMPLETED" ? "line-through" : "none" }}
        >
          {task.text}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: { xs: "flex", sm: "none" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Chip {...chipProps} />
        {actionButtons}
      </Box>

      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          minWidth: 120,
          mr: 1,
        }}
      >
        <Chip {...chipProps} />
      </Box>

      <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
        {actionButtons}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { minWidth: 130, p: 0, bgcolor: "#f9f9f9", borderRadius: 1, boxShadow: 3 },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {["NEW", "IN PROGRESS", "COMPLETED"].map((s) => (
          <MenuItem
            key={s}
            onClick={() => handleStatusChange(s)}
            sx={{ fontSize: 13, color: colors[s].text, "&:hover": { backgroundColor: colors[s].bg } }}
          >
            {s}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
};

export default TaskRow;
