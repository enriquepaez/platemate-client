import RecipeCard from "../components/RecipeCard";
import { Box } from '@mui/material';

function RecipeList({ recipeList }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      gap={5}
      sx={{ my: 4 }}
    >
      {recipeList
      .sort((a, b) => b.likes.length - a.likes.length)
      .map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}
    </Box>
  );
}

export default RecipeList;