import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";

export default function AboutSection({ showLink = false }) {
  return (
    <Box id="about" sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth="md">
        <Stack spacing={2.5} sx={{ alignItems: "center", textAlign: "center" }}>
          <Box sx={{ color: "secondary.main" }}>
            <SpaOutlinedIcon sx={{ fontSize: 36 }} />
          </Box>

          <Typography
            sx={{
              fontSize: 11,
              letterSpacing: 2.5,
              color: "primary.main",
              fontWeight: 700,
            }}
          >
            ABOUT SEED MINISTRIES
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 34, md: 47 },
              lineHeight: 1.25,
              maxWidth: 720,
            }}
          >
            Helping truth take root and faith flourish.
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ lineHeight: 2, maxWidth: 660 }}
          >
            Seed Ministries brings together Christian reading resources,
            magazines, articles, and daily reflections in one
            place. Our aim is to make meaningful biblical resources easier
            to discover and read.
          </Typography>

          {showLink && (
            <Button
              component={RouterLink}
              to="/about"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
            >
              Learn More About Us
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
