import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function DailyMattersSection() {
  return (
    <Box id="daily-matters" sx={{ py: { xs: 7, md: 10 }, bgcolor: "#244C3A" }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                height: { xs: 270, md: 360 },
                borderRadius: "180px 180px 8px 8px",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85"
                alt="Peaceful landscape at sunrise"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              sx={{
                fontSize: 11,
                letterSpacing: 2.5,
                color: "#D9BD83",
                fontWeight: 700,
                mb: 2,
              }}
            >
              DAILY MATTERS
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 35, md: 49 },
                color: "white",
                lineHeight: 1.25,
                mb: 2.5,
              }}
            >
              Make room for the Word, every day.
            </Typography>

            <Typography
              sx={{
                color: "#DCE5DC",
                lineHeight: 2,
                mb: 3,
                maxWidth: 540,
              }}
            >
              Set aside a moment to read, reflect, and grow. Daily Matters
              brings biblical encouragement into the rhythm of everyday life.
            </Typography>

            <Box
              sx={{
                borderLeft: "2px solid #C6A15B",
                pl: 2.5,
                py: 0.5,
                mb: 3.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: { xs: 21, md: 25 },
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: "white",
                }}
              >
                “Be doers of the word, and not hearers only.”
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  letterSpacing: 1.5,
                  color: "#D9BD83",
                  mt: 1,
                }}
              >
                JAMES 1:22
              </Typography>
            </Box>

            <Button
              href="#reflections"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "#E4D0A6",
                color: "#173528",
                "&:hover": { bgcolor: "#F0DDB5" },
              }}
            >
              Explore Daily Matters
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
