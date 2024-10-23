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
  

  useEffect(() => {
    const getWeeklyMeals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/dailyMeal`)
        setWeeklyMeals(response.data)
        {console.log(response.data)}
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

  if (isLoading) {
    return <Typography>...loading</Typography>
  }

  return (
    <Box component="section" sx={{ maxWidth: "80%", mx: 'auto', my: 5 }}>
      <Box sx={{ display: "flex", width:"100%", justifyContent:"space-around", mb: 3 }}>
        <Link>
          <Button onClick={handleOpenModal} variant='contained'> Get shopping list for this week</Button>
        </Link>

        <Button onClick={handleDeleteAllMeals} variant='contained' color='error'>Delete and create a new menu</Button>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal} >
        <ShoppingList weeklyMeals={weeklyMeals} />
      </Modal>
      
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
          <DailyMeal day={"Monday"} />
          <DailyMeal day={"Tuesday"} />
          <DailyMeal day={"Wednesday"} />
          <DailyMeal day={"Thursday"} />
          <DailyMeal day={"Friday"} />
          <DailyMeal day={"Saturday"} />
          <DailyMeal day={"Sunday"} />
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
    </Box>
  )
}

export default WeekPlanner;

