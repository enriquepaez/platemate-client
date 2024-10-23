import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Button, Typography } from "@mui/material";

import capitalize from "../utils/capitalize";

function IngredientsModal({ selectedIngredient, setSelectedIngredient, setSelectedIngredientList, onModalClose }) {

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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedIngredient((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation()
    setSelectedIngredientList((prev) => [...prev, selectedIngredient])
    onModalClose();
  };

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {capitalize(selectedIngredient.name)}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400, mx: "auto"}}
      >
        <FormControl fullWidth margin="normal">
          <InputLabel>Measure</InputLabel>
          <Select
            name="measure"
            value={selectedIngredient.measure}
            onChange={handleChange}
            required
          >
            <MenuItem value="cup">cup</MenuItem>
            <MenuItem value="tablespoon">tablespoon</MenuItem>
            <MenuItem value="teaspoon">teaspoon</MenuItem>
            <MenuItem value="gram">gram</MenuItem>
            <MenuItem value="kilogram">kilogram</MenuItem>
            <MenuItem value="liter">liter</MenuItem>
            <MenuItem value="milliliter">milliliter</MenuItem>
            <MenuItem value="piece">piece</MenuItem>
            <MenuItem value="unit">unit</MenuItem>
            <MenuItem value="serving">serving</MenuItem>
            <MenuItem value="inch">inch</MenuItem>
            <MenuItem value="ounce">ounce</MenuItem>
            <MenuItem value="pint">pint</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={selectedIngredient.quantity}
            onChange={handleChange}
            required
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Ingredient
        </Button>
      </Box>
    </Box>
  );
}

export default IngredientsModal;
