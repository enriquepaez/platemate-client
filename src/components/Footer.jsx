import { Avatar, Box, Typography, Link } from "@mui/material";

import Github from "../assets/github.png";
import Linkedin from "../assets/linkedin.png";

function Footer() {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        backgroundColor: "#4CAF50",
        color: "white",
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Page created by Enrique Páez:
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Link href="https://github.com/enriquepaez" target="_blank">
          <Avatar src={Github} alt="Github Logo" sx={{ width: 40, height: 40 }} />
        </Link>

        <Link href="https://www.linkedin.com/in/enrique-paez/" target="_blank">
          <Avatar src={Linkedin} alt="Linkedin Logo" sx={{ width: 40, height: 40 }} />
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
