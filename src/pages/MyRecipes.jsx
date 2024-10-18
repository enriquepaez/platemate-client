import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import RecipeCard from "../components/RecipeCard";

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
    <Box className="my-recipes-container" component="section" sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <h1>My Recipes</h1>
      <Button variant="contained" onClick={() => navigate("/addrecipe")}>Add a new recipe</Button>
        {recipeList && recipeList.length > 0 ? (
          <ul>
            {recipeList.map((recipe) => (
              <RecipeCard recipe={recipe} />
            ))}
          </ul>
        ) : (
          <p>It looks like you don’t have any recipes created yet.</p>
        )}
    </Box>

  )
}

export default MyRecipes