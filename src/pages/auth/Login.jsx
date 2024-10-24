import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

import { TextField, FormControl, Button, Box, Typography } from '@mui/material';

function Login() {

  const navigate = useNavigate()
  const { authenticateUser } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ... contactar al backend para validar credenciales de usuario aqui
    try {

      const userCredentials = {
        email,
        password
      }

      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, userCredentials)
      console.log(response)

      localStorage.setItem("authToken", response.data.authToken)
      await authenticateUser()
      navigate("/")

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
    <Box component="form" onSubmit={handleLogin} sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Log In
      </Typography>

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

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ my: 2 }}>
        Log In
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

export default Login;
