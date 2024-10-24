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
  const [errorMessage, setErrorMessage] = useState("")
  const [imageUrl, setImageUrl] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
  
    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return
    }
  
    setIsUploading(true) // to start the loading animation
  
    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0])
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")
  
    try {
      const response = await axios.post("http://localhost:5005/api/upload", uploadData)
  
      setImageUrl(response.data.imageUrl)
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });
  
      setIsUploading(false) // to stop the loading animation
    } catch (error) {
      navigate("/error")
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    // ... contactar al backend para registrar al usuario aqui
    try {

      const newUser = {
        email,
        username,
        password,
        image: imageUrl || DefaultUserImage
      }

      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, newUser)
      navigate("/login")

    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        navigate("/error")
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
        <Typography variant="h6">
          Upload an image
        </Typography>
        
        <TextField 
          name="image"
          type="file"
          onChange={handleFileUpload}
          disabled={isUploading}
        />

        {/* to render a loading message or spinner while uploading the picture */}
        {isUploading ? <h3>... uploading image</h3> : null}

        {/* below line will render a preview of the image from cloudinary */}
        {imageUrl ? (<div><img src={imageUrl} alt="img" width={200} /></div>) : null}
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
