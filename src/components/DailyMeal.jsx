import { useState, useEffect } from 'react'
import axios from 'axios'

import { Typography, Box, Button, Modal, useMediaQuery, useTheme } from '@mui/material'

import SimpleRecipeCard from './SimpleRecipeCard'
import AddDailyMeal from "./AddDailyMeal"
import EditDailyMeal from "./EditDailyMeal"

function DailyMeal({ day, type }) {

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [dailyMeal, setDailyMeal] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const style = {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    borderRadius: 5,
    my: 2,
    padding: 2,
    boxShadow: 3,
    width: isMobile ? "100%" : 542,
    maxWidth: "90%",
    height: isMobile ? "auto" : 330,
    backgroundColor: "#ffffff",
    border: '1px solid #e0e0e0',
  }

  const buttonStyle = {
    borderRadius: 3,
    padding: '10px 20px'
  }

  useEffect(() => {
    const getDailyMeal = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/dailyMeal/day?day=${day}`)
        setDailyMeal(response.data)
        setIsLoading(false)
        setOpenAddModal(false)
        setOpenEditModal(false)

      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    };
  
    getDailyMeal();
  }, [day]);

  const handleOpenAddModal = () => setOpenAddModal(true)
  const handleCloseAddModal = () => setOpenAddModal(false)
  const handleOpenEditModal = () => setOpenEditModal(true)
  const handleCloseEditModal = () => setOpenEditModal(false)

  if (isLoading) {
    return (
      <Box sx={style}>
        <Typography variant="h6" align="center">...loading</Typography>
      </Box>
    );
  }

  if (!dailyMeal) {
    return (
      <Box sx={style}>
        <Typography variant="h6" align="center">{day}</Typography>

        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ flexGrow: 1 }}>
          {type === "stepper" ? (
            <Button variant="contained" color="success" sx={buttonStyle} onClick={handleOpenAddModal}>
              Create Menu
            </Button>
          ) : (
            <Typography variant="body1" align="center" sx={{ marginBottom: 2 }}>
              Looks like you haven't scheduled your meals for this day yet.
            </Typography>
          )}
        </Box>

        <Modal open={openAddModal} onClose={handleCloseAddModal} >
          <AddDailyMeal dayOfWeek={day} onClose={handleCloseAddModal} />
        </Modal>
      </Box>
    )
  }

  if (isLoading) {
    return <Typography>...loading</Typography>
  }

  return (
    <Box sx={style}>
      <Typography variant="h6" align="center" gutterBottom>{day}</Typography>

      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent={"space-around"} gap={2} sx={{ flexGrow: 1 }}>
        {["Breakfast", "Lunch", "Dinner"].map((mealType, index) => (
          <Box key={index} display="flex" flexDirection="column" alignItems="center" width="100%">
            <Typography variant="body1" align="center" sx={{ fontWeight: 'bold', marginBottom: 1 }}>{mealType}</Typography>
            <SimpleRecipeCard recipe={dailyMeal[mealType.toLowerCase()]} />
          </Box>
        ))}
      </Box>
      
      {type === "stepper" ? (
        <Button variant="contained" color="success" sx={buttonStyle} onClick={handleOpenEditModal}>Edit menu</Button>
      ) : null}
      
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <EditDailyMeal mealToUpdate={dailyMeal} onClose={handleCloseEditModal} />
      </Modal>
    </Box>
  );
}

export default DailyMeal;
