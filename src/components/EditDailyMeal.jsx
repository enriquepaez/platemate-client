import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"

import { FormControl, InputLabel, Select, MenuItem, Button, Box, Typography} from '@mui/material'

function EditDailyMeal({ mealToUpdate, onClose }) {

  const { loggedUserId  } = useContext(AuthContext)

  const [dailyMeal, setDailyMeal] = useState(mealToUpdate)
  const [myRecipeList, setMyRecipeList] = useState([])
  const [favoriteRecipeList, setFavoriteRecipeList] = useState([])
  const [combinedRecipeList, setCombinedRecipeList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // para traer la lista de recetas creadas por el usuario
  useEffect(() => {
    const getMyRecipes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/recipe/user/${loggedUserId}`)
        setMyRecipeList(response.data)
        setIsLoading(false)

      } catch (error) {
        console.log(error)
        setIsLoading(true)
      }
    }
  
    getMyRecipes()
  }, [])

  // para traer la lista de recetas marcadas como favoritas por el usuario
  useEffect(() => {
    const getFavoriteRecipes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/recipe`)
        setFavoriteRecipeList(response.data.filter(recipe => recipe.likes.includes(loggedUserId)))
        setIsLoading(false)

      } catch (error) {
        console.log(error)
        setIsLoading(true)
      }
    }
  
    getFavoriteRecipes()
  }, [])

  // para combinar los 2 listados anteriores
  useEffect(() => {
    const combinedRecipes = [...myRecipeList, ...favoriteRecipeList]
    setCombinedRecipeList(combinedRecipes)
  }, [myRecipeList, favoriteRecipeList])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDailyMeal({
      ...dailyMeal,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storedToken = localStorage.getItem('authToken')

      await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/dailymeal/${dailyMeal._id}`, dailyMeal, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      onClose()

    } catch (error) {
      console.log(error)
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  if (isLoading) {
    return <Typography>...loading</Typography>
  }

  return (
    <Box sx={style}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Edit Meal
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: "600px", mx: 'auto' }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Breakfast</InputLabel>

          <Select
            label="Breakfast"
            name="breakfast"
            value={dailyMeal.breakfast}
            onChange={handleChange}
            required
          >
            {combinedRecipeList
            .filter((recipe) => recipe.type === "Any" || recipe.type === "Breakfast")
            .map((recipe) => (
              <MenuItem key={recipe.id} value={recipe}>
                {recipe.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Lunch</InputLabel>
          
          <Select
            label="Lunch"
            name="lunch"
            value={dailyMeal.lunch}
            onChange={handleChange}
            required
          >
            {combinedRecipeList
            .filter((recipe) => recipe.type === "Any" || recipe.type === "Lunch")
            .map((recipe) => (
              <MenuItem key={recipe.id} value={recipe}>
                {recipe.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Dinner</InputLabel>
          
          <Select
            label="Dinner"
            name="dinner"
            value={dailyMeal.dinner}
            onChange={handleChange}
            required
          >
            {combinedRecipeList
            .filter((recipe) => recipe.type === "Any" || recipe.type === "Dinner")
            .map((recipe) => (
              <MenuItem key={recipe.id} value={recipe}>
                {recipe.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Edit Meal
        </Button>
      </Box>
    </Box>
  )
}

export default EditDailyMeal