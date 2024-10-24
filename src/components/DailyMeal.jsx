import { useState, useEffect } from 'react'
import axios from 'axios'
import { Typography, Box, Button, Modal, ToggleButton, ToggleButtonGroup, CircularProgress } from '@mui/material'
import SimpleRecipeCard from './SimpleRecipeCard'
import AddDailyMeal from "./AddDailyMeal"
import EditDailyMeal from "./EditDailyMeal"

function DailyMeal({ day, type }) {
  const [dailyMeal, setDailyMeal] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [currentMealType, setCurrentMealType] = useState("Breakfast")

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "space-around",
    gap: 1.5,
    borderRadius: 5,
    padding: 2,
    boxShadow: 3,
    width: 320,
    height: 320,
    backgroundColor: "#ffffff",
    border: '1px solid #e0e0e0',
  };

  useEffect(() => {
    const getDailyMeal = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/dailyMeal/day?day=${day}`)
        setDailyMeal(response.data)
        setIsLoading(false)

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

  const handleMealTypeChange = (event, newMealType) => {
    if (newMealType) {
      setCurrentMealType(newMealType)
    }
  };

  if (isLoading) {
    return (
      <Box sx={style}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (!dailyMeal) {
    return (
      <Box sx={style}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ flexGrow: 1 }}>
          {type === "stepper" ? (
            <Button variant="contained" color="success" onClick={handleOpenAddModal}>
              Create Menu
            </Button>
          ) : (
            <Typography variant="body1" align="center" sx={{ marginBottom: 2 }}>
              You haven´t got a menu for this day yet.
            </Typography>
          )}
        </Box>

        <Modal open={openAddModal} onClose={handleCloseAddModal}>
          <AddDailyMeal dayOfWeek={day} onClose={handleCloseAddModal} />
        </Modal>
      </Box>
    );
  }

  return (
    <Box sx={style}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "space-around", height: "100%" }}>
        <ToggleButtonGroup
          value={currentMealType}
          exclusive
          onChange={handleMealTypeChange}
          aria-label="meal type"
          sx={{ marginBottom: 2 }}
        >
          {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
            <ToggleButton key={mealType} value={mealType} aria-label={mealType}>
              {mealType}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
          {currentMealType === "Breakfast" && dailyMeal.breakfast && (
            <Box display="flex" flexDirection="column" alignItems="center" width="100%">
              <SimpleRecipeCard recipe={dailyMeal.breakfast} />
            </Box>
          )}
          {currentMealType === "Lunch" && dailyMeal.lunch && (
            <Box display="flex" flexDirection="column" alignItems="center" width="100%">
              <SimpleRecipeCard recipe={dailyMeal.lunch} />
            </Box>
          )}
          {currentMealType === "Dinner" && dailyMeal.dinner && (
            <Box display="flex" flexDirection="column" alignItems="center" width="100%">
              <SimpleRecipeCard recipe={dailyMeal.dinner} />
            </Box>
          )}
        </Box>
      </Box>
      {type === "stepper" && (
        <Button
          variant="contained"
          color="success"
          onClick={handleOpenEditModal}
          sx={{ width: 'auto', margin: '0 auto' }}
        >
          Edit menu
        </Button>
      )}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <EditDailyMeal mealToUpdate={dailyMeal} onClose={handleCloseEditModal} />
      </Modal>
    </Box>
  )
}

export default DailyMeal;
