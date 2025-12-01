import React from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Box, Typography, IconButton, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { deleteTask, toggleComplete } from '../features/tasksSlice';

const TaskRow = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <Paper variant="outlined" sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="body1" sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</Typography>
        <Box mt={0.5}>
          <Chip label={task.completed ? 'Completed' : 'Active'} size="small" sx={{ mr: 1 }} />
          <Chip label={new Date(task.createdAt).toLocaleString()} size="small" />
        </Box>
      </Box>
      <Box>
        <IconButton onClick={() => dispatch(toggleComplete(task.id))} title="Mark as Complete">
          <CheckIcon />
        </IconButton>
        <IconButton onClick={() => dispatch(deleteTask(task.id))} title="Delete Task">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default TaskRow;
