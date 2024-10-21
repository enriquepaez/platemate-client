import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import { Typography, Button } from '@mui/material';

import BackgroundImage from "../assets/homepage-image.jpg"

function HomePage() {

  const { isLoggedIn, authenticateUser } = useContext(AuthContext)

  return (
    <div className="homepage-image">
      <img src={BackgroundImage} alt="Background Image" />

      { !isLoggedIn && (
        <div className="image-content">
          <Typography variant="h2" component="h1" >
            Welcome to Platemate!
          </Typography>
          <Typography variant="h4" component="h2" sx={{ my: 5 }}>
            Start your journey to organized and healthy eating. Plan your meals with easy, delicious recipes. Discover the joy of cooking!
          </Typography>

          <div className='image-buttons'>
            <Link to="/signup">
              <Button variant="contained" color="primary" fullWidth><h3>Sign up!</h3></Button>
            </Link>
            
            <h3>or</h3>

            <Link to="/login">
              <Button variant="contained" color="error" fullWidth><h3>Log in!</h3></Button>
            </Link>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default HomePage