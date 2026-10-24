import { useState } from "react";
import { Box, Button, ButtonBase, Container, Grid, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

import OrderDialog from "../../components/common/OrderDialog";
import SectionHeading from "../../components/common/SectionHeading";
import magazines, {
  magazineName,
  magazineTagline,
  singleIssuePrice,
  yearlySubscriptionPrice,
} from "../../data/magazines";

function SubscriptionCard({ onSubscribe }) {
  return (
    <Stack
      spacing={2.5}
      sx={{
        height: "100%",
        justifyContent: "center",
        p: { xs: 3, md: 4 },
        borderRadius: 2,
        bgcolor: "#244C3A",
        color: "white",
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          bgcolor: "rgba(255,255,255,0.12)",
          color: "#D9BD83",
        }}
      >
        <AutoStoriesOutlinedIcon />
      </Box>

      <Typography
        sx={{ fontSize: 11, letterSpacing: 2.5, fontWeight: 700, color: "#D9BD83" }}
      >
        YEARLY SUBSCRIPTION
      </Typography>

      <Typography
        sx={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: { xs: 26, md: 30 },
          lineHeight: 1.25,
        }}
      >
        Never miss an issue of {magazineName}.
      </Typography>

      <Stack direction="row" spacing={1} sx={{ alignItems: "baseline" }}>
        <Typography sx={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>
          ₹{yearlySubscriptionPrice}/-
        </Typography>
        <Typography sx={{ color: "#DCE5DC" }}>per year</Typography>
      </Stack>

      <Typography variant="body2" sx={{ color: "#DCE5DC", lineHeight: 1.8 }}>
        Subscribe once and receive every new issue of {magazineTagline}.
      </Typography>

      <Button
        onClick={onSubscribe}
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        sx={{
          alignSelf: "flex-start",
          bgcolor: "#E4D0A6",
          color: "#173528",
          "&:hover": { bgcolor: "#F0DDB5" },
        }}
      >
        Subscribe Now
      </Button>
    </Stack>
  );
}

export default function MagazinesSection() {
  const [orderItem, setOrderItem] = useState(null);

  return (
    <Box id="magazines" sx={{ py: { xs: 7, md: 10 }, bgcolor: "surface.alt" }}>
      <Container maxWidth="xl">
        <SectionHeading
          eyebrow="FROM OUR PUBLICATIONS"
          title="Stories, truth, and perspective."
          description="Browse our magazine collection for biblical reflections, thoughtful articles, and ministry publications."
        />

        <Grid container spacing={3}>
          {magazines.map((magazine) => (
            <Grid key={magazine.issue} size={{ xs: 12, sm: 6, md: 4 }}>
              <ButtonBase
                onClick={() =>
                  setOrderItem({
                    kind: "magazine",
                    title: magazine.title,
                    subtitle: `${magazineName} · ${magazine.issue}`,
                    image: magazine.image,
                    price: singleIssuePrice,
                  })
                }
                aria-label={`Request ${magazine.title} (${magazine.issue})`}
                sx={{
                  width: "100%",
                  textAlign: "left",
                  alignItems: "stretch",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  overflow: "hidden",
                  height: "100%",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 14px 35px rgba(36,76,58,0.09)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={magazine.image}
                  alt={`${magazineName} – ${magazine.title} (${magazine.issue})`}
                  sx={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
                />

                <Stack spacing={1} sx={{ p: 3, flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 10,
                      letterSpacing: 1.8,
                      fontWeight: 700,
                      color: "secondary.main",
                    }}
                  >
                    {magazine.issue}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {magazine.title}
                  </Typography>

                  <Typography sx={{ fontSize: 18, fontWeight: 600, color: "primary.dark" }}>
                    {magazine.titleTelugu}
                  </Typography>

                  <Typography
                    sx={{ fontSize: 13, fontStyle: "italic", color: "primary.main" }}
                  >
                    {magazineName} · {magazineTagline}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                    {magazine.highlight}
                  </Typography>

                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", alignItems: "center", pt: 1 }}
                  >
                    <Typography sx={{ fontSize: 20, fontWeight: 700, color: "primary.dark" }}>
                      ₹{singleIssuePrice}/-
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{
                        alignItems: "center",
                        color: "primary.main",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      <span>Request this issue</span>
                      <ArrowOutwardIcon sx={{ fontSize: 16 }} />
                    </Stack>
                  </Stack>
                </Stack>
              </ButtonBase>
            </Grid>
          ))}

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <SubscriptionCard
              onSubscribe={() =>
                setOrderItem({
                  kind: "subscription",
                  title: `${magazineName} – Yearly subscription`,
                  subtitle: magazineTagline,
                  price: yearlySubscriptionPrice,
                  priceNote: "per year",
                })
              }
            />
          </Grid>
        </Grid>
      </Container>

      <OrderDialog item={orderItem} onClose={() => setOrderItem(null)} />
    </Box>
  );
}
