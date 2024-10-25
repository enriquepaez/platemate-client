import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import { useNavigate } from "react-router-dom"
import { Box, Button, Tab, Tabs, Typography, CircularProgress } from "@mui/material"
import RecipeList from "../components/RecipeList"

function MyRecipes() {

  const { loggedUserId  } = useContext(AuthContext)
  const navigate = useNavigate()

  const [myRecipeList, setMyRecipeList] = useState([])
  const [favoriteRecipeList, setFavoriteRecipeList] = useState([])
  const [value, setValue] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // para traer la lista de recetas creadas por el usuario
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

  // para traer la lista de recetas marcadas como favoritas por el usuario
  const getFavoriteRecipes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/recipe`)

      const favoriteRecipes = response.data.filter(recipe => recipe.likes.includes(loggedUserId))
      setFavoriteRecipeList(favoriteRecipes)
      setIsLoading(false)

    } catch (error) {
      console.log(error)
      setIsLoading(true)
    }
  }

  useEffect(() => {
    getMyRecipes();
    getFavoriteRecipes();
  }, [])

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  }

  if (isLoading) {
    return <CircularProgress color="success" />
  }

  return (
    <Box component="section">
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        My Recipes
      </Typography>

      <Tabs value={value} onChange={handleTabChange} centered>
        <Tab label="Created by me" />
        <Tab label="Favorites" />
      </Tabs>

      {value === 0 && ( // created by me tab
        <>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={3}
          >
            {myRecipeList && myRecipeList.length > 0 ? (
              <RecipeList recipeList={myRecipeList} />
            ) : (
              <Typography variant="body1" mt={2}>It looks like you don’t have any recipes created yet.</Typography>
            )}
          </Box>

          <Button
            variant="contained"
            onClick={() => navigate("/addrecipe")}
            sx={{ my: 4 }}
          >
            Add a new recipe
          </Button>
        </>
      )}

      {value === 1 && ( // favorites tab
        <>
          {favoriteRecipeList && favoriteRecipeList.length > 0 ? (
            <RecipeList recipeList={favoriteRecipeList} />
          ) : (
            <>
              <Typography sx={{ my: 4 }} variant="body1">It looks like you don’t have any favorite recipes yet.</Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/communityrecipes")}
              >
                Go to community recipes
              </Button>
            </>
          
            
          )}
        </>
      )}
    </Box>
  );
}

export default MyRecipes