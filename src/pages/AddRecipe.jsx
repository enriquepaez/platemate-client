import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/auth.context"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Button, Box, Typography } from '@mui/material'

import IngredientList from "../components/IngredientList"
import DefaultRecipeImage from "../assets/default-recipe-image.png"

function AddRecipe() {

  const { loggedUserId  } = useContext(AuthContext)
  const navigate = useNavigate()

  const [selectedIngredientList, setSelectedIngredientList] = useState([])
  const [ingredientList, setIngredientList] = useState([])

  const [recipe, setRecipe] = useState({
    name: "",
    image: "",
    createdBy: loggedUserId,
    ingredients: [],
    type: "",
    isVegan: false,
    isVegetarian: false,
    instructions: "",
    likes: []
  });
  
  // para traer los ingredientes de la DB
  useEffect(() => {
    const getIngredients = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/ingredient`)
        setIngredientList(response.data)

      } catch (error) {
        console.log(error)
      }
    }

    getIngredients()
  }, [])

  // para actualizar recipe.ingredients cuando se hagan cambios en selectedIngredientList
  useEffect(() => {
    setRecipe((prev) => ({ ...prev, ingredients: selectedIngredientList }));
  }, [selectedIngredientList]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipe({
      ...recipe,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeToSubmit = {
      ...recipe,
      image: recipe.image || DefaultRecipeImage
    };

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/recipe`, recipeToSubmit)
      navigate("/myrecipes")

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Box component="section" sx={{ maxWidth: "80%", mx: 'auto', my: 5 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Add Recipe
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Recipe name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </FormControl>

        <IngredientList
          ingredientList={ingredientList}
          selectedIngredientList={selectedIngredientList}
          setSelectedIngredientList={setSelectedIngredientList}
        />

        <FormControl fullWidth margin="normal">
          <TextField
            label="Image url"
            name="image"
            value={recipe.image}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={recipe.type}
            onChange={handleChange}
            required
          > 
            <MenuItem value="Breakfast">Breakfast</MenuItem>
            <MenuItem value="Lunch">Lunch</MenuItem>
            <MenuItem value="Dinner">Dinner</MenuItem>
            <MenuItem value="Any">Any</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              name="isVegan"
              checked={recipe.isVegan}
              onChange={handleChange}
            />
          }
          label="Vegan"
        />

        <FormControlLabel
          control={
            <Checkbox
              name="isVegetarian"
              checked={recipe.isVegetarian}
              onChange={handleChange}
            />
          }
          label="Vegetarian"
        />

        <FormControl fullWidth margin="normal">
          <TextField
            label="Instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            multiline
            rows={6}
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Recipe
        </Button>
      </Box>
    </Box>
  );
}

export default AddRecipe;
