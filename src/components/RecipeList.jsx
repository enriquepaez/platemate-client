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
    >
      {recipeList.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}
    </Box>
  );
}

export default RecipeList;