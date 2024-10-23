import { useNavigate } from "react-router-dom"

import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function SimpleRecipeCard({ recipe }) {

  const navigate = useNavigate()

  const handleImageClick = () => {
    navigate(`/recipe/${recipe._id}`)
  }

  if (!recipe) {
    return <Typography>No recipe data available.</Typography>
  }

  return (
    <Card sx={{ width: 170, maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={recipe.image}
        alt="Recipe Image"
        onClick={handleImageClick}
        sx={{ cursor: 'pointer' }}
      />
      <CardContent sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
        <Typography variant="body2" noWrap >
          {recipe.name}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SimpleRecipeCard