import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';
import TaskRow from './TaskRow';

const TaskTable = () => {
  const { items, filterText, filterCategory } = useSelector(s => s.tasks);

  // apply filters
  const filtered = items.filter(t => {
    if (filterCategory && filterCategory !== 'ALL' && t.category !== filterCategory) return false;
    if (filterText && !t.text.toLowerCase().includes(filterText.toLowerCase())) return false;
    return true;
  });

  // group by category
  const groups = filtered.reduce((acc, task) => {
    (acc[task.category] = acc[task.category] || []).push(task);
    return acc;
  }, {});

  const categories = Object.keys(groups).sort();

  if (filtered.length === 0) {
    return <Typography>No tasks to display</Typography>;
  }

  return (
    <Box>
      {categories.map(category => (
        <Card key={category} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{category} — {groups[category].length} tasks</Typography>
            <Divider sx={{ my: 1 }} />
            {groups[category].map(task => (
              <Box key={task.id} sx={{ mb: 1 }}>
                <TaskRow task={task} />
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default TaskTable;
