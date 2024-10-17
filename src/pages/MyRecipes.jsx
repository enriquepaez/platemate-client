import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function MyRecipes() {

  const params = useParams()

  const [recipeList, setRecipeList] = useState(null)

  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_SERVER_URL}/recipe/user/${params.userId}`)
    .then((response) => {
      console.log(response.data)
      //setRecipeList(response.data)
    })
    .catch(error => console.log(error))
  }, [])

  return (
    <div>
      <h1>Mis Recetas</h1>
        {recipeList && recipeList.length > 0 ? (
          <ul>
            {recipeList.map((recipe) => (
              <li key={recipe._id}>
                <h2>{recipe.name}</h2>
                <p>Tipo: {recipe.type}</p>
                <p>Instrucciones: {recipe.instructions}</p>
                <p>Creado por: {recipe.createdBy?.name}</p>
                <p>Ingredientes:</p>
                <ul>
                  {recipe.ingredients.map((ingredientItem) => (
                    <li key={ingredientItem.ingredient._id}>
                      {ingredientItem.ingredient.name} - {ingredientItem.quantity} {ingredientItem.measure}
                    </li>
                  ))}
                </ul>
                <p>{recipe.isVegan ? "Vegan" : "Not Vegan"}</p>
                <p>{recipe.isVegetarian ? "Vegetarian" : "Not Vegetarian"}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes recetas creadas aún.</p>
        )}
    </div>

  )
}

export default MyRecipes