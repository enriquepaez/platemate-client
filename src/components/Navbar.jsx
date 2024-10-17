import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import Logo from "../assets/platemate-logo.png"

function Navbar() {

  const navigate = useNavigate()
  const { isLoggedIn, authenticateUser } = useContext(AuthContext)

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
    { name: 'Account', path: "/profile" },
    { name: 'Logout', action: handleLogout },
  ];

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
                mr: 1, 
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

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
                sx={{ my: 2, mx: 5, color: 'white', display: 'block' , fontSize: '16px'}}
                component={Link}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          
          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
