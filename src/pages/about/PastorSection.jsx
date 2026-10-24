import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";

import posterImage from "../../assets/people/pastor-satyanivas-poster.webp";

// The source image is a 1200×1200 event poster; show only the pastor's
// portrait from its right side (x 650–1200, y 250–1200).
const CROP = { x: 650, y: 250, width: 550, height: 950, imageSize: 1200 };

function PastorPortrait() {
  return (
    <Box
      sx={{
        aspectRatio: `${CROP.width} / ${CROP.height}`,
        overflow: "hidden",
        borderRadius: "180px 180px 8px 8px",
        maxWidth: 380,
        mx: "auto",
        bgcolor: "surface.hero",
        transform: "scaleX(-1)",
      }}
    >
      <Box
        component="img"
        src={posterImage}
        alt="Brother Satyanivas"
        sx={{
          display: "block",
          maxWidth: "none",
          width: `${(CROP.imageSize / CROP.width) * 100}%`,
          ml: `${(-CROP.x / CROP.width) * 100}%`,
          mt: `${(-CROP.y / CROP.width) * 100}%`,
        }}
      />
    </Box>
  );
}

export default function PastorSection() {
  return (
    <Box sx={{ py: { xs: 7, md: 10 }, bgcolor: "surface.hero" }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <PastorPortrait />
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2.5}>
              <Typography
                sx={{
                  fontSize: 11,
                  letterSpacing: 2.5,
                  color: "primary.main",
                  fontWeight: 700,
                }}
              >
                MEET OUR PASTOR
              </Typography>

              <Box>
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: 34, md: 45 }, lineHeight: 1.2, color: "primary.dark" }}
                >
                  Brother Satyanivas
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 600, color: "#B28B48", mt: 1 }}>
                  బ్రదర్ సత్యనివాస్
                </Typography>
              </Box>

              <Typography
                sx={{ fontSize: 12, letterSpacing: 1.5, fontWeight: 700, color: "text.secondary" }}
              >
                PREACHER OF THE WORD · TLC HYDERABAD
              </Typography>

              <Typography color="text.secondary" sx={{ lineHeight: 2, maxWidth: 560 }}>
                Brother Satyanivas preaches and teaches God's Word through Seed
                Ministries, helping believers grow in Scripture through books,
                magazines, and regular live messages.
              </Typography>

              <Button
                href="https://www.youtube.com/channel/UC2I8UjUYIOzEGFlLcD9nHOg"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<YouTubeIcon />}
                sx={{ alignSelf: "flex-start" }}
              >
                Watch on YouTube
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
