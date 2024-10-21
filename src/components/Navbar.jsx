import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import axios from "axios";

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import Logo from "../assets/platemate-logo.png"

function Navbar() {

  const navigate = useNavigate()
  const { isLoggedIn, authenticateUser, loggedUserId } = useContext(AuthContext)

  const [loggedUser, setLoggedUser] = useState(null)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // para traer la info del usuario logueado
  useEffect(() => {
    const getUserById = async () => {
      try {
        const authToken = localStorage.getItem('authToken')

        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user`, {
          headers: { authorization: `Bearer ${authToken}` }
        })
        setLoggedUser(response.data)

      } catch (error) {
        console.log(error)
      }
    }
    getUserById()
  }, [])

  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken")
      await authenticateUser()
      navigate("/")

    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  let pages;
  if (!isLoggedIn) {
    pages = [
      { name: 'Sign Up', path: '/signup' },
      { name: 'Log In', path: '/login' }
    ]

  } else {
    pages = [
      { name: 'My Weekly Meals', path: '/weeklymeals' },
      { name: 'My Recipes', path: '/myrecipes' },
      { name: 'Community Recipes', path: '/communityrecipes' }
    ]
  }
  
  const settings = [
    { name: 'Profile', path: '/profile' },
    { name: 'Logout', action: handleLogout }
  ]

  return (

    <AppBar position="static" sx={{ backgroundColor: '#4CAF50' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                mr: 5, 
                width: 66,
                height: 80,
                my: 2
              }}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    handleCloseNavMenu()
                    navigate(page.path)
                  }}>
                  <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Link to="/">
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{ 
                display: { xs: 'flex', md: 'none' }, 
                mr: 1, 
                width: 66,
                height: 80,
                my: 2
              }}
            />
          </Link>

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
    
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 5, color: 'white', display: 'block' , fontSize: '18px'}}
                component={Link}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          
          {isLoggedIn && loggedUser && (
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={loggedUser.username} src={loggedUser.image} sx={{ width: 56, height: 56 }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => {
                    handleCloseUserMenu()
                    if (setting.action) setting.action()
                    if (setting.path) navigate(setting.path)
                  }}>
                  <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          )}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
