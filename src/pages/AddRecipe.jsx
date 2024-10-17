import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context";

import { TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Button, Box } from '@mui/material';

function AddRecipe() {

  const { loggedUserId  } = useContext(AuthContext)

  const [recipe, setRecipe] = useState({
    name: "",
    createdBy: {loggedUserId},
    ingredients: [],
    type: "",
    isVegan: false,
    isVegetarian: false,
    instructions: "",
    likes: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipe({
      ...recipe,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(recipe);
    //TODO lógica para POST
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Recipe Name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          required
        />
      </FormControl>

      //TODO ingredients

      <FormControl fullWidth margin="normal">
        <TextField
          label="Image Url"
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
  );
}

export default AddRecipe;
