import { useState } from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import SectionHeading from "../../components/common/SectionHeading";
import ReadingDialog from "../../components/reading/ReadingDialog";
import { excerpt } from "../../data/blocks";
import dailyMatters from "../../data/dailyMatters";

const eyebrowLabel = (reflection) =>
  reflection.part ? `DAILY MATTERS · ${reflection.part}` : "DAILY MATTERS";

function Byline({ reflection }) {
  return (
    <Typography
      sx={{ fontSize: 13, fontStyle: "italic", color: "primary.main", textAlign: "right" }}
    >
      — {reflection.author}, {reflection.authorPlace}
    </Typography>
  );
}

function ReflectionCard({ reflection, onReadMore }) {
  return (
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
      <Typography
        sx={{ fontSize: 10, letterSpacing: 1.8, fontWeight: 700, color: "secondary.main" }}
      >
        {eyebrowLabel(reflection)}
      </Typography>

      <Typography sx={{ fontSize: { xs: 21, md: 24 }, fontWeight: 700, lineHeight: 1.5, color: "primary.dark" }}>
        {reflection.title}
      </Typography>

      <Byline reflection={reflection} />

      <Typography
        color="text.secondary"
        sx={{
          lineHeight: 1.9,
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {excerpt(reflection)}
      </Typography>

      <Box sx={{ flex: 1 }} />

      <Button
        onClick={onReadMore}
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        sx={{ alignSelf: "flex-end" }}
      >
        Read More
      </Button>
    </Stack>
  );
}

export default function ReflectionsSection() {
  const [openReflection, setOpenReflection] = useState(null);

  return (
    <Box id="reflections" sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow="LATEST REFLECTIONS"
          title="Read today's Daily Matters."
          description="Short reflections to read, think about, and carry with you through the day."
        />

        <Grid container spacing={3}>
          {dailyMatters.map((reflection) => (
            <Grid key={reflection.id} size={{ xs: 12, md: 6 }}>
              <ReflectionCard
                reflection={reflection}
                onReadMore={() => setOpenReflection(reflection)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <ReadingDialog
        item={openReflection}
        eyebrow={openReflection && eyebrowLabel(openReflection)}
        onClose={() => setOpenReflection(null)}
      />
    </Box>
  );
}
