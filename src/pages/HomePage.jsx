import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import Button from '@mui/material/Button';

import BackgroundImage from "../assets/homepage-image.jpg"

function HomePage() {

  const { isLoggedIn, authenticateUser } = useContext(AuthContext)

  return (
    <div className="homepage-image">
      <img src={BackgroundImage} alt="Background Image" />

      { !isLoggedIn && (
        <div className="image-content">
          <h1>Welcome to Platemate!</h1>
          <h2>Start your journey to organized and healthy eating. Plan your meals with easy, delicious recipes. Discover the joy of cooking!</h2>

          <div className='image-buttons'>
            <Link to="/signup">
              <Button variant="contained">Sing up!</Button>
            </Link>
            
            <h3>or</h3>

            <Link to="/login">
              <Button variant="contained">Log in!</Button>
            </Link>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default HomePage