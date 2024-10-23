import axios from "axios"
import { useEffect, useState } from "react"


import { Box, Typography } from "@mui/material";

import RecipeList from "../components/RecipeList";

function CommunityRecipes() {

  const [recipeList, setRecipeList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
  
    getRecipes()
  }, []);

  if (isLoading || recipeList.length  === 0) {
    return <Typography>...loading</Typography>
  }

  return (
    <Box component="section" sx={{ maxWidth: "80%", mx: 'auto', mt: 5 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Community Recipes
      </Typography>

      <RecipeList recipeList={recipeList} />
    </Box>
  )
}

export default CommunityRecipes