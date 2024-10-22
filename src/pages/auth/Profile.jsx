import axios from "axios"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import { useNavigate } from "react-router-dom"

import { Avatar, Box, Button, Typography, Card, CardContent } from "@mui/material"

function Profile() {

  const { isLoggedIn, authenticateUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const authToken = localStorage.getItem('authToken')

        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user`, {
          headers: { authorization: `Bearer ${authToken}` }
        })
        setUser(response.data)

      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [user])

  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken")
      await authenticateUser()
      navigate("/")

    } catch (error) {
      console.log(error)
    }
  }

  if (!user) {
    return (
      <Box component="section" sx={{ padding: 2 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
         My Profile
        </Typography>
        <Typography variant="body1">...loading</Typography>
      </Box>
    );
  }

  return (
    <Box component="section" sx={{ padding: 2 }}> 
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        My Profile
      </Typography>

      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3, borderRadius: 4, my: 5 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Avatar 
              src={user.image} 
              alt={user.username} 
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {user.username}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Email: {user.email}
            </Typography>
          </Box>

          <Button 
            fullWidth 
            variant="contained" 
            color="primary"
            sx={{ borderRadius: 8, mb: "10px" }}
            onClick={ () => navigate("/profile/edit", { state: { user } }) }
          >
            Edit Profile
          </Button>

          <Button 
            fullWidth 
            variant="contained" 
            color="error"
            sx={{ borderRadius: 8 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Profile;
