import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';

import RecipeCard from "../components/RecipeCard";

function MyRecipes() {

  const { loggedUserId  } = useContext(AuthContext)
  const navigate = useNavigate()

  const [recipeList, setRecipeList] = useState(null)

  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_SERVER_URL}/recipe/user/${loggedUserId}`)
    .then((response) => {
      console.log(response.data)
      setRecipeList(response.data)
    })
    .catch(error => console.log(error))
  }, [])

  return (
    <div>
      <h1>Mis Recetas</h1>
      <Button variant="contained" onClick={() => navigate("/addrecipe")}>Add a new recipe</Button>
        {recipeList && recipeList.length > 0 ? (
          <ul>
            {recipeList.map((recipe) => (
              <RecipeCard recipe={recipe} />
            ))}
          </ul>
        ) : (
          <p>No tienes recetas creadas aún.</p>
        )}
    </div>

  )
}

export default MyRecipes