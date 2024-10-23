import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import React, { useMemo } from "react";

function ShoppingList({ weeklyMeals }) {

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  const combineIngredients = (ingredientsList) => {
    const combinedIngredients = {};

    ingredientsList.forEach(({ ingredient, measure, quantity }) => {
      const key = `${ingredient._id}-${measure}`
      if (combined[key]) {
        combined[key].quantity += quantity
      } else {
        combined[key] = { ...ingredient, measure, quantity }
      }
    });

    return Object.values(combinedIngredients)
  };

  const shoppingList = useMemo(() => {
    let allIngredients = [];

    weeklyMeals.forEach((dailyMeal) => {
      ["breakfast", "lunch", "dinner"].forEach((mealType) => {
        const meal = dailyMeal[mealType]
        if (meal && meal.ingredients) {
          allIngredients = allIngredients.concat(meal.ingredients)
        }
      })
    })

    return combineIngredients(allIngredients)
  }, [weeklyMeals])

  return (
    <Box sx={style}>
      <Typography variant="h6" gutterBottom>
        Shopping List
      </Typography>
      <List>
        {shoppingList.map((ingredient) => (
          <ListItem key={ingredient._id}>
            <ListItemText
              primary={`${ingredient.name} - ${ingredient.quantity} ${ingredient.measure}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default ShoppingList