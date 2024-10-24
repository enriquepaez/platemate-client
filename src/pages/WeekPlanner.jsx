import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from 'axios'

import { Box, Button, Modal, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material'

import DailyMeal from "../components/DailyMeal"
import ShoppingList from "../components/ShoppingList"

function WeekPlanner() {

  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [weeklyMeals, setWeeklyMeals] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [value, setValue] = useState(0)

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  useEffect(() => {
    const getWeeklyMeals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/dailyMeal`)
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
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/dailymeal`)
      navigate("/weekplanner/stepper")

    } catch (error) {
      console.log(error)
    }
  }

  const handleNextDay = () => setValue((dayofWeek) => (dayofWeek + 1) % 7)
  const handlePreviousDay = () => setValue((dayofWeek) => (dayofWeek - 1 + 7) % 7)

  if (isLoading) {
    return <Typography>...loading</Typography>
  }

  return (
    <Box component="section" sx={{ maxWidth: "80%", mx: 'auto', my: 5 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        My Week Planner
      </Typography>
      
      {!isMobile ? (
        <Tabs value={value} onChange={handleTabChange} centered>
          <Tab label="Monday" />
          <Tab label="Tuesday" />
          <Tab label="Wednesday" />
          <Tab label="Thursday" />
          <Tab label="Friday" />
          <Tab label="Saturday" />
          <Tab label="Sunday" />
        </Tabs>
      ) : null}

      {isMobile ? (
        <>
          <DailyMeal day={"Monday"} type={"planner"} />
          <DailyMeal day={"Tuesday"} type={"planner"} />
          <DailyMeal day={"Wednesday"} type={"planner"} />
          <DailyMeal day={"Thursday"} type={"planner"} />
          <DailyMeal day={"Friday"} type={"planner"} />
          <DailyMeal day={"Saturday"} type={"planner"} />
          <DailyMeal day={"Sunday"} type={"planner"} />
        </>
      ) : (
        <>
          {value === 0 && <DailyMeal day={"Monday"} />}
          {value === 1 && <DailyMeal day={"Tuesday"} />}
          {value === 2 && <DailyMeal day={"Wednesday"} />}
          {value === 3 && <DailyMeal day={"Thursday"} />}
          {value === 4 && <DailyMeal day={"Friday"} />}
          {value === 5 && <DailyMeal day={"Saturday"} />}
          {value === 6 && <DailyMeal day={"Sunday"} />}
        </>
      )}

      <Box display="flex" sx={{ marginTop: 2 }}>
        <Button onClick={handlePreviousDay} disabled={value === 0}>Previous</Button>
        <Button onClick={handleNextDay} disabled={value === days.length - 1}>Next</Button>
      </Box>

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

