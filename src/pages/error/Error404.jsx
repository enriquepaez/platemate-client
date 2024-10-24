import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Homer from "../../assets/homer.gif"

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <img src={Homer} alt="Error 404" style={{ width: "300px", marginBottom: "20px" }} />

      <Typography variant="h1" color="error" gutterBottom>
        404
      </Typography>

      <Typography variant="h5" color="textSecondary" gutterBottom>
        Oops! Page not found
      </Typography>

      <Typography variant="body1" color="textSecondary" paragraph>
        It seems like the page you're looking for doesn't exist. You may want to go back to the homepage.
      </Typography>
      
      <Button
        variant="contained"
        color="error"
        size="large"
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
      >
        Back to Home
      </Button>
    </Box>
  )
}

export default ErrorPage;