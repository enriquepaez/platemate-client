import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Box, Grid, Typography, Paper, Button } from '@mui/material'

import DailyMeal from "../components/DailyMeal"

function WeekPlanner({ meals = [] }) {

  const [startDate, setStartDate] = useState(new Date());

  return (
    <Box component="section">
      <Link to={"/weekplanner/stepper"}>
        <Button>Start planning your week!</Button>
      </Link>

      <DailyMeal day={"Thursday"} />
    </Box>
  );
};

export default WeekPlanner;

