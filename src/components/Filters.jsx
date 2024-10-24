import { Box, TextField, FormControl, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, useMediaQuery, useTheme } from '@mui/material'

function Filters({ searchQuery, setSearchQuery, selectedType, setSelectedType, isVegetarian, setIsVegetarian, isVegan, setIsVegan }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box display="flex" flexDirection={ isMobile ? "column" : "row"} gap={2} sx={{ my: 3 } }>
      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <FormControl variant="outlined">
        <InputLabel>Type</InputLabel>
        <Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          label="Type"
        >
          <MenuItem value="Any">Any</MenuItem>
          <MenuItem value="Breakfast">Breakfast</MenuItem>
          <MenuItem value="Lunch">Lunch</MenuItem>
          <MenuItem value="Dinner">Dinner</MenuItem>
        </Select>
      </FormControl>

      <Box display="flex" justifyContent="space-between">
        <FormControlLabel
          control={
            <Checkbox
              checked={isVegetarian}
              onChange={(e) => setIsVegetarian(e.target.checked)}
            />
          }
          label="Vegetarian"
        />
        
        <FormControlLabel
          control={
            <Checkbox
              checked={isVegan}
              onChange={(e) => setIsVegan(e.target.checked)}
            />
          }
          label="Vegan"
        />
      </Box>
      
      
    </Box>
  )
}

export default Filters
