import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, TextField, MenuItem, Box, Stack } from '@mui/material';
import { setFilterText, setFilterCategory } from '../features/tasksSlice';

const CATEGORIES = ['ALL', 'Work', 'Personal', 'Shopping', 'Others'];

const TaskFilters = () => {
  const dispatch = useDispatch();
  const filterText = useSelector(s => s.tasks.filterText);
  const filterCategory = useSelector(s => s.tasks.filterCategory);

  return (
    <Card sx={{ width: '100%'}}>
      <CardContent>
        <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
          <TextField
            label="Search"
            value={filterText}
            onChange={(e) => dispatch(setFilterText(e.target.value))}
            margin="normal"
            sx={{flex:1}}
          />

          <TextField
            select
            label="Category"
            value={filterCategory}
            onChange={(e) => dispatch(setFilterCategory(e.target.value))}
            margin="normal"
            sx={{flex:1}}
          >
            {CATEGORIES.map(c => (
              <MenuItem key={c} value={c}>
                {c === 'ALL' ? 'All categories' : c}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskFilters;
