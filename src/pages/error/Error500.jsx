import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Homer from "../../assets/homer.gif"

function Error500() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <img src={Homer} alt="Error 500" style={{ width: "300px", marginBottom: "20px" }} />

      <Typography variant="h1" color="error" gutterBottom>
        500
      </Typography>

      <Typography variant="h5" color="textSecondary" gutterBottom>
        Oops! Internal Server Error
      </Typography>

      <Typography variant="body1" color="textSecondary" paragraph>
        Something went wrong on our end. Please try refreshing the page or come back later.
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
      >
        Back to Home
      </Button>
    </Box>
  )
}

export default Error500