import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom"
import axios from "axios";

import { styled } from '@mui/material/styles';
import { red, pink, green } from '@mui/material/colors';
import { Box, Card, CardHeader, CardMedia, CardContent, CardActions, Chip, Collapse, Avatar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { Favorite as FavoriteIcon, ExpandMore as ExpandMoreIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

import formatDate from "../utils/formatDate"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

function RecipeCard({ recipe }) {

  const navigate = useNavigate()
  const { loggedUserId } = useContext(AuthContext)

  const [expanded, setExpanded] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(recipe.likes.includes(loggedUserId));
  }, [recipe.likes, loggedUserId])

  const settings = [
    { name: 'Edit recipe', action: () => navigate('/editrecipe', { state: { recipe } }) },
    { name: 'Delete recipe', action: () => handleDeleteRecipe() }
  ]

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  const handleOpenSettings = (event) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleCloseSettings = () => {
    setAnchorElNav(null);
  }

  const handleDeleteRecipe = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/recipe/${recipe._id}`)

    } catch (error) {
      console.log(error)
    }
  }

  const handleFavoriteClick = async () => {
    try {
      if (recipe.likes.includes(loggedUserId)) {
        recipe.likes = recipe.likes.filter((id) => id !== loggedUserId)
      } else {
        recipe.likes.push(loggedUserId)
      }
      setIsFavorite(!isFavorite)

      const storedToken = localStorage.getItem('authToken')

      await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/recipe/${recipe._id}`, { likes: recipe.likes }, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })

    } catch (error) {
      console.log(error)
    }
  }

  const handleImageClick = () => {
    navigate(`/recipe/${recipe._id}`)
  }

  return (
    <Card sx={{ width: 345, flex:"1 1 300px", maxWidth:"300px", height:"min-content"}}>
      <CardHeader
        avatar={ <Avatar src={recipe.createdBy.image} sx={{ bgcolor: red[500] }} aria-label="recipe" />}
        action={loggedUserId === recipe.createdBy._id ? (
          <Box >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-settings"
              aria-haspopup="true"
              onClick={handleOpenSettings}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
            id="menu-settings"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseSettings}
          >
            {settings.map((setting, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleCloseSettings()
                  setting.action()
                }}>
                <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        ) : (
          <IconButton
            aria-label="add to favorites"
            onClick={handleFavoriteClick}
            sx={{ color: isFavorite ? pink[500] : "inherit" }}
          >
            <FavoriteIcon />
          </IconButton>
        )}
        title={
          <Typography
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '170px'
            }}
          >
            {recipe.name}
          </Typography>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '170px'
            }}
          >
            {loggedUserId === recipe.createdBy._id ? (
                "Created by you"
            ) : (
                recipe.createdBy.username
            )}
            {` - ${formatDate(recipe.creationDate)}`}
          </Typography>
        }
      />
      
      <CardMedia
        component="img"
        height="194"
        image={recipe.image}
        alt="Recipe Image"
        onClick={handleImageClick}
        sx={{ cursor: 'pointer' }}
      />

      <CardActions
        sx={{ display: 'flex', alignItems: "space-between"}}
        disableSpacing
      > 
        <Box>
          <Chip label={recipe.type} sx={{ bgcolor: 'primary.main', color: 'white' }} />
          {(recipe.isVegan || recipe.isVegetarian) && (
            <Chip label={recipe.isVegan ? "Vegan" : "Vegetarian"} sx={{ bgcolor: green[500], color: 'white', ml: 2 }} />
          )}
        </Box>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body1" mb={2}>Ingredients:</Typography>
          {recipe.ingredients.map((ingredient) => {
            return (
              <Typography variant="body2" key={ingredient._id}>{ ingredient.quantity + " " + ingredient.measure + " of " + ingredient.ingredient.name }</Typography>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default RecipeCard