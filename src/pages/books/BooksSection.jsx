import { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import OrderDialog from "../../components/common/OrderDialog";
import SectionHeading from "../../components/common/SectionHeading";
import books from "../../data/books";

export default function BooksSection() {
  const [orderItem, setOrderItem] = useState(null);

  return (
    <Box id="books" sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth="xl">
        <SectionHeading
          eyebrow="THE SEED LIBRARY"
          title="Words that nurture the soul."
          description="Explore resources for Bible study, Christian living, discipleship, and a deeper walk with God."
        />

        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid key={book.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "background.paper",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 14px 35px rgba(36,76,58,0.09)",
                  },
                }}
              >
                <CardActionArea
                  onClick={() =>
                    setOrderItem({
                      kind: "book",
                      title: book.title,
                      subtitle: book.author,
                      image: book.image,
                      price: book.price,
                    })
                  }
                  aria-label={`Order ${book.title}`}
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "flex-start",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={book.image}
                    alt={book.title}
                    sx={{ aspectRatio: "2 / 3", objectFit: "cover" }}
                  />

                  <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        fontSize: 10,
                        letterSpacing: 1.8,
                        fontWeight: 700,
                        color: "secondary.main",
                        mb: 1.5,
                      }}
                    >
                      {book.category}
                    </Typography>

                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        mb: 0.5,
                      }}
                    >
                      {book.title}
                    </Typography>

                    <Typography
                      sx={{ fontSize: 13, fontStyle: "italic", color: "primary.main", mb: 1.5 }}
                    >
                      {book.author}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                      {book.description}
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ justifyContent: "space-between", alignItems: "center" }}
                    >
                      {book.price ? (
                        <Typography
                          sx={{ fontSize: 20, fontWeight: 700, color: "primary.dark" }}
                        >
                          ₹{book.price}/-
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: "primary.main",
                            letterSpacing: 1,
                          }}
                        >
                          {book.access}
                        </Typography>
                      )}

                      <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{
                          alignItems: "center",
                          px: 1.5,
                          py: 0.75,
                          borderRadius: 5,
                          bgcolor: "surface.tint",
                          color: "primary.main",
                          fontSize: 13,
                          fontWeight: 700,
                        }}
                      >
                        <span>Order</span>
                        <ArrowForwardIcon sx={{ fontSize: 16 }} />
                      </Stack>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <OrderDialog item={orderItem} onClose={() => setOrderItem(null)} />
    </Box>
  );
}
