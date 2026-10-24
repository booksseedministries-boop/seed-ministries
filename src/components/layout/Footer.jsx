import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Button, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChurchOutlinedIcon from "@mui/icons-material/ChurchOutlined";
import ContactDialog from "../common/ContactDialog";
import Logo from "../common/Logo";
import church from "../../data/church";
import navItems from "../../data/navigation";

const resourceLinks = [
  { label: "Book Library", to: "/books" },
  { label: "Magazine Issues", to: "/magazines" },
  { label: "Articles", to: "/articles" },
  { label: "Daily Matters", to: "/daily-matters" },
];

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);
  // The About page lists the services in full, so the footer skips them there.
  const onAboutPage = useLocation().pathname === "/about";

  return (
    <Box id="contact" sx={{ bgcolor: "#172D22", color: "white", pt: 6, pb: 3 }}>
      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ mb: 5 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center", mb: 2 }}
            >
              <Logo height={72} />
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 23,
                }}
              >
                SEED MINISTRIES
              </Typography>
            </Stack>

            <Typography
              sx={{ color: "#C8D3CA", lineHeight: 1.9, maxWidth: 380 }}
            >
              Christian resources to encourage reading, reflection, and
              growth in the Word of God.
            </Typography>

            {!onAboutPage && (
              <Stack spacing={1} sx={{ mt: 3, color: "#C8D3CA", fontSize: 14 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <ChurchOutlinedIcon sx={{ fontSize: 20, color: "#D9BD83" }} />
                  <Typography sx={{ color: "white", fontWeight: 700 }}>
                    {church.name}
                  </Typography>
                </Stack>

                {church.services.map((service) => (
                  <Stack
                    key={service.name}
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 20, color: "#D9BD83", mt: 0.3 }} />
                    <Box sx={{ lineHeight: 1.8 }}>
                      {service.name}: {service.time}{" "}
                      <Box
                        component="a"
                        href={service.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "#D9BD83",
                          textDecoration: "underline",
                          textUnderlineOffset: 3,
                          whiteSpace: "nowrap",
                          "&:hover": { color: "white" },
                        }}
                      >
                        {service.location}
                      </Box>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            )}
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography fontWeight={700} mb={2}>
              Explore
            </Typography>
            <Stack spacing={1.5}>
              {navItems.slice(0, 4).map((item) => (
                <Typography
                  key={item.label}
                  component={RouterLink}
                  to={item.to}
                  sx={{
                    color: "#C8D3CA",
                    fontSize: 14,
                    "&:hover": { color: "#D9BD83" },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography fontWeight={700} mb={2}>
              Resources
            </Typography>
            <Stack spacing={1.5}>
              {resourceLinks.map((item) => (
                <Typography
                  key={item.label}
                  component={RouterLink}
                  to={item.to}
                  sx={{ color: "#C8D3CA", fontSize: 14 }}
                >
                  {item.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography fontWeight={700} mb={2}>
              Stay Connected
            </Typography>
            <Typography
              sx={{ color: "#C8D3CA", fontSize: 14, lineHeight: 1.9 }}
            >
              Have a question about our ministry or publications? We would
              be glad to hear from you.
            </Typography>
            <Button
              onClick={() => setContactOpen(true)}
              variant="outlined"
              sx={{
                mt: 2,
                color: "white",
                borderColor: "#64776A",
                "&:hover": { borderColor: "#D9BD83" },
              }}
            >
              Contact Us
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "#3C5144", mb: 2.5 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography sx={{ color: "#AEBDB1", fontSize: 12 }}>
            © {new Date().getFullYear()} Seed Ministries. All rights reserved.
          </Typography>

          <Typography sx={{ color: "#AEBDB1", fontSize: 12 }}>
            Planting truth. Growing faith.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
