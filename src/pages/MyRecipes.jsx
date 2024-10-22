import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

import { Box, Button, Tab, Tabs, Typography } from "@mui/material";

import RecipeList from "../components/RecipeList";

function MyRecipes() {

  const { loggedUserId  } = useContext(AuthContext)
  const navigate = useNavigate()

  const [myRecipeList, setMyRecipeList] = useState([])
  const [favoriteRecipeList, setFavoriteRecipeList] = useState([])
  const [value, setValue] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // para traer la lista de recetas creadas por el usuario
  useEffect(() => {
    const getMyRecipes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/recipe/user/${loggedUserId}`)
        setMyRecipeList(response.data)
        setIsLoading(false)

      } catch (error) {
        console.log(error)
        setIsLoading(true)
      }
    }
  
    getMyRecipes()
  }, []);

  // para traer la lista de recetas marcadas como favoritas por el usuario
  useEffect(() => {
    const getFavoriteRecipes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/recipe`)
        setFavoriteRecipeList(response.data.filter(recipe => recipe.likes.includes(loggedUserId)))
        setIsLoading(false)

      } catch (error) {
        console.log(error)
        setIsLoading(true)
      }
    }
  
    getFavoriteRecipes()
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  }

  if (isLoading) {
    return <Typography>...loading</Typography>
  }

  return (
    <Box component="section" sx={{ maxWidth: "80%", mx: 'auto', mt: 5 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        My Recipes
      </Typography>

      <Tabs value={value} onChange={handleTabChange} centered>
        <Tab label="Created by me" />
        <Tab label="Favorites" />
      </Tabs>

      {value === 0 && ( // created by me tab
        <>
          <Button
            variant="contained"
            onClick={() => navigate("/addrecipe")}
            sx={{ my: 4 }}
          >
            Add a new recipe
          </Button>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={5}
          >
            {myRecipeList && myRecipeList.length > 0 ? (
              <RecipeList recipeList={myRecipeList} />
            ) : (
              <Typography variant="body1">It looks like you don’t have any recipes created yet.</Typography>
            )}
          </Box>
        </>
      )}

      {value === 1 && ( // favorites tab
        <>
          {favoriteRecipeList && favoriteRecipeList.length > 0 ? (
            <RecipeList recipeList={favoriteRecipeList} />
          ) : (
            <Typography variant="body1">Here are your favorite recipes!</Typography>
          )}
        </>
      )}
    </Box>
  );
}

export default MyRecipes