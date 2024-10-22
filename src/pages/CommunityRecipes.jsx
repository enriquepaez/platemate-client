import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import RecipeList from "../components/RecipeList";

function CommunityRecipes() {

  const { loggedUserId  } = useContext(AuthContext)
  const navigate = useNavigate()

  const [recipeList, setRecipeList] = useState([])

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/recipe`)
        setRecipeList(response.data)

      } catch (error) {
        console.log(error)
      }
    }
  
    getRecipes()
  }, []);

  return (
    <Box component="section" sx={{ maxWidth: "80%", mx: 'auto', mt: 5 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Community Recipes
      </Typography>

      <RecipeList  recipeList={recipeList} />
    </Box>
  )
}

export default CommunityRecipes