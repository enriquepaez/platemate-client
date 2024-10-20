import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";

import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { Box, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { Favorite as FavoriteIcon, Share as ShareIcon, ExpandMore as ExpandMoreIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

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

  const [expanded, setExpanded] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const settings = ["Edit recipe", "Delete recipe"]

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenSettings = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorElNav(null);
  };

  return (
    <Card sx={{ width: 345, flex:"1 1 300px", maxWidth:"300px"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
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
                  navigate(setting)
                }}>
                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        }
        title={recipe.name}
        subheader={formatDate(recipe.creationDate)}
      />
      <CardMedia
        component="img"
        height="194"
        image={recipe.image}
        alt="Recipe Image"
      />
      <CardContent>
       
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
          {recipe.ingredients.map((ingredient) => {
            return (
              <Typography variant="body2" sx={{ color: 'text.secondary' }} key={ ingredient._id }>
                {ingredient.name}
              </Typography>
            );
          })}

          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            {recipe.instructions}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default RecipeCard