import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChurchOutlinedIcon from "@mui/icons-material/ChurchOutlined";

export default function Hero() {
  return (
    <Box
      id="home"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "surface.hero",
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 5, md: 7 }}
          sx={{ alignItems: "center", py: { xs: 7, md: 11 } }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3} sx={{ maxWidth: 610 }}>
              <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 28,
                    height: 1,
                    bgcolor: "secondary.main",
                  }}
                />
                <Typography
                  sx={{
                    color: "primary.main",
                    letterSpacing: 2.5,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  WELCOME TO SEED MINISTRIES
                </Typography>
              </Stack>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 44, sm: 56, md: 65, lg: 74 },
                  lineHeight: 1.12,
                  color: "primary.dark",
                }}
              >
                Planting truth.
                <br />
                <Box
                  component="span"
                  sx={{ color: "#B28B48", fontStyle: "italic" }}
                >
                  Growing faith.
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: 15, md: 17 },
                  lineHeight: 1.95,
                  maxWidth: 500,
                }}
              >
                Discover Christian books, inspiring magazines, biblical
                articles, and daily reflections created to encourage a deeper
                understanding of God's Word.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ pt: 1 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/books"
                  endIcon={<ArrowForwardIcon />}
                >
                  Explore Resources
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/daily-matters"
                  sx={{
                    borderColor: "divider",
                    color: "primary.dark",
                  }}
                >
                  Read Daily Matters
                </Button>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", pt: 2 }}
              >
                <ChurchOutlinedIcon
                  sx={{ color: "primary.main", fontSize: 20 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Faith-centered resources for everyday life
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                maxWidth: 580,
                mx: "auto",
                pr: { xs: 1, sm: 3 },
                pb: { xs: 2, sm: 3 },
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=90"
                alt="Open Bible in warm natural light"
                sx={{
                  width: "100%",
                  height: { xs: 310, sm: 410, md: 475 },
                  objectFit: "cover",
                  borderRadius: "180px 180px 8px 8px",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: { xs: 0, sm: -20 },
                  width: { xs: "88%", sm: 285 },
                  p: 2.5,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  boxShadow: "0 12px 35px rgba(29,46,33,0.08)",
                }}
              >
                <Typography
                  sx={{
                    color: "secondary.main",
                    fontSize: 10,
                    letterSpacing: 2,
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  ROOTED IN SCRIPTURE
                </Typography>

                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: 19,
                    lineHeight: 1.5,
                    color: "primary.dark",
                  }}
                >
                  “Your word is a lamp to my feet and a light to my path.”
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1.2 }}
                >
                  PSALM 119:105
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
