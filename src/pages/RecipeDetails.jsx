import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, CardMedia, Typography, Avatar, Chip, Stack, CircularProgress } from '@mui/material';
import { red, green } from '@mui/material/colors';

function RecipeDetails() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/recipe/${recipeId}`)
        setRecipe(response.data)
        setIsLoading(false)
        
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (isLoading) {
    return <CircularProgress color="success" />
  }

  if (!recipe) {
    return <Typography>Recipe not found</Typography>
  }

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <CardMedia
        component="img"
        height="300"
        image={recipe.image || 'https://via.placeholder.com/800x300.png?text=No+Image'}
        alt={recipe.name}
      />

      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">{recipe.name}</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar alt={recipe.createdBy.username} src={recipe.createdBy.image} sx={{ bgcolor: red[500] }} />
              <Typography variant="subtitle1">
                {recipe.createdBy.username}
              </Typography>
            </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Created on: {new Date(recipe.creationDate).toLocaleDateString()}
        </Typography>

        <Box mt={2}>
          <Chip label={recipe.type} sx={{ bgcolor: 'primary.main', color: 'white' }} />
          {(recipe.isVegan || recipe.isVegetarian) && (
            <Chip label={recipe.isVegan ? "Vegan" : "Vegetarian"} sx={{ bgcolor: green[500], color: 'white', ml: 2 }} />
          )}
        </Box>

        <Typography variant="h6" mt={3}>Ingredients</Typography>
        {recipe.ingredients.map((ingredient, index) => (
          <Typography key={index} variant="body2" sx={{ ml: 2 }}>
            - {ingredient.quantity} {ingredient.measure} of {ingredient.ingredient.name}
          </Typography>
        ))}

        <Typography variant="h6" mt={3}>Instructions</Typography>
        <Typography variant="body1" paragraph>
          {recipe.instructions}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {recipe.likes.length} {recipe.likes.length === 1 ? 'Like' : 'Likes'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RecipeDetails;
