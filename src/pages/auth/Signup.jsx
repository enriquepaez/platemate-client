import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { TextField, FormControl, Button, Box, Typography } from '@mui/material'

import DefaultUserImage from "../../assets/default-user-image.jpg"

function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [image, setImage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handleImageChange = (e) => setImage(e.target.value)

  const handleSignup = async (e) => {
    e.preventDefault();

    // ... contactar al backend para registrar al usuario aqui
    try {

      const newUser = {
        email,
        username,
        password,
        image: image === "" ? DefaultUserImage : image
      }

      await axios.post("http://localhost:5005/api/auth/signup", newUser)
      navigate("/login")

    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        //! aquí debería haber redirección a /error
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSignup} sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Sign Up
      </Typography>

      <FormControl fullWidth margin="normal">
        <TextField 
            label="Your username"
            name="username"
            type="username"
            value={username}
            onChange={handleUsernameChange}
          />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField 
          label="Your email"
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField 
          label="Your password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField 
          label="Your image"
          name="image"
          type="url"
          value={image}
          onChange={handleImageChange}
        />
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ my: 2 }}>
        Sign Up
      </Button>

      <Link to="/">
        <Button variant="contained" color="error" fullWidth>
          Go Back
        </Button>
      </Link>

      {errorMessage && <p>{errorMessage}</p>}
    </Box>
  );
}

export default Signup;
