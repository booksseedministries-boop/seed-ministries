import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function SectionHeading({ eyebrow, title, description, link, to }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "flex-end" },
        mb: 4,
      }}
    >
      <Box sx={{ maxWidth: 650 }}>
        <Typography
          sx={{
            color: "primary.main",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2.5,
            mb: 1.5,
          }}
        >
          {eyebrow}
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: 31, md: 43 },
            lineHeight: 1.2,
            mb: 1.5,
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            color="text.secondary"
            sx={{ lineHeight: 1.9, maxWidth: 560 }}
          >
            {description}
          </Typography>
        )}
      </Box>

      {link && to && (
        <Button
          component={RouterLink}
          to={to}
          color="primary"
          endIcon={<ArrowForwardIcon />}
          sx={{ flexShrink: 0, mb: { sm: 0.5 } }}
        >
          {link}
        </Button>
      )}
    </Stack>
  );
}
