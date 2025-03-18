import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, LinkedIn, Home, Email, Phone } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#002776", color: "white", py: 4, mt: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ border: 'none' }}>
          <Grid item xs={12} md={6} sx={{ border: 'none' }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              hekate
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, maxWidth: 400 }}>
              Hekate is a pioneering Artificial Intelligence company founded in 2016 with the mission of  
              “Bringing the benefits of Artificial Intelligence to everyone”.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton sx={{ color: "white" }} href="#" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
              <IconButton sx={{ color: "white" }} href="#" aria-label="Facebook">
                <Facebook />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ border: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Contact
            </Typography>
            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <Home fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">
                (DN) Cloud9 Office & Studio, 191 Le Loi, Hai Chau District, Da Nang City
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Home fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">
                (HCMC) Minh Long Building, 17 Ba Huyen Thanh Quan, District 3, Ho Chi Minh City
              </Typography>
            </Box>


            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <Email fontSize="small" sx={{ mr: 1 }} />
              <Link href="mailto:business@hekate.ai" color="inherit" underline="none">
                business@hekate.ai
              </Link>
            </Box>

            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <Phone fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">+84-901-990-002</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}