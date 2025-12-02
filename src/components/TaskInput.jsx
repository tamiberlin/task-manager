import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  FormHelperText,
} from '@mui/material';
import { addTask } from '../features/tasksSlice';

const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Others'];

const normalize = (str) => str.trim().toLowerCase();

const TaskInput = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);

  const [text, setText] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState('');

  const onAdd = () => {
    const norm = normalize(text);

    if (!norm) {
      setError('Please enter a task description');
      return;
    }

    const exists = tasks.some(
      (t) => normalize(t.text) === norm && t.category === category
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
          Add New Task
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'flex-start',
            flexWrap: 'nowrap',

            '@media (max-width:700px)': {
              flexWrap: 'wrap',
              '& .half': { flex: '1 1 calc(50% - 8px)' },
              '& .full': { flex: '1 1 100%', width: '100%' },
            },
          }}
        >
          <Box sx={{ flex: 1 }} className="half">
            <TextField
              label="Task description"
              value={text}
              onChange={(e) => {
                if (error) setError('');
                setText(e.target.value);
              }}
              margin="normal"
              fullWidth
              error={!!error}
            />

            <FormHelperText
              error={!!error}
              sx={{
                minHeight: '1.1em',
                visibility: error ? 'visible' : 'hidden',
                mt: 0.5,
              }}
            >
              {error || ' '}
            </FormHelperText>
          </Box>

          <TextField
            className="half"
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            margin="normal"
            sx={{ flex: 1 }}
          >
            {CATEGORIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>

          <Button
            className="full"
            variant="contained"
            onClick={onAdd}
            sx={{
              mb: '16px',
              flex: '1',
              height: '56px',
              alignSelf: 'center',
              backgroundColor: 'rgba(109, 131, 240, 1)',
              '&:hover': { backgroundColor: 'rgba(90, 110, 230, 1)' },
            }}
          >
            + Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskInput;
