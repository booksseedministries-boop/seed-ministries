import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ChurchOutlinedIcon from "@mui/icons-material/ChurchOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import SectionHeading from "../../components/common/SectionHeading";
import church from "../../data/church";

export default function VisitUsSection() {
  return (
    <Box id="visit" sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow="VISIT US"
          title={`Worship with us at ${church.name}.`}
          description={`You are warmly welcome to join us for worship.`}
        />

        <Grid container spacing={3}>
          {church.services.map((service) => (
            <Grid key={service.name} size={{ xs: 12, md: 6 }}>
              <Stack
                spacing={2}
                sx={{
                  height: "100%",
                  p: { xs: 3, md: 4 },
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "surface.tint",
                      color: "primary.main",
                    }}
                  >
                    <ChurchOutlinedIcon />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: 24,
                      color: "primary.dark",
                    }}
                  >
                    {service.name}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
                  <AccessTimeIcon sx={{ color: "secondary.main", fontSize: 20 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{service.time}</Typography>
                </Stack>

                <Stack direction="row" spacing={1.2} sx={{ alignItems: "center", flex: 1 }}>
                  <LocationOnOutlinedIcon sx={{ color: "secondary.main", fontSize: 20 }} />
                  <Typography color="text.secondary">{service.location}</Typography>
                </Stack>

                <Button
                  href={service.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<ArrowOutwardIcon />}
                  sx={{ alignSelf: "flex-start", px: 0 }}
                >
                  Get directions
                </Button>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
