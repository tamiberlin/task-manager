import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import { addTask } from '../features/tasksSlice';

const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Others'];

const TaskInput = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.items);

  const [text, setText] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState('');

  const onAdd = () => {
    const norm = text.trim().toLowerCase();

    if (!norm) {
      setError('Please enter a task description');
      return;
    }

    const exists = tasks.some(
      t => t.category === category && t.text.trim().toLowerCase() === norm
    );

    if (exists) {
      setError('Task already exists in this category');
      return;
    }

    dispatch(addTask({ text: text.trim(), category }));
    setText('');
    setError('');
  };

  return (
    <Card sx={{ width: '100%' }}>
  <CardContent>
    <Typography variant="h6" gutterBottom>
      Add Task
    </Typography>

    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <TextField
        label="Task description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        margin='normal'
        sx={{ flex: 1 }}
        error={!!error}
        helperText={error}
      />

      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        margin='normal'
        sx={{ flex: 1 }}
      >
        {CATEGORIES.map(c => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </TextField>

      <Button 
        variant="contained" 
        onClick={onAdd} 
        sx={{ height: '56px' , flex: '1', backgroundColor: 'pink'}} // מתאים לגובה של TextField
      >
        Add
      </Button>
    </Box>
  </CardContent>
</Card>
  );
};

export default TaskInput;
