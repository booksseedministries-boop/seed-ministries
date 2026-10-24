import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

import SectionHeading from "../../components/common/SectionHeading";

const areas = [
  {
    icon: <MenuBookOutlinedIcon />,
    title: "Books",
    description:
      "Resources for Bible study, Christian living, and discipleship.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=85",
    to: "/books",
  },
  {
    icon: <AutoStoriesOutlinedIcon />,
    title: "Magazines",
    description:
      "Biblical reflections and ministry publications in every issue.",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=85",
    to: "/magazines",
  },
  {
    icon: <PublicOutlinedIcon />,
    title: "Articles",
    description:
      "Thoughtful articles that point readers back to Scripture.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=85",
    to: "/articles",
  },
  {
    icon: <CalendarMonthOutlinedIcon />,
    title: "Daily Matters",
    description:
      "A daily moment to read, reflect, and grow in the Word.",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=85",
    to: "/daily-matters",
  },
];

export default function Overview() {
  return (
    <Box sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth="xl">
        <SectionHeading
          eyebrow="EXPLORE SEED MINISTRIES"
          title="Everything you need to grow in the Word."
        />

        <Grid container spacing={3}>
          {areas.map((area) => (
            <Grid key={area.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                component={RouterLink}
                to={area.to}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 14px 35px rgba(36,76,58,0.09)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={area.image}
                  alt=""
                  sx={{ width: "100%", height: 170, objectFit: "cover" }}
                />

                <Stack spacing={1.2} sx={{ p: 2.5, flex: 1 }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Box sx={{ color: "primary.main", display: "flex" }}>
                      {area.icon}
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: 21,
                      }}
                    >
                      {area.title}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                    {area.description}
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
                    <span>Explore {area.title}</span>
                    <ArrowForwardIcon sx={{ fontSize: 16 }} />
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
