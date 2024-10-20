import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import RecipeList from "../components/RecipeList";

function CommunityRecipes() {

  const { loggedUserId  } = useContext(AuthContext)
  const navigate = useNavigate()

  const [recipeList, setRecipeList] = useState([])

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/recipe`)
        setRecipeList(response.data)

      } catch (error) {
        console.log(error)
      }
    }
  
    getRecipes()
  }, []);

  return (
    <Box component="section" sx={{ maxWidth: "80%", mx: 'auto', mt: 5 }}>
      <h1>Community Recipes</h1>
      <RecipeList  recipeList={recipeList} />
    </Box>
  )
}

export default CommunityRecipes