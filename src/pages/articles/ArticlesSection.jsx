import { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";

import SectionHeading from "../../components/common/SectionHeading";
import ReadingDialog from "../../components/reading/ReadingDialog";
import articles from "../../data/articles";
import { excerpt } from "../../data/blocks";

export default function ArticlesSection() {
  const [openArticle, setOpenArticle] = useState(null);

  return (
    <Box id="articles" sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth="xl">
        <SectionHeading
          eyebrow="READ & REFLECT"
          title="Biblical truth for everyday life."
          description="Read thoughtful articles that invite reflection, encourage spiritual growth, and point readers back to Scripture."
        />

        <Grid container spacing={3}>
          {articles.map((article, index) => (
            <Grid key={article.id} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  height: "100%",
                  minHeight: 250,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", sm: "36%" },
                    minHeight: { xs: 190, sm: "auto" },
                    bgcolor: index % 2 === 0 ? "surface.sage" : "surface.sand",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {index % 2 === 0 ? (
                    <MenuBookOutlinedIcon
                      sx={{ fontSize: 64, color: "primary.main" }}
                    />
                  ) : (
                    <SpaOutlinedIcon
                      sx={{ fontSize: 64, color: "secondary.main" }}
                    />
                  )}
                </Box>

                <Box
                  sx={{
                    p: { xs: 2.5, md: 3.5 },
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 10,
                      letterSpacing: 1.6,
                      color: "secondary.main",
                      fontWeight: 700,
                      mb: 1.5,
                    }}
                  >
                    {article.category}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      mb: 1.5,
                    }}
                  >
                    {article.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{
                      lineHeight: 1.9,
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {article.description ?? excerpt(article)}
                  </Typography>

                  <Box sx={{ flex: 1 }} />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 10,
                        letterSpacing: 1,
                        color: "primary.main",
                        fontWeight: 700,
                      }}
                    >
                      {article.label}
                    </Typography>

                    {article.blocks?.length > 0 && (
                      <Button
                        onClick={() => setOpenArticle(article)}
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                      >
                        Read More
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <ReadingDialog
        item={openArticle}
        eyebrow={openArticle?.category}
        onClose={() => setOpenArticle(null)}
      />
    </Box>
  );
}
