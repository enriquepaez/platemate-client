import axios from "axios"
import { useEffect, useState } from "react"
import { Box, Typography, CircularProgress } from "@mui/material";
import RecipeList from "../components/RecipeList";

function CommunityRecipes() {

  const [recipeList, setRecipeList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getRecipes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/recipe`)
      setRecipeList(response.data)
      setIsLoading(false)

    } catch (error) {
      console.log(error)
      setIsLoading(true)
    }
  }

  useEffect(() => {
    getRecipes()
  }, [])

  if (isLoading) {
    return <CircularProgress color="success" />
  }

  return (
    <Box component="section">
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Community Recipes
      </Typography>

      {recipeList && recipeList.length > 0 ? (
        <RecipeList recipeList={recipeList} />
      ) : (
        <Typography sx={{ my: 4 }} variant="body1">
          It looks like the recipes database is empty. Go to your recipes and create the first!
        </Typography>
      )}
    </Box>
  )
}

export default CommunityRecipes