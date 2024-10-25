import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from 'axios'
import { Box, Button, Modal, Tab, Tabs, Typography, useMediaQuery, useTheme, CircularProgress } from '@mui/material'
import DailyMeal from "../components/DailyMeal"
import ShoppingList from "../components/ShoppingList"

function WeekPlanner() {

  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [weeklyMeals, setWeeklyMeals] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [value, setValue] = useState(0)

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  useEffect(() => {
    const getWeeklyMeals = async () => {
      try {
        const storedToken = localStorage.getItem('authToken')

        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/dailyMeal`, {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
        setWeeklyMeals(response.data)
        setIsLoading(false)

      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    };
  
    getWeeklyMeals()
  }, [])

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  }

  const handleDeleteAllMeals = async () => {
    try {
      const storedToken = localStorage.getItem('authToken')

      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/dailymeal`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      navigate("/weekplanner/stepper")

    } catch (error) {
      console.log(error)
    }
  }

  const handleNextDay = () => setValue((dayofWeek) => (dayofWeek + 1) % 7)
  const handlePreviousDay = () => setValue((dayofWeek) => (dayofWeek - 1 + 7) % 7)

  if (isLoading) {
    return <CircularProgress color="success" />
  }

  return (
    <Box component="section" sx={{ gap: 3 }}>
      <Typography variant="h4" component="h1">
        My Week Planner
      </Typography>

      {!isMobile ? (
        <Tabs value={value} onChange={handleTabChange} centered>
          {days.map((day, index) => (
            <Tab key={index} label={day} />
          ))}
        </Tabs>
      ) : (
        <Typography variant="h6" align="center" color='#1976D2'>
          {days[value]}
        </Typography>
      )}

      <Box display="flex" justifyContent="center">
        <Button onClick={handlePreviousDay} disabled={value === 0}>Previous Day</Button>
        <Button onClick={handleNextDay} disabled={value === days.length - 1}>Next Day</Button>
      </Box>

      <DailyMeal day={days[value]} type={"planner"} />

      <Box
        sx={{
          display: "flex",
          width:"100%",
          justifyContent: isMobile ? "center" : "space-evenly",
          alignItems: "space-evenly",
          my: 3,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 1 : 0
        }}
      >
        <Button 
          onClick={handleOpenModal} 
          variant='contained' 
          sx={{ flex: 1, mx: 1 }}
        >
          Get shopping list
        </Button>

        <Button 
          variant='contained' 
          color='success' 
          sx={{ flex: 1, mx: 1 }}
          onClick={() => navigate("/weekplanner/stepper")}
        >
          Edit weekly menu
        </Button>

        <Button 
          onClick={handleDeleteAllMeals} 
          variant='contained' 
          color='error' 
          sx={{ flex: 1, mx: 1 }}
        >
          Delete all
        </Button>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal} >
        <ShoppingList weeklyMeals={weeklyMeals} onClose={handleCloseModal} />
      </Modal>
    </Box>
  )
}

export default WeekPlanner;

