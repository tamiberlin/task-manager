import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography, Stack, Box } from '@mui/material';
import TaskInput from './TaskInput';
import TaskFilters from './TaskFilters';
import TaskTable from './TaskTable';
import { loadInitial } from '../features/tasksSlice';

const TaskManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitial());
  }, [dispatch]);

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // מרכז את התוכן בתוך הקונטיינר
      }}
    >
      <Typography variant="h4" gutterBottom>
        Task Manager
      </Typography>

      <Stack spacing={3} sx={{ width: '100%' }}>
        <Box sx={{ width: '100%' }}>
          <TaskInput />
        </Box>

        <Box sx={{ width: '100%' }}>
          <TaskFilters />
        </Box>

        <Box sx={{ width: '100%' }}>
          <TaskTable />
        </Box>
      </Stack>
    </Container>
  );
};

export default TaskManager;
