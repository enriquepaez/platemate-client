import { useState } from 'react'
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material'
import DailyMeal from "../components/DailyMeal"

function WeeklyMealStepper() {
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
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Stepper activeStep={currentStep} sx={{ margin: 3, width: '100%', maxWidth: 600 }}>
        {days.map((day, index) => (
          <Step key={day} onClick={() => handleStepClick(index)} sx={{ cursor: 'pointer' }}>
            <StepLabel>{day}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <DailyMeal day={days[currentStep]} />

      <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
        <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous</Button>
        <Button onClick={handleNext} disabled={currentStep === days.length - 1}>Next</Button>
      </Box>
    </Box>
  )
}

export default WeeklyMealStepper;
