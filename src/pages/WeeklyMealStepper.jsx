import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { Box, Button, Stepper, Step, StepLabel, Typography,  useMediaQuery, useTheme } from '@mui/material'

import DailyMeal from "../components/DailyMeal"

function WeeklyMealStepper() {

  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [currentStep, setCurrentStep] = useState(0)

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const handleNext = () => {
    if (currentStep < days.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (index) => {
    setCurrentStep(index)
  }

  return (
    <Box component="section" sx={{ gap: 3 }}>
      <Typography variant="h4" component="h1">
        Plan Your Week
      </Typography>

      { !isMobile ? (
        <Stepper activeStep={currentStep} sx={{width: '100%'}}>
          {days.map((day, index) => (
            <Step key={day} onClick={() => handleStepClick(index)} sx={{ cursor: 'pointer' }}>
              <StepLabel>{day}</StepLabel>
            </Step>
          ))}
        </Stepper>
      ) : (
        <Typography variant="h6" align="center" color='#1976D2'>
          {days[currentStep]}
        </Typography>
      ) }
      

      <Box display="flex" justifyContent="center">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous Day</Button>
        <Button onClick={handleNext} disabled={currentStep === days.length - 1}>Next Day</Button>
      </Box>

      <DailyMeal day={days[currentStep]} type={"stepper"} />
      
      <Button onClick={() => navigate("/weekplanner")} variant="contained" color="error">Go back</Button>
      
    </Box>
  )
}

export default WeeklyMealStepper;
