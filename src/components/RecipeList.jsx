import { useState } from 'react'
import { Box, Pagination } from '@mui/material'
import RecipeCard from "../components/RecipeCard"
import Filters from "../components/Filters"

function RecipeList({ recipeList }) {

  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isVegetarian, setIsVegetarian] = useState(false)
  const [isVegan, setIsVegan] = useState(false)
  const [selectedType, setSelectedType] = useState('Any')

  const itemsPerPage = 8

  const sortedRecipes = recipeList.sort((a, b) => b.likes.length - a.likes.length)

  const filteredRecipes = sortedRecipes.filter(recipe => {
    const query = recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    const vegetarian = isVegetarian ? recipe.isVegetarian : true
    const vegan = isVegan ? recipe.isVegan : true
    const type = selectedType === 'Any' ? true : recipe.type === selectedType

    return query && vegetarian && vegan && type
  })
  
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage)
  const currentRecipes = filteredRecipes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  }

  return (
    <Box>
      <Filters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        isVegetarian={isVegetarian} 
        setIsVegetarian={setIsVegetarian} 
        isVegan={isVegan} 
        setIsVegan={setIsVegan}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={5}
        sx={{ my: 4 }}
      >
        {currentRecipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </Box>
      <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="contained"
          color="primary"
        />
      </Box>
    </Box>
  )
}

export default RecipeList
