import axios from "axios"
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

import { TextField, FormControl, Button, Box, Typography } from '@mui/material'

import DefaultUserImage from "../../assets/default-user-image.jpg"

function EditProfile() {

  const navigate = useNavigate()
  const location = useLocation()

  const loggedUser = location.state?.user
  const [user, setUser] = useState(loggedUser)
  const [errorMessage, setErrorMessage] = useState("")
  const [imageUrl, setImageUrl] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleFileUpload = async (event) => {

      // console.log("The file to be uploaded is: ", e.target.files[0]);
    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }
  
    setIsUploading(true); // to start the loading animation
  
    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")
  
    try {
      const response = await axios.post("http://localhost:5005/api/upload", uploadData)
  
      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });
  
      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();

    try {

      const updatedUser = {
        ...user,
        image: imageUrl || user.image,
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
        <Typography variant="h6">
          Upload an image
        </Typography>
        <TextField 
          name="image"
          type="file"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </FormControl>

      {/* to render a loading message or spinner while uploading the picture */}
      {isUploading ? <h3>... uploading image</h3> : null}

      {/* below line will render a preview of the image from cloudinary */}
      {imageUrl ? (<div><img src={imageUrl} alt="img" width={200} /></div>) : null}

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