import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography, Stack } from '@mui/material';
import TaskInput from './TaskInput';
import TaskFilters from './TaskFilters';
import TaskTable from './TaskTable';
import { loadInitial } from '../features/tasksSlice';

const containerStyles = {
  px: 6,
  mt: 4,
  mb: 6,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const TaskManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitial());
  }, []); 
  
  return (
    <Container maxWidth="lg" sx={containerStyles}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: 'rgba(109, 131, 240, 1)' }}
      >
        Task Manager
      </Typography>

      <Stack spacing={3} sx={{ width: '100%' }}>
        <TaskInput />
        <TaskFilters />
        <TaskTable />
      </Stack>
    </Container>
  );
};

export default TaskManager;
