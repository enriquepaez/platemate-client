
import { useState } from "react"

import { Box, Typography, List, ListItem, ListItemText, Modal } from "@mui/material";

import SearchBar from "./SearchBar";
import IngredientsModal from "../components/IngredientsModal";

function IngredientList({ ingredientList, selectedIngredientList, setSelectedIngredientList }) {

  const [queryFilterIngredient, setQueryFilterIngredient] = useState("")
  const [selectedIngredient, setSelectedIngredient] = useState(null)

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredientList((prev) => [...prev, ingredient])
    setQueryFilterIngredient("")
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
        <Typography variant="p">
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
            <ListItem dense key={ingredient._id} button onClick={handleModalOpen}>
              <ListItemText primary={ingredient.name} />
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
          
          onModalClose={handleModalClose} />
      </Modal>

      <Box sx={{ flex: 1 }}>
        <Typography variant="p">
          Selected ingredients
        </Typography>
        <List sx={listStyle}>
          {selectedIngredientList.map((ingredient) => (
            <ListItem key={ingredient._id} dense>
              <ListItemText primary={ingredient.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default IngredientList