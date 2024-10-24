import { useState } from "react"

import { Box, IconButton, Typography, List, ListItem, ListItemText, Modal } from "@mui/material"
import { Delete } from '@mui/icons-material'

import SearchBar from "./SearchBar"
import IngredientsModal from "../components/IngredientsModal"
import capitalize from '../utils/capitalize'

function IngredientList({ ingredientList, selectedIngredientList, setSelectedIngredientList }) {

  const [queryFilterIngredient, setQueryFilterIngredient] = useState("")
  const [selectedIngredient, setSelectedIngredient] = useState({
    name: "",
    id: "",
    measure: "",
    quantity: 0
  });
  const [modalOpen, setModalOpen] = useState(false)

  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => setModalOpen(false)

  const handleIngredientSelect = (ingredient) => {

    setSelectedIngredient({
      name: ingredient.name,
      ingredient: ingredient._id, // se deben llamar ingredient por tema de BD
      measure: "",
      quantity: 0
    })
    setQueryFilterIngredient("")
    handleModalOpen()
  }

  const handleDeleteIngredient = (ingredientToDelete) => {
    setSelectedIngredientList(prevList => prevList.filter((ingredient) => ingredient.ingredient !== ingredientToDelete.ingredient))
  }

  if (ingredientList.length === 0) {
    return <h3>...loading ingredients</h3>
  }

  const listStyle = {
    height: "150px", 
    overflowY: "auto", 
    borderRadius: 1,
    border: "2px solid lightgrey"
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">
          All ingredients
        </Typography>

        <List sx={listStyle}>
          <Box sx={{ mb: 1 }}>
            <SearchBar 
              queryFilterIngredient={queryFilterIngredient} 
              setQueryFilterIngredient={setQueryFilterIngredient} 
            />
          </Box>

          {ingredientList
          .filter((ingredient) => queryFilterIngredient.length > 2 && ingredient.name.includes(queryFilterIngredient))
          .map((ingredient) => (
            <ListItem
              key={ingredient._id}
              dense
              button
              onClick={() => handleIngredientSelect(ingredient)}
            >
              <ListItemText primary={capitalize(ingredient.name)} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <IngredientsModal
          selectedIngredient={selectedIngredient}
          setSelectedIngredient={setSelectedIngredient}
          setSelectedIngredientList={setSelectedIngredientList}
          onModalClose={handleModalClose} 
        />
      </Modal>

      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">
          Selected ingredients
        </Typography>
        <List sx={listStyle}>
          {selectedIngredientList.map((ingredient) => (
            <ListItem key={ingredient._id} dense>
              <ListItemText primary={ingredient.name ? `${ingredient.quantity} ${ingredient.measure} of ${ingredient.name}` : `${ingredient.quantity} ${ingredient.measure} of ${ingredient.ingredient.name}` }  />

              <IconButton 
                onClick={() => handleDeleteIngredient(ingredient)} 
                size="small" 
                sx={{ p: 0.5 }}
              >
                <Delete fontSize="inherit" sx={{ fontSize: 16 }} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default IngredientList