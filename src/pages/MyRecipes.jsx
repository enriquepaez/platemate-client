import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import RecipeList from "../components/RecipeList";

function MyRecipes() {

  const { loggedUserId  } = useContext(AuthContext)
  const navigate = useNavigate()

  const [recipeList, setRecipeList] = useState([])

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/recipe/user/${loggedUserId}`)
        setRecipeList(response.data)

      } catch (error) {
        console.log(error)
      }
    }
  
    getRecipes()
  }, []);

  return (
    <Box component="section" sx={{ maxWidth: "80%", mx: 'auto', mt: 5 }}>
      <h1>My Recipes</h1>
      <Button variant="contained" onClick={() => navigate("/addrecipe")}>Add a new recipe</Button>
      <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      gap={5}
    >
      {recipeList && recipeList.length > 0 ? (
        <RecipeList recipeList={ recipeList } />
      ) : (
        <Typography variant="body1">It looks like you don’t have any recipes created yet.</Typography>
      )}
    </Box>
    </Box>
  )
}

export default MyRecipes