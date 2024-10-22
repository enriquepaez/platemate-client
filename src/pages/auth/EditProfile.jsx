import axios from "axios"
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

import { TextField, FormControl, Button, Box, Typography } from '@mui/material'

import DefaultUserImage from "../../assets/default-user-image.jpg"

function EditProfile() {

  const navigate = useNavigate()
  const location = useLocation()

  const loggedUser = location.state?.user
  const [ user, setUser ] = useState(loggedUser)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleEditUser = async (e) => {
    e.preventDefault();

    try {

      const updatedUser = {
        ...user,
        image: user.image || DefaultUserImage,
      }

      const token = localStorage.getItem("authToken")

      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/user`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      navigate("/profile", { state: { loggedUser: response.data } })

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
    <Box component="form" onSubmit={handleEditUser} sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Edit Profile
      </Typography>

      <FormControl fullWidth margin="normal">
        <TextField 
            label="Your username"
            name="username"
            type="username"
            value={user.username}
            onChange={handleChange}
          />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField 
          label="Your image"
          name="image"
          type="url"
          value={user.image}
          onChange={handleChange}
        />
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ my: 2 }}>
        Edit Profile
      </Button>

      <Link to="/profile">
        <Button variant="contained" color="error" fullWidth>
          Go Back
        </Button>
      </Link>

      {errorMessage && <p>{errorMessage}</p>}
    </Box>
  );
}

export default EditProfile