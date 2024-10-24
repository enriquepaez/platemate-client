import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { Typography, Button, Box, useMediaQuery, useTheme } from '@mui/material'
import BackgroundImage from "../assets/homepage-image.jpg"

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        position: "relative",
        height: isMobile ? "50vh" : "75vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={BackgroundImage}
        alt="Background Image"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          opacity: 0.5,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#ffffff",
          zIndex: 2,
          width: "70%",
          height: "100%"
        }}
      >
        {!isLoggedIn ? (
          <>
            <Typography
              variant={isMobile ? "h4" : "h2"}
            >
              Welcome to Platemate!
            </Typography>
            <Typography
              variant={isMobile ? "h6" : "h4"}
              sx={{ my: 5 }}
            >
              Start your journey to organized and healthy eating. Plan your meals with easy, delicious recipes. Discover the joy of cooking!
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: isMobile ? "100%" : "500px",
              }}
            >
              <Link to="/signup">
                <Button variant="contained" color="primary" fullWidth>
                  <Typography variant="h6">Sign up!</Typography>
                </Button>
              </Link>
              <Typography variant="h6">or</Typography>
              <Link to="/login">
                <Button variant="contained" color="error" fullWidth>
                  <Typography variant="h6">Log in!</Typography>
                </Button>
              </Link>
            </Box>
          </>
        ) : (
          <>
             <Typography
                variant={isMobile ? "h4" : "h2"}
              >
                Welcome back to Platemate!
              </Typography>
              <Typography
                variant={isMobile ? "h6" : "h4"}
                sx={{ my: 5 }}
              >
                What would you like to do today?
              </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: isMobile ? "100%" : "500px",
              }}
            >
              <Link to="/weekplanner">
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  sx={{
                    fontSize: isMobile ? "0.8rem" : "1rem",
                    padding: isMobile ? "8px 16px" : "12px 24px",
                  }}
                >
                  <Typography variant="h6" sx={{ fontSize: isMobile ? "0.9rem" : "1.2rem" }}>See my week planner</Typography>
                </Button>
              </Link>

              <Link to="/myrecipes">
                <Button 
                  variant="contained" 
                  color="success" 
                  fullWidth
                  sx={{
                    fontSize: isMobile ? "0.8rem" : "1rem",
                    padding: isMobile ? "8px 16px" : "12px 24px",
                  }}
                >
                  <Typography variant="h6" sx={{ fontSize: isMobile ? "0.9rem" : "1.2rem" }}>Check My Recipes</Typography>
                </Button>
              </Link>

              <Link to="/communityrecipes">
                <Button 
                  variant="contained" 
                  color="error" 
                  fullWidth
                  sx={{
                    fontSize: isMobile ? "0.8rem" : "1rem",
                    padding: isMobile ? "8px 16px" : "12px 24px",
                  }}
                >
                  <Typography variant="h6" sx={{ fontSize: isMobile ? "0.9rem" : "1.2rem" }}>Browse Community Recipes</Typography>
                </Button>
              </Link>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
