import { useMemo } from "react";
import { usePDF } from 'react-to-pdf';

import { Box, Button, Typography, List, ListItem, ListItemText } from "@mui/material";

import capitalize from "../utils/capitalize";

function ShoppingList({ weeklyMeals, onClose }) {
  
  const { toPDF, targetRef } = usePDF({ filename: 'shopping-list.pdf' });

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 400,
    bgcolor: "#fff",
    border: "2px dashed #000",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    p: 2,
    overflowY: "auto",
    maxHeight: 600,
  };

  const combineIngredients = (ingredientsList) => {
    const combinedIngredients = {}
    ingredientsList.forEach(({ ingredient, measure, quantity }) => {
      const key = `${ingredient._id}-${measure}`
      if (combinedIngredients[key]) {
        combinedIngredients[key].quantity += quantity
      } else {
        combinedIngredients[key] = { ...ingredient, measure, quantity }
      }
    })
    return Object.values(combinedIngredients);
  };

  const shoppingList = useMemo(() => {
    let allIngredients = []

    weeklyMeals.forEach((dailyMeal) => {
      ["breakfast", "lunch", "dinner"].forEach((mealType) => {
        const meal = dailyMeal[mealType]
        if (meal && meal.ingredients) {
          allIngredients = allIngredients.concat(meal.ingredients)
        }
      });
    });

    return combineIngredients(combineIngredients(allIngredients).sort((a, b) => a.name.localeCompare(b.name)))
  }, [weeklyMeals])

  if (shoppingList.length === 0) {
    return <Typography>No ingredients available for this week.</Typography>
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={style} ref={targetRef}>
        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'monospace', textAlign: 'center', paddingBottom: 2, borderBottom: "2px dashed #000" }}>
          Shopping List
        </Typography>
        <List sx={{ padding: 0 }}>
          {shoppingList.map((ingredient) => (
            <ListItem key={ingredient._id} sx={{ padding: "5px 0" }}>
              <ListItemText
                primary={capitalize(`${ingredient.name} - ${ingredient.quantity} ${ingredient.measure}`)}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: "flex", gap: 3, marginTop: 2 }}>
          <Button onClick={() => toPDF()} variant="contained" color="primary">
            Download as PDF
          </Button>
          <Button onClick={onClose} variant="contained" color="error">
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ShoppingList;
