import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

// Turns "*bold*" segments into <strong>; newlines are kept by `white-space: pre-line`.
function RichText({ text }) {
  return text.split(/\*([^*]+)\*/).map((part, index) =>
    index % 2 === 1 ? (
      <Box component="strong" key={index} sx={{ color: "primary.dark" }}>
        {part}
      </Box>
    ) : (
      part
    )
  );
}

function VerseBlock({ block }) {
  return (
    <Box
      sx={{
        borderLeft: "3px solid",
        borderColor: "secondary.main",
        bgcolor: "surface.quote",
        p: 2.5,
        borderRadius: "0 8px 8px 0",
      }}
    >
      <Typography
        sx={{ lineHeight: 2, fontStyle: "italic", color: "primary.dark", whiteSpace: "pre-line" }}
      >
        <RichText text={block.body} />
      </Typography>
      {block.reference && (
        <Typography sx={{ mt: 1, fontSize: 13, fontWeight: 700, color: "secondary.main" }}>
          {block.reference}
        </Typography>
      )}
    </Box>
  );
}

// Full-text popup for a reading with `title`, `blocks`, and optional
// `continuation`, `author` and `authorPlace`.
export default function ReadingDialog({ item, eyebrow, onClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={Boolean(item)}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby="reading-title"
    >
      {item && (
        <>
          <DialogTitle id="reading-title" sx={{ pr: 7, pb: 1.5 }}>
            <Typography
              component="span"
              sx={{
                display: "block",
                fontSize: 10,
                letterSpacing: 1.8,
                fontWeight: 700,
                color: "secondary.main",
                mb: 1,
              }}
            >
              {eyebrow}
            </Typography>
            <Typography
              component="span"
              sx={{
                display: "block",
                fontSize: { xs: 20, md: 24 },
                fontWeight: 700,
                lineHeight: 1.5,
                color: "primary.dark",
              }}
            >
              {item.title}
            </Typography>
            <IconButton
              onClick={onClose}
              aria-label="Close"
              sx={{ position: "absolute", top: 12, right: 12 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            <Stack spacing={2.5}>
              {(item.blocks ?? []).map((block, index) =>
                block.type === "verse" ? (
                  <VerseBlock key={index} block={block} />
                ) : (
                  <Typography key={index} sx={{ lineHeight: 2, whiteSpace: "pre-line" }}>
                    <RichText text={block.body} />
                  </Typography>
                )
              )}

              {item.continuation && (
                <Typography sx={{ fontWeight: 700, color: "primary.main" }}>
                  {item.continuation}
                </Typography>
              )}

              {item.author && (
                <Box sx={{ pt: 1, alignSelf: "flex-end", textAlign: "right" }}>
                  <Typography sx={{ fontWeight: 700 }}>- {item.author}</Typography>
                  {item.authorPlace && (
                    <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                      {item.authorPlace}
                    </Typography>
                  )}
                </Box>
              )}
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
